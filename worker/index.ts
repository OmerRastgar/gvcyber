/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

// Injected at build time by vite.config.ts (git commit the build came from).
declare const __BUILD_ID__: string;

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const CANONICAL_HOST = "gvcyber.com";

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  // Inline scripts/styles are required for JSON-LD and framework bootstrapping.
  "Content-Security-Policy": [
    "default-src 'self'",
    // Cloudflare injects its Web Analytics beacon at the zone level.
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    // Display and mono fonts are loaded from these hosts by app/globals.css.
    "font-src 'self' data: https://static1.squarespace.com https://cdn.jsdelivr.net",
    "connect-src 'self' https://cloudflareinsights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formspree.io mailto:",
    "object-src 'none'",
  ].join("; "),
};

const LONG_CACHE_PREFIXES = ["/globe-frames/", "/case-studies/", "/flags/"];
const LONG_CACHE_FILES = ["/logo.png", "/fav.png", "/favicon.ico", "/og-gvcyber.png"];

function withSecurityHeaders(request: Request, response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);
  headers.set("x-build", typeof __BUILD_ID__ === "string" ? __BUILD_ID__ : "dev");

  // German pages: the zone-injected analytics beacon is not allowed to load (the privacy policy says
  // measurement only happens with consent, and nothing loads it after consent).
  const { pathname: requestPath } = new URL(request.url);
  if (requestPath === "/de" || requestPath.startsWith("/de/")) {
    headers.set(
      "Content-Security-Policy",
      SECURITY_HEADERS["Content-Security-Policy"]
        .replace(" https://static.cloudflareinsights.com", "")
        .replace(" https://cloudflareinsights.com", ""),
    );
  }

  const { pathname } = new URL(request.url);
  const isStaticImage = LONG_CACHE_FILES.includes(pathname) || LONG_CACHE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isStaticImage && response.ok) headers.set("Cache-Control", "public, max-age=2592000");

  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Canonical host: send www.gvcyber.com to the apex domain.
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // Country hint for the language suggestion banner. Not cached, sets no cookie, and pages never vary on it,
    // so crawlers always receive identical HTML.
    if (url.pathname === "/_geo") {
      const country = (request as Request & { cf?: { country?: string } }).cf?.country ?? request.headers.get("cf-ipcountry") ?? null;
      return withSecurityHeaders(request, new Response(JSON.stringify({ country }), { headers: { "content-type": "application/json", "cache-control": "no-store" } }));
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return withSecurityHeaders(request, await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths));
    }

    // Tell the app which locale a path belongs to so the root layout can set <html lang>.
    const isGerman = url.pathname === "/de" || url.pathname.startsWith("/de/");
    const forwarded = isGerman ? new Request(request, { headers: new Headers([...request.headers, ["x-locale", "de"]]) }) : request;
    return withSecurityHeaders(request, await handler.fetch(forwarded, env, ctx));
  },
};

export default worker;
