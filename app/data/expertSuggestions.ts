export type ExpertSuggestion = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  points: string[];
  relatedServices: Array<{ label: string; href: string }>;
  externalUrl?: string;
};

export const expertSuggestions: ExpertSuggestion[] = [
  {
    slug: "iso-27001-readiness-before-certification",
    title: "What to prepare before an ISO 27001 certification audit",
    summary: "A practical readiness checklist for teams that want fewer surprises before formal ISO 27001 assessment.",
    category: "ISO audit",
    readingTime: "5 min read",
    points: [
      "Define the ISMS scope in plain business terms before collecting evidence.",
      "Map people, business processes and technology assets to the controls you claim are operating.",
      "Run an internal gap assessment before involving the certification body.",
      "Keep evidence current, named and traceable to control ownership.",
    ],
    relatedServices: [
      { label: "ISO 27001", href: "/services/iso-27001" },
      { label: "Audit & compliance", href: "/services/audits" },
    ],
  },
  {
    slug: "vulnerability-scanning-without-noise",
    title: "How to make vulnerability scanning useful instead of noisy",
    summary: "Scanning only helps when assets, credentials, validation and remediation ownership are handled properly.",
    category: "Vulnerability scanning",
    readingTime: "4 min read",
    points: [
      "Start with an asset list that separates public-facing, internal, cloud and endpoint scope.",
      "Use authenticated scanning where deeper patch and configuration evidence is required.",
      "Validate high-risk findings before sending teams a long remediation queue.",
      "Track repeat findings because they show process gaps, not just technical gaps.",
    ],
    relatedServices: [
      { label: "Vulnerability scanning", href: "/services/vulnerability-scanning" },
      { label: "Authenticated scanning", href: "/services/authenticated-vulnerability-scanning" },
    ],
  },
  {
    slug: "pentest-scope-that-matches-business-risk",
    title: "How to scope a penetration test around business risk",
    summary: "A pentest should reflect what the business actually relies on: people, applications, cloud, network paths and data flows.",
    category: "Penetration testing",
    readingTime: "5 min read",
    points: [
      "List the applications, identities, integrations and data flows that create real business exposure.",
      "Separate external attacker perspective from internal compromise scenarios.",
      "Include cloud and API scope when the product depends on managed services.",
      "Agree proof-of-impact rules before testing begins so reporting is useful and safe.",
    ],
    relatedServices: [
      { label: "Penetration testing", href: "/services/penetration-testing" },
      { label: "Web application pentest", href: "/services/web-application-penetration-testing" },
    ],
  },
  {
    slug: "pci-secure-software-key-management",
    title: "PCI Secure Software and the key management requirement",
    summary: "How PCI SSF objectives around strong cryptography and key lifecycle management connect to modern key infrastructure such as HashiCorp Vault.",
    category: "PCI DSS",
    readingTime: "6 min read",
    points: [
      "PCI SSF Security Objectives 8 and 9 require strong cryptography and controlled key lifecycle management, not just a completed checklist.",
      "Traditional hardware security modules and in-house key management often struggle with the automated, cloud-native delivery patterns payment software now uses.",
      "Identity-based secret management platforms can provide short-lived credentials, rotation, revocation and audit evidence that PCI assessors look for.",
      "The tool is only part of the requirement. Engineering teams still own secure configuration and the full key lifecycle within their application.",
    ],
    relatedServices: [
      { label: "PCI DSS", href: "/services/pci-dss" },
      { label: "Application security", href: "/services/web-application-penetration-testing" },
    ],
    externalUrl: "https://www.linkedin.com/pulse/pci-secure-software-requirement-key-management-solution-gvcyber-vp8wf/?trackingId=Gf9YgqauxXJVbdEW%2FLt0BQ%3D%3D",
  },
  {
    slug: "cisco-network-hardening-audit-checklist",
    title: "Hardening your Cisco network: a security audit checklist",
    summary: "A baseline set of Cisco IOS checks for disabling legacy services, locking down management access, and verifying interface, routing and logging configuration.",
    category: "Network security",
    readingTime: "3 min read",
    points: [
      "Check that legacy services such as Finger, PAD and TCP/UDP small servers are disabled to reduce reconnaissance and amplification risk.",
      "Review management access through VTY lines, SNMP, local user accounts and HTTP/HTTPS server settings.",
      "Verify interface hardening including Proxy ARP, CDP exposure on untrusted interfaces and IP directed broadcast controls.",
      "Confirm logging is active and sent to a secure syslog server so audit evidence is retained.",
    ],
    relatedServices: [
      { label: "Network penetration testing", href: "/services/network-penetration-testing" },
      { label: "Network vulnerability scanning", href: "/services/network-vulnerability-scanning" },
    ],
    externalUrl: "https://medium.com/@gvcyber/hardening-your-cisco-network-a-complete-security-audit-checklist-4a356c3109d5?postPublishedType=initial",
  },
  {
    slug: "vibe-coder-guide-to-security",
    title: "A vibe coder's guide to security",
    summary: "A practical guide for developers using AI assistants to identify, verify and fix common security issues before they ship.",
    category: "Application security",
    readingTime: "25 min read",
    points: [
      "Use the same AI tools that generated the code to inspect for issues such as secret leaks, package hallucinations and misplaced client-side trust.",
      "Check for weak input validation, broken object-level authorization and missing rate limits before exposing an API.",
      "Review configuration for default credentials, overly broad CORS and IAM settings, and disabled data isolation.",
      "Treat AI output as a starting point, not a security guarantee: verify findings against the actual code and enforce controls server-side.",
    ],
    relatedServices: [
      { label: "Application security", href: "/services/web-application-penetration-testing" },
      { label: "Web application pentest", href: "/services/web-application-penetration-testing" },
    ],
    externalUrl: "https://medium.com/@gvcyber/vibe-coder-guide-to-security-cc7f682d396e?postPublishedType=initial",
  },
];

export const getExpertSuggestion = (slug: string) => expertSuggestions.find((suggestion) => suggestion.slug === slug);
