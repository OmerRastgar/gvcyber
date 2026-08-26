export type CaseStudy = {
  slug: string;
  sector: string;
  title: string;
  summary: string;
  tags?: string[];
  image?: string;
  metrics?: { label: string; value: string }[];
  challenge: string;
  approach: string;
  outcome: string;
  challengePoints?: { title: string; detail: string }[];
  solutionPoints?: { title: string; detail: string }[];
  hurdles?: { issue: string; fix: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cloudflare-zero-trust-shared-access",
    sector: "Technology",
    title: "Zero Trust controls for shared customer access",
    summary: "A data analytics firm needed rapid access to short-term customer environments without losing accountability when clients only provided shared credentials.",
    tags: ["AWS", "Cloudflare", "GCP", "Zero Trust", "VPN", "IAM", "Logging", "Application security"],
    metrics: [
      { label: "HTTP/HTTPS visibility", value: "100%" },
      { label: "Shared credential attribution", value: "92%" },
      { label: "Cloudflare tier", value: "Free Tier" },
    ],
    challenge: "Customers refused to provision individual RBAC or federated SSO because engagements often lasted less than two weeks. Five analysts sometimes had to use one admin@client.com account, creating compliance risk, zero visibility and no clear answer to questions like: who deleted the table?",
    approach: "Golden Valley Cyber routed access through Cloudflare Gateway and identity-aware device policies. Even where the destination application still saw a shared customer account, the gateway authenticated the individual employee before forwarding traffic and preserved a secondary audit trail.",
    outcome: "The firm gained practical user-level attribution, safer third-party access sharing, better observability across applications and a lower-cost path to compliance evidence without forcing every customer to redesign their identity stack.",
    challengePoints: [
      { title: "Shared Credentials", detail: "Customers would not create individual accounts or enable SSO for short engagements, so analysts were pushed toward shared logins." },
      { title: "Zero Visibility", detail: "Customer-side logs only showed the shared account, leaving no reliable way to identify which internal analyst performed a risky action." },
      { title: "Compliance Risk", detail: "Manual onboarding and offboarding created windows where former employees could retain access to critical SaaS tools." },
    ],
    solutionPoints: [
      { title: "Identity-Aware Proxying", detail: "Cloudflare Gateway authenticated the employee via the WARP client before traffic reached the shared customer account." },
      { title: "Hardware-Identity Bind", detail: "Password vault access was tied to corporate email and approved device posture so shared credentials could only be used from trusted endpoints." },
      { title: "Granular Traffic Inspection", detail: "HTTP/HTTPS logging captured visited URLs and API calls at the edge so activity could be reconstructed after the fact." },
    ],
    hurdles: [
      { issue: "VPN vs. Zero Trust Conflict: analysts needed to simulate traffic from countries such as Brazil, but VPN software conflicted with the Zero Trust client.", fix: "Configured browser-level SOCKS5 proxies so country-specific testing could continue without breaking endpoint routing." },
      { issue: "Log Retention on Free Tier: Cloudflare free/standard retention windows were too short for 90-day audit evidence.", fix: "Implemented a weekly export process for CSV logs so the client could retain evidence outside the dashboard." },
    ],
  },
  {
    slug: "cisco-router-network-hardening",
    sector: "Network security",
    title: "Auditing Cisco routers for misconfiguration and legacy risk",
    summary: "A professional services firm regained control of a black-box network, removed ghost devices and improved video stability without replacing all infrastructure immediately.",
    tags: ["Cisco", "PuTTY", "IP scanning", "SSH", "Load balancing", "QoS", "Nmap", "Vulnerability scanning"],
    metrics: [
      { label: "Admin control restored", value: "100%" },
      { label: "Legacy devices identified", value: "4+" },
      { label: "Video jitter reduction", value: "40%" },
    ],
    challenge: "The network had been set up years earlier by a departed contractor. Passwords were lost, shadow devices had been added without oversight, and video conferencing traffic competed with low-priority traffic during stakeholder meetings.",
    approach: "Golden Valley Cyber performed a controlled network assessment, recovered router access through ROMMON, scanned for unknown devices, hardened legacy services and configured QoS/load balancing around business-critical traffic.",
    outcome: "The client regained administrative control, removed unmanaged devices, reduced video jitter and received a practical hardening plan for end-of-life equipment until budget was available for replacement.",
    challengePoints: [
      { title: "Gap in Security", detail: "The infrastructure had never been reviewed for security because the original vendor focused only on connectivity." },
      { title: "Unknown Devices", detail: "The business had no current inventory of connected devices or what each one was doing." },
      { title: "Congested Pipelines", detail: "Video conferencing traffic had no priority and was frequently degraded by background usage." },
    ],
    solutionPoints: [
      { title: "Full Network Scan", detail: "Nmap and manual validation were used to identify exposed services, active hosts and legacy risks." },
      { title: "Shadow Device Identification", detail: "Unmanaged Raspberry Pis and small servers were located and moved toward safer segmentation." },
      { title: "Intelligent Traffic Shaping", detail: "QoS and load balancing were configured to prioritise voice/video packets over background data." },
    ],
    hurdles: [
      { issue: "Gaining Entry: lost admin passwords meant the router could not be safely managed.", fix: "Bypassed startup-config through ROMMON, reset secrets and secured administrative access without wiping business-critical settings." },
      { issue: "Legacy Hardware Risk: the router firmware was end-of-life and could not receive modern patches.", fix: "Applied a hardening template, disabled non-essential services and reduced exposed attack surface until replacement was approved." },
    ],
  },
  {
    slug: "iso-42001-ai-governance-saas",
    sector: "SaaS",
    title: "AI governance for a SaaS provider using ISO 42001",
    summary: "A SaaS provider needed a practical AI governance baseline that could support customer assurance, application security and future ISO 42001 readiness.",
    tags: ["ISO 42001", "AI governance", "SaaS", "Application security", "IAM", "Logging", "Risk management", "Compliance"],
    metrics: [
      { label: "AI systems inventoried", value: "100%" },
      { label: "Governance gaps prioritised", value: "4+" },
      { label: "Evidence model", value: "Reusable" },
    ],
    challenge: "AI features had been added quickly across the product without a consistent register of use cases, model risks, access paths or evidence needed for customer reviews and future ISO 42001 alignment.",
    approach: "Golden Valley Cyber mapped AI use cases, reviewed data flows, aligned control expectations to ISO 42001 themes and built a lightweight governance workflow for risk ownership, logging, approvals and periodic review.",
    outcome: "The SaaS provider gained a structured AI governance backlog, clearer ownership for model and data risk, and a reusable evidence model for enterprise customers asking about AI security and compliance.",
    challengePoints: [
      { title: "Shadow AI Usage", detail: "Teams were using AI-enabled tooling without one consolidated register or approval workflow." },
      { title: "Application Risk", detail: "Model inputs, outputs and customer data exposure needed to be reviewed alongside normal application security controls." },
      { title: "Assurance Pressure", detail: "Enterprise customers wanted clear answers about AI governance before procurement and renewal." },
    ],
    solutionPoints: [
      { title: "AI System Inventory", detail: "Documented AI features, supporting vendors, data categories, access rights and business owners." },
      { title: "ISO 42001 Mapping", detail: "Mapped governance, risk, monitoring and improvement activities to ISO 42001 readiness themes." },
      { title: "Evidence Workflow", detail: "Created practical evidence expectations for approvals, risk reviews, logs and periodic control checks." },
    ],
    hurdles: [
      { issue: "Fast Product Change: AI features were evolving faster than formal governance could be written.", fix: "Used a lightweight register and recurring review cadence instead of a heavy one-time policy exercise." },
      { issue: "Unclear Ownership: product, engineering and security all owned part of the risk but no single workflow connected them.", fix: "Defined control owners and escalation points for AI-related security, privacy and compliance decisions." },
    ],
  },
  {
    slug: "factory-ransomware-digital-forensics",
    sector: "Manufacturing",
    title: "Digital forensics after ransomware in a factory environment",
    summary: "A manufacturing site needed root-cause analysis, malware validation and safer recovery across servers, SAP, thin clients, IP cameras, HMI systems and printers.",
    image: "/case-studies/ransomware-factory-forensics.png",
    tags: ["Digital forensics", "Ransomware", "Manufacturing", "SAP", "Thin clients", "IP cameras", "HMI", "IP printers", "Malware eradication"],
    metrics: [
      { label: "Environment reviewed", value: "OT + IT" },
      { label: "Critical asset classes", value: "5+" },
      { label: "Recovery focus", value: "Root cause" },
    ],
    challenge: "A factory experienced ransomware on a server and needed to understand the original entry point before bringing systems back into normal operation. The environment included SAP, thin clients, IP cameras, HMI systems and IP printers, so recovery had to consider both business systems and operational technology.",
    approach: "Golden Valley Cyber preserved evidence, reviewed affected servers, checked persistence mechanisms, investigated authentication and remote-access paths, validated whether malware remained in the environment and prioritised containment before restoration.",
    outcome: "The client received a clear root-cause narrative, a practical remediation plan and a safer recovery path that reduced the chance of reinfection across factory IT and connected operational devices.",
    challengePoints: [
      { title: "Mixed IT and OT estate", detail: "The incident affected a factory environment where SAP and servers sat close to thin clients, HMI systems, cameras and printers." },
      { title: "Root cause uncertainty", detail: "Restoring from backups without understanding the initial access path could have reintroduced the same ransomware risk." },
      { title: "Malware confidence gap", detail: "The business needed assurance that no active malware, persistence or suspicious remote access remained before returning to normal operations." },
    ],
    solutionPoints: [
      { title: "Forensic evidence review", detail: "Collected and reviewed relevant logs, affected server artifacts, user activity, remote-access indicators and suspicious execution paths." },
      { title: "Factory asset validation", detail: "Checked the wider environment including SAP-connected systems, thin clients, IP cameras, HMI hosts and IP printers for signs of compromise." },
      { title: "Containment and hardening", detail: "Prioritised account resets, access control changes, patching, segmentation improvements and recovery sequencing around production impact." },
    ],
    hurdles: [
      { issue: "Production Availability: factory systems could not simply be taken offline for a broad rebuild without affecting operations.", fix: "Used staged containment and validation so the highest-risk systems were handled first while minimising disruption to production workflows." },
      { issue: "OT Visibility: HMI systems, cameras and printers often had limited logging compared with normal servers.", fix: "Combined network-level review, asset inventory checks and targeted device validation to look for signs of persistence or lateral movement." },
      { issue: "Reinfection Risk: restoring a server without closing the original access path could restart the incident.", fix: "Focused the investigation on initial access, credential exposure, persistence and remote-access paths before declaring systems ready for recovery." },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
