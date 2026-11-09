import type { Service } from "../data/services";

export type Faq = { question: string; answer: string };

const sentence = (text: string) => (/[.!?]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`);

/**
 * Builds visible FAQs for a service page from the service's own data, so each
 * answer is specific to that service and matches the pricing and risk shown on the page.
 */
export function buildServiceFaqs(service: Service): Faq[] {
  const faqs: Faq[] = [
    {
      question: `Who is ${service.name} for?`,
      answer: `${service.name} is built for ${service.appliesTo.charAt(0).toLowerCase()}${service.appliesTo.slice(1)}. It is delivered by Golden Valley Cyber, a cyber security consultancy based in Cheltenham, UK, and applies to ${service.region === "Global" ? "organisations in any region" : service.region.toLowerCase() === "united kingdom" ? "organisations in the United Kingdom" : `organisations in ${service.region}`}.`,
    },
    {
      question: `What risk does ${service.name} address?`,
      answer: sentence(service.risk),
    },
    {
      question: `How much does ${service.name} cost?`,
      answer: `Indicative planning range: ${service.price}. ${sentence(service.priceDetails)}${service.formalPrice ? ` For formal assessment, the indicative range is ${service.formalPrice}. ${sentence(service.formalDetails ?? "")}` : ""} Final pricing depends on the agreed scope, so the first step is a scoping conversation.`,
    },
  ];

  if (service.category === "audits") {
    faqs.push({
      question: `Does ${service.name} readiness support guarantee certification or compliance?`,
      answer: "No. Readiness support shows where the gaps are, what evidence is missing and what to fix. Certification or attestation is decided by the relevant assessment body, and Golden Valley Cyber does not promise an outcome on their behalf.",
    });
  } else if (service.category === "vulnerability-scanning") {
    faqs.push({
      question: "What is the difference between vulnerability scanning and penetration testing?",
      answer: "Vulnerability scanning uses tooling to find known weaknesses across many systems quickly, and findings are validated so you can tell real exposure from noise. Penetration testing is human-led: a tester tries to exploit weaknesses to show real business impact. Many teams scan regularly and test periodically.",
    });
  } else {
    faqs.push({
      question: "What is the difference between penetration testing and vulnerability scanning?",
      answer: "Penetration testing is human-led and tries to exploit weaknesses to demonstrate business impact and attack paths. Vulnerability scanning is tool-driven and finds known weaknesses broadly. Testing is usually scoped to specific systems, while scanning covers more ground more often.",
    });
  }

  faqs.push({
    question: `What do I receive at the end of the ${service.shortName ?? service.name} engagement?`,
    answer: "Prioritised findings, practical remediation guidance and a clear route to closure, based on the scope agreed at the start.",
  });

  return faqs;
}
