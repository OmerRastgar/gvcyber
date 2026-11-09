export type ExpertSuggestionSection = {
  heading: string;
  body: string[];
};

export type ExpertSuggestion = {
  slug: string;
  /** Short title for <title>/OG (keeps the page title within 60 characters). */
  seoTitle?: string;
  title: string;
  summary: string;
  category: string;
  /** ISO date first published on this site (seeded from git history; confirm). */
  published: string;
  /** ISO date of the last substantive edit. */
  updated: string;
  /** Computed from the real word count; do not set by hand. */
  readingTime: string;
  /** Opening paragraph shown above the article body. */
  intro: string;
  /** Short list shown at the top as "What to focus on first". */
  points: string[];
  /** Full article body, hosted on this site. */
  sections: ExpertSuggestionSection[];
  relatedServices: Array<{ label: string; href: string }>;
  /** Where the original version was first published, if anywhere else. */
  externalUrl?: string;
  externalLabel?: string;
};

const rawSuggestions: Omit<ExpertSuggestion, "readingTime" | "published" | "updated">[] = [
  {
    slug: "iso-27001-readiness-before-certification",
    seoTitle: "ISO 27001 Certification Audit Prep",
    title: "What to prepare before an ISO 27001 certification audit",
    summary: "A practical readiness checklist for teams that want fewer surprises before formal ISO 27001 assessment.",
    category: "ISO audit",
    intro: "Most surprises in a certification audit are avoidable. They come from an unclear scope, controls that exist on paper but not in practice, and evidence nobody can trace to an owner. This checklist covers what to settle before the certification body arrives.",
    points: [
      "Define the ISMS scope in plain business terms before collecting evidence.",
      "Map people, business processes and technology assets to the controls you claim are operating.",
      "Run an internal gap assessment before involving the certification body.",
      "Keep evidence current, named and traceable to control ownership.",
    ],
    sections: [
      {
        heading: "Agree the scope in business terms",
        body: [
          "Write the scope as a sentence a non-specialist could read: which services, which locations, which teams and which systems are inside the information security management system (ISMS), and what sits outside and why.",
          "A vague scope is the most common cause of late rework. If the scope changes after evidence has been collected, the risk assessment, the statement of applicability and the evidence all need revisiting.",
        ],
      },
      {
        heading: "Map assets and processes to the controls you claim",
        body: [
          "For every control you say is operating, be able to name the people, the process and the technology that make it true. An access control claim, for example, should point to who approves access, how leavers are removed and which systems enforce it.",
          "This mapping also exposes controls you have marked as applicable but cannot yet demonstrate. It is far cheaper to find those yourself.",
        ],
      },
      {
        heading: "Run an internal gap assessment first",
        body: [
          "Assess your own ISMS against the standard before the certification body does. Treat the findings the way an auditor would: note what is missing, what is partly in place and what is only documented.",
          "Fix the gaps, record the decisions and keep the assessment itself as evidence that the management system reviews itself.",
        ],
      },
      {
        heading: "Keep evidence current, named and traceable",
        body: [
          "Evidence is only useful when an auditor can see what it shows, who owns it and when it was last reviewed. Records that are out of date, unnamed or stored somewhere nobody can find tend to be treated as missing.",
          "Give each control an owner and make the owner responsible for the evidence behind it.",
        ],
      },
    ],
    relatedServices: [
      { label: "ISO 27001", href: "/services/iso-27001" },
      { label: "Audit & compliance", href: "/services/audits" },
    ],
  },
  {
    slug: "vulnerability-scanning-without-noise",
    seoTitle: "Vulnerability Scanning Without Noise",
    title: "How to make vulnerability scanning useful instead of noisy",
    summary: "Scanning only helps when assets, credentials, validation and remediation ownership are handled properly.",
    category: "Vulnerability scanning",
    intro: "A scanner will always produce a long list. Whether that list leads to fewer incidents depends on what you scan, how you scan it, who checks the results and who is responsible for fixing them.",
    points: [
      "Start from an accurate asset list so the scan covers what you actually run.",
      "Use authenticated scans where you can, because they see far more than an outside view.",
      "Validate high-risk findings before sending teams a long remediation queue.",
      "Give every finding an owner and a review date.",
    ],
    sections: [
      {
        heading: "Scan what you actually run",
        body: [
          "A scan is only as complete as its target list. Reconcile the list against cloud accounts, DNS records and network ranges so forgotten systems are included, and remove retired ones so they do not pollute results.",
        ],
      },
      {
        heading: "Use credentials where it is safe to",
        body: [
          "Unauthenticated scans see what an outsider sees. Authenticated scans can read installed software and configuration, which usually finds missing patches and weak settings that an outside view cannot. Use a dedicated, least-privilege scanning account and review it like any other privileged account.",
        ],
      },
      {
        heading: "Validate before you escalate",
        body: [
          "Scanners report possible weaknesses. Before a high-severity finding goes to an engineering team, confirm it is real and reachable. Teams stop trusting reports that contain too many false positives, and then real issues get ignored with the rest.",
        ],
      },
      {
        heading: "Assign ownership and a review date",
        body: [
          "A finding with no owner does not get fixed. Route each one to the team that runs the affected system, agree a target date based on risk, and rescan to confirm the fix. Track what remains open from one scan to the next.",
        ],
      },
    ],
    relatedServices: [
      { label: "Vulnerability scanning", href: "/services/vulnerability-scanning" },
      { label: "Network vulnerability scanning", href: "/services/network-vulnerability-scanning" },
    ],
  },
  {
    slug: "pci-secure-software-key-management",
    seoTitle: "PCI Secure Software Key Management",
    title: "PCI secure software requirements and key management",
    summary: "What the PCI Secure Software Framework expects from cryptography and key lifecycle management, and where engineering teams still carry the responsibility.",
    category: "PCI DSS",
    intro: "Payment software teams often assume that buying a key management product settles the cryptography requirements. The framework asks for more than a tool: it expects the software to use strong cryptography and to control the full lifecycle of its keys.",
    points: [
      "PCI SSF Security Objectives 8 and 9 require strong cryptography and controlled key lifecycle management, not just a completed checklist.",
      "Traditional hardware security modules and in-house key management often struggle with the automated, cloud-native delivery patterns payment software now uses.",
      "Identity-based secret management platforms can provide short-lived credentials, rotation, revocation and audit evidence that PCI assessors look for.",
      "The tool is only part of the requirement. Engineering teams still own secure configuration and the full key lifecycle within their application.",
    ],
    sections: [
      {
        heading: "Cryptography is a lifecycle, not a setting",
        body: [
          "Strong algorithms matter, but so do generation, storage, distribution, rotation, revocation and retirement of keys. An assessor will ask how each stage is controlled and what evidence shows it is operating.",
        ],
      },
      {
        heading: "Why delivery patterns change the problem",
        body: [
          "Hardware security modules and manually managed keys were designed for slower, more static environments. Software delivered through automated pipelines and cloud-native infrastructure creates and destroys workloads constantly, so key handling has to be automated and auditable too.",
        ],
      },
      {
        heading: "What identity-based secret management can provide",
        body: [
          "Platforms that issue short-lived credentials based on workload identity can reduce long-lived secrets, support rotation and revocation, and record who or what accessed which secret and when. That record is the kind of evidence an assessment looks for.",
        ],
      },
      {
        heading: "The tool does not carry the responsibility",
        body: [
          "Adopting a platform does not transfer accountability. The engineering team still configures it securely, defines how its keys are used in the application and owns the lifecycle inside the product. Document those decisions so they are ready for assessment.",
        ],
      },
    ],
    relatedServices: [
      { label: "PCI DSS", href: "/services/pci-dss" },
      { label: "Application security", href: "/services/web-application-penetration-testing" },
    ],
    externalUrl: "https://www.linkedin.com/pulse/pci-secure-software-requirement-key-management-solution-gvcyber-vp8wf/",
    externalLabel: "LinkedIn",
  },
  {
    slug: "cisco-network-hardening-audit-checklist",
    seoTitle: "Cisco Network Hardening Checklist",
    title: "Hardening your Cisco network: a security audit checklist",
    summary: "A baseline set of Cisco IOS checks for disabling legacy services, locking down management access, and verifying interface, routing and logging configuration.",
    category: "Network security",
    intro: "Most router and switch weaknesses are configuration choices rather than software flaws. This baseline covers the checks we start with when auditing Cisco IOS devices.",
    points: [
      "Check that legacy services such as Finger, PAD and TCP/UDP small servers are disabled to reduce reconnaissance and amplification risk.",
      "Review management access through VTY lines, SNMP, local user accounts and HTTP/HTTPS server settings.",
      "Verify interface hardening including Proxy ARP, CDP exposure on untrusted interfaces and IP directed broadcast controls.",
      "Confirm logging is active and sent to a secure syslog server so audit evidence is retained.",
    ],
    sections: [
      {
        heading: "Disable legacy services",
        body: [
          "Older services such as Finger, PAD and the TCP and UDP small servers have little legitimate use today. Left enabled, they help an attacker map a device and can be abused for amplification. Confirm each is switched off in the running configuration.",
        ],
      },
      {
        heading: "Lock down management access",
        body: [
          "Review how administrators reach the device: VTY lines, SNMP, local accounts and the built-in HTTP or HTTPS server. Restrict access to known management networks, prefer encrypted protocols, remove default or shared credentials and disable any management interface you do not use.",
        ],
      },
      {
        heading: "Harden interfaces",
        body: [
          "Check each interface for features that expose more than they need to. That includes Proxy ARP, CDP on interfaces facing untrusted networks and IP directed broadcasts. Shut down unused interfaces.",
        ],
      },
      {
        heading: "Make sure logging produces evidence",
        body: [
          "Confirm logging is enabled and sent to a secure syslog server, with synchronised time so events line up. Logs kept only on the device can be lost or altered, and they are usually the first thing an audit asks for.",
        ],
      },
    ],
    relatedServices: [
      { label: "Network penetration testing", href: "/services/network-penetration-testing" },
      { label: "Network vulnerability scanning", href: "/services/network-vulnerability-scanning" },
    ],
    externalUrl: "https://medium.com/@gvcyber/hardening-your-cisco-network-a-complete-security-audit-checklist-4a356c3109d5",
    externalLabel: "Medium",
  },
  {
    slug: "vibe-coder-guide-to-security",
    seoTitle: "Vibe Coder's Guide to Security",
    title: "A vibe coder's guide to security",
    summary: "A practical guide for developers using AI assistants to identify, verify and fix common security issues before they ship.",
    category: "Application security",
    intro: "AI assistants write working code quickly, and working is not the same as safe. This guide covers the issues that most often slip through when code is generated and shipped fast, and how to check for them.",
    points: [
      "Use the same AI tools that generated the code to inspect for issues such as secret leaks, package hallucinations and misplaced client-side trust.",
      "Check for weak input validation, broken object-level authorization and missing rate limits before exposing an API.",
      "Review configuration for default credentials, overly broad CORS and IAM settings, and disabled data isolation.",
      "Treat AI output as a starting point, not a security guarantee: verify findings against the actual code and enforce controls server-side.",
    ],
    sections: [
      {
        heading: "Ask the tool to review its own work, then verify",
        body: [
          "Assistants can be pointed at generated code and asked to look for leaked secrets, invented package names and logic that trusts the browser. Treat the answers as leads. Open the code, confirm the problem is real and confirm your fix works.",
        ],
      },
      {
        heading: "Check the API before you expose it",
        body: [
          "Look for weak input validation, missing rate limits and broken object-level authorization, where a user can read or change another user's records by changing an identifier. These are easy to introduce and common in generated endpoints.",
        ],
      },
      {
        heading: "Review configuration, not just code",
        body: [
          "Default credentials, permissive CORS, wide cloud permissions and disabled data isolation come from setup rather than source. Check them separately and keep secrets out of the repository.",
        ],
      },
      {
        heading: "Enforce controls on the server",
        body: [
          "Anything enforced only in the browser can be bypassed. Authentication, authorisation and validation must happen on the server, whatever the front end does. AI output is a starting point, not a security guarantee.",
        ],
      },
    ],
    relatedServices: [
      { label: "Application security", href: "/services/web-application-penetration-testing" },
      { label: "Web application pentest", href: "/services/web-application-penetration-testing" },
    ],
    externalUrl: "https://medium.com/@gvcyber/vibe-coder-guide-to-security-cc7f682d396e",
    externalLabel: "Medium",
  },
];

const PUBLISHED = "2026-08-20";
const UPDATED = "2026-11-09";

function readingTimeFor(post: Omit<ExpertSuggestion, "readingTime" | "published" | "updated">) {
  const text = [post.intro, ...post.points, ...post.sections.flatMap((section) => [section.heading, ...section.body])].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export const expertSuggestions: ExpertSuggestion[] = rawSuggestions.map((post) => ({
  ...post,
  published: PUBLISHED,
  updated: UPDATED,
  readingTime: readingTimeFor(post),
}));

export const getExpertSuggestion = (slug: string) => expertSuggestions.find((suggestion) => suggestion.slug === slug);
