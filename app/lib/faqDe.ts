import type { DeService } from "../data/de/services";

export type Faq = { question: string; answer: string };

const sentence = (text: string) => (/[.!?]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`);

/** Visible German FAQs for a service page, built from the service's own data. */
export function buildServiceFaqsDe(service: DeService): Faq[] {
  const onRequest = service.price === "Auf Anfrage";
  const faqs: Faq[] = [
    {
      question: `Für wen ist ${service.shortName ?? service.name} gedacht?`,
      answer: `${service.name} richtet sich an ${service.appliesTo}. Die Leistung erbringt Golden Valley Cyber, eine Cybersicherheitsberatung (Marke der Soft Innovators UK Ltd) mit Sitz in Cheltenham, Vereinigtes Königreich.`,
    },
    {
      question: `Welches Risiko adressiert ${service.shortName ?? service.name}?`,
      answer: sentence(service.risk),
    },
    {
      question: `Was kostet ${service.shortName ?? service.name}?`,
      answer: onRequest
        ? `${sentence(service.priceDetails)} Der erste Schritt ist ein Erstgespräch zum Umfang.`
        : `Richtwert (netto): ${service.price}. ${sentence(service.priceDetails)}${service.formalPrice ? ` Für die förmliche Prüfung gilt als Richtwert: ${service.formalPrice}. ${sentence(service.formalDetails ?? "")}` : ""} Der tatsächliche Preis hängt vom vereinbarten Umfang ab; der erste Schritt ist ein Erstgespräch.`,
    },
  ];

  if (service.category === "audits") {
    faqs.push({
      question: `Garantiert die Vorbereitung auf ${service.shortName ?? service.name} eine Zertifizierung oder Konformität?`,
      answer: service.boundary
        ? `Nein. Unsere Unterstützung zeigt, wo Lücken bestehen, welche Nachweise fehlen und was zu beheben ist. ${sentence(service.boundary)}`
        : "Nein. Unsere Unterstützung zeigt, wo Lücken bestehen, welche Nachweise fehlen und was zu beheben ist. Über Zertifizierung oder Testat entscheidet die jeweils zuständige Stelle; Golden Valley Cyber sagt kein Ergebnis zu.",
    });
  } else if (service.category === "vulnerability-scanning") {
    faqs.push({
      question: "Was ist der Unterschied zwischen Schwachstellenscan und Penetrationstest?",
      answer: "Ein Schwachstellenscan nutzt Werkzeuge, um bekannte Schwächen schnell über viele Systeme hinweg zu finden; die Ergebnisse werden validiert, damit Sie echte Risiken von Rauschen unterscheiden können. Ein Penetrationstest ist manuell: Ein Tester versucht, Schwachstellen auszunutzen, um die tatsächlichen Auswirkungen zu zeigen. Viele Teams scannen regelmäßig und testen in größeren Abständen.",
    });
  } else {
    faqs.push({
      question: "Was ist der Unterschied zwischen Penetrationstest und Schwachstellenscan?",
      answer: "Ein Penetrationstest wird manuell durchgeführt und versucht, Schwachstellen auszunutzen, um Angriffspfade und geschäftliche Auswirkungen zu zeigen. Ein Schwachstellenscan ist werkzeuggestützt und findet bekannte Schwächen in der Breite. Tests beziehen sich meist auf ausgewählte Systeme, Scans decken mehr Fläche häufiger ab.",
    });
  }

  faqs.push({
    question: `Was erhalte ich am Ende der Leistung ${service.shortName ?? service.name}?`,
    answer: "Priorisierte Ergebnisse, praxisnahe Hinweise zur Behebung und einen klaren Weg zum Abschluss, auf Grundlage des zu Beginn vereinbarten Umfangs.",
  });

  return faqs;
}
