import type { ServiceCategory } from "../services";

/**
 * German service catalogue (core set). English slugs are mirrored under /de so hreflang pairs line up;
 * German-only services (twin: false) have no English counterpart.
 * Prices are net indicative figures converted from the international USD ranges (1 USD ~ 0,92 EUR) and rounded.
 * Services that are new for the German market carry "auf Anfrage" instead of an invented price.
 * All text needs review by a native German speaker; legal statements need review by a German lawyer.
 */
export type DeService = {
  slug: string;
  category: ServiceCategory;
  /** True when an English page with the same slug exists (hreflang pair). */
  twin: boolean;
  name: string;
  shortName?: string;
  appliesTo: string;
  risk: string;
  price: string;
  priceDetails: string;
  formalPrice?: string;
  formalDetails?: string;
  /** What we deliver. */
  deliverables?: string[];
  /** What a recognised body must do, and why we are not that body. */
  boundary?: string;
};

export const deCategoryContent: Record<ServiceCategory, { label: string; title: string; description: string; hubHref: string }> = {
  audits: {
    label: "Audit & Compliance",
    title: "Sicherheitsaudits und Compliance-Vorbereitung",
    description: "Wir zeigen, welche Maßnahmen Sie bereits haben, welche Nachweise fehlen und was bis zur Prüfungsreife zu tun ist.",
    hubHref: "/de/services/audits",
  },
  "vulnerability-scanning": {
    label: "Schwachstellenscans",
    title: "Schwachstellen finden, bevor sie zum Vorfall werden",
    description: "Gezielte Scans für Netzwerke, Anwendungen, Endgeräte, Datenbanken und Cloud-Umgebungen, mit Ergebnissen, die Ihr Team direkt umsetzen kann.",
    hubHref: "/de/services/vulnerability-scanning",
  },
  "penetration-testing": {
    label: "Penetrationstests",
    title: "Prüfen, wie Ihre Abwehr in der Praxis standhält",
    description: "Manuelle Sicherheitstests, die Angriffsflächen belegen, geschäftliche Auswirkungen aufzeigen und einen klaren Weg zur Behebung liefern.",
    hubHref: "/de/services/penetration-testing",
  },
};

export const DE_PRICE_NOTE =
  "Richtwerte netto, umgerechnet aus unseren internationalen Preisen (1 USD ≈ 0,92 €) und gerundet, zuzüglich gesetzlicher Umsatzsteuer, soweit anfallend. Der tatsächliche Preis richtet sich nach dem Umfang.";

export const deServices: DeService[] = [
  // ───────────── Audit & Compliance ─────────────
  {
    slug: "iso-27001",
    category: "audits",
    twin: true,
    name: "ISO 27001",
    appliesTo: "Organisationen, die ein strukturiertes Informationssicherheits-Managementsystem (ISMS) benötigen",
    risk: "Schwache Governance, uneinheitliche Maßnahmen und verpasste Aufträge, wenn eine Zertifizierung erwartet wird.",
    price: "1.500 – 4.500 €+",
    priceDetails: "Reifegradanalyse, Gap-Analyse und Unterstützung beim Aufbau des ISMS; der Aufwand hängt von Geltungsbereich, Mitarbeiterzahl und Standorten ab.",
    formalPrice: "4.500 – 14.000 €+",
    formalDetails: "Die Kosten der Zertifizierung hängen von Mitarbeiterzahl, Geltungsbereich und Zertifizierungsstelle ab.",
    deliverables: [
      "Festlegung des Geltungsbereichs und Kontextanalyse",
      "Gap-Analyse gegen ISO/IEC 27001 und Anhang A",
      "Risikoanalyse und Risikobehandlungsplan",
      "Erstellung und Prüfung von Richtlinien und Nachweisen",
      "Vorbereitung auf interne Audits und das Zertifizierungsaudit",
    ],
    boundary: "Das Zertifikat stellt eine akkreditierte Zertifizierungsstelle aus. Wir sind keine Zertifizierungsstelle; wir bereiten Sie auf das Audit vor.",
  },
  {
    slug: "soc-2",
    category: "audits",
    twin: true,
    name: "SOC 2 (Type I / Type II)",
    shortName: "SOC 2",
    appliesTo: "SaaS- und Technologieunternehmen, die Kundendaten verarbeiten",
    risk: "Gescheiterte Sorgfaltsprüfungen großer Kunden, verzögerte Vertragsabschlüsse und fehlende Zusicherung über Dienstleistungskontrollen.",
    price: "4.500 – 23.000 €+",
    priceDetails: "Reifegradanalyse, Kontrolldesign und Nachweisunterstützung. Vergleichbare US-Beratungsprojekte kosten oft deutlich mehr.",
    formalPrice: "Type I: 4.500 – 14.000 € · Type II: 6.500 – 27.000 €+",
    formalDetails: "Das Testat muss von einer entsprechend zugelassenen Wirtschaftsprüfungsgesellschaft (CPA-Firma) ausgestellt werden; viele Kunden erwarten einen US-Aussteller.",
  },
  {
    slug: "gdpr-compliance",
    category: "audits",
    twin: true,
    name: "DSGVO-Compliance",
    shortName: "DSGVO",
    appliesTo: "Organisationen, die personenbezogene Daten von Personen in der EU oder im Vereinigten Königreich verarbeiten",
    risk: "Behördliche Maßnahmen, vertragliche Risiken und Vertrauensverlust nach unrechtmäßiger oder schlecht kontrollierter Datenverarbeitung.",
    price: "3.500 – 14.000 €+",
    priceDetails: "Die Vorbereitung kann Datenflussanalyse, Verzeichnis von Verarbeitungstätigkeiten (VVT), Datenschutz-Folgenabschätzungen (DSFA), Prüfung von Auftragsverarbeitungsverträgen (AVV) und technischen und organisatorischen Maßnahmen (TOM) umfassen.",
    formalPrice: "2.800 – 14.000 €+",
    formalDetails: "Die DSGVO ist keine Zertifizierung. Der Rahmen deckt unabhängige Compliance-Audits oder freiwillige Nachweise wie ISO 27701 ab.",
    deliverables: [
      "Datenfluss- und Verarbeitungsübersicht, Verzeichnis von Verarbeitungstätigkeiten (VVT)",
      "Bewertung technischer und organisatorischer Maßnahmen (TOM) nach Art. 32 DSGVO",
      "Prüfung von Auftragsverarbeitung (AVV) und Drittlandübermittlungen",
      "Unterstützung bei Datenschutz-Folgenabschätzungen (DSFA)",
    ],
    boundary: "Wir ersetzen weder Ihre Datenschutzbeauftragte bzw. Ihren Datenschutzbeauftragten noch eine Rechtsberatung. Rechtliche Bewertungen sollten Sie mit einer Rechtsanwältin oder einem Rechtsanwalt abstimmen.",
  },
  {
    slug: "dora",
    category: "audits",
    twin: true,
    name: "DORA",
    appliesTo: "Finanzunternehmen und kritische IKT-Drittdienstleister in der Europäischen Union",
    risk: "Aufsichtsrechtliche Risiken und unzureichende operationale Resilienz bei Technologie- und Drittanbieterdiensten.",
    price: "9.000 – 46.000 €+",
    priceDetails: "Unterstützung bei IKT-Risikomanagement, Meldung von Vorfällen, Resilienztests und Kontrollen für Drittanbieter.",
    formalPrice: "Nicht zutreffend",
    formalDetails: "DORA ist eine regulatorische Anforderung und keine eigenständige Zertifizierung; unabhängige Prüfungen können dennoch als Nachweis dienen.",
  },
  {
    slug: "nis2",
    category: "audits",
    twin: true,
    name: "NIS2",
    appliesTo: "Besonders wichtige und wichtige Einrichtungen in den von NIS2 erfassten Sektoren",
    risk: "Aufsichtsmaßnahmen, persönliche Verantwortung der Geschäftsleitung und schwache Resilienz bei wesentlichen Diensten.",
    price: "4.500 – 23.000 €+",
    priceDetails: "Unterstützung bei Governance, Risikomanagementmaßnahmen, Vorfallbewältigung und Lieferkettenkontrollen.",
    formalPrice: "Nicht zutreffend",
    formalDetails: "NIS2 wird über nationales Recht umgesetzt und ist keine eigenständige Zertifizierung.",
    deliverables: [
      "Betroffenheitsanalyse: fallen Sie unter NIS2 und in welche Kategorie?",
      "Gap-Analyse gegen die Risikomanagementmaßnahmen",
      "Meldeprozesse für erhebliche Sicherheitsvorfälle",
      "Lieferketten- und Dienstleisterbewertung",
      "Schulungs- und Nachweiskonzept für die Geschäftsleitung",
    ],
    boundary: "Verbindliche rechtliche Einordnung, etwa zur Betroffenheit, erfolgt durch Ihre Rechtsberatung und die zuständige Behörde; wir liefern die technische und organisatorische Analyse.",
  },
  // ───────────── Deutschland-spezifisch ─────────────
  {
    slug: "it-grundschutz",
    category: "audits",
    twin: false,
    name: "ISO 27001 auf Basis von IT-Grundschutz",
    shortName: "IT-Grundschutz",
    appliesTo: "Unternehmen und Behörden, die ein ISMS nach BSI IT-Grundschutz oder ISO 27001 aufbauen wollen",
    risk: "Unklare Zuständigkeiten, lückenhafte Absicherung des Informationsverbunds und fehlende Nachweise gegenüber Kunden, Aufsicht und Prüfern.",
    price: "Auf Anfrage",
    priceDetails: "Der Aufwand hängt von Größe und Komplexität des Informationsverbunds, vom gewählten Einstieg (Basis-, Kern- oder Standard-Absicherung) und vom vorhandenen Reifegrad ab. Wir erstellen nach einem Erstgespräch ein Angebot.",
    deliverables: [
      "Strukturanalyse des Informationsverbunds und Schutzbedarfsfeststellung",
      "Modellierung anhand der Bausteine des IT-Grundschutz-Kompendiums",
      "IT-Grundschutz-Check und Risikoanalyse (nach BSI-Standard 200-3)",
      "Maßnahmenplan mit Prioritäten und Verantwortlichen",
      "Dokumentation und Nachweise für das Audit",
    ],
    boundary: "Zertifikate ISO 27001 auf der Basis von IT-Grundschutz erteilt das BSI nach einem Audit durch ein vom BSI zertifiziertes Auditteam. Wir sind keine Prüf- oder Zertifizierungsstelle und stellen keine Zertifikate aus; wir bereiten Sie auf das Audit vor.",
  },
  {
    slug: "kritis-nis2",
    category: "audits",
    twin: false,
    name: "KRITIS und NIS2-Umsetzung",
    shortName: "KRITIS & NIS2",
    appliesTo: "Betreiber kritischer Infrastrukturen und Einrichtungen, die unter das BSI-Gesetz und die NIS2-Umsetzung fallen",
    risk: "Bußgelder, Aufsichtsmaßnahmen und Ausfälle kritischer Dienste, wenn Stand der Technik und Nachweispflichten nicht erfüllt werden.",
    price: "Auf Anfrage",
    priceDetails: "Der Aufwand hängt von Sektor, Anlagen und vorhandenen Nachweisen ab. Wir erstellen nach einem Erstgespräch ein Angebot.",
    deliverables: [
      "Gap-Analyse gegen die Anforderungen an Maßnahmen nach dem Stand der Technik",
      "Branchenspezifische Sicherheitsstandards (B3S) und Orientierungshilfen als Prüfmaßstab",
      "Vorbereitung auf Nachweisprüfungen und Meldewege zum BSI",
      "Konzepte für Angriffserkennung und Vorfallbewältigung",
      "Maßnahmenplan für Geschäftsleitung und Fachbereiche",
    ],
    boundary: "Nachweisprüfungen für Betreiber kritischer Infrastrukturen führen dafür geeignete Prüfstellen durch. Wir sind keine Prüfstelle; wir bereiten Sie vor und schließen technische Lücken.",
  },
  {
    slug: "tisax",
    category: "audits",
    twin: false,
    name: "TISAX-Vorbereitung für die Automobilindustrie",
    shortName: "TISAX",
    appliesTo: "Zulieferer und Dienstleister der Automobilindustrie, von denen Kunden ein TISAX-Assessment verlangen",
    risk: "Verlust von Aufträgen oder Lieferantenstatus, wenn ein gefordertes Assessment-Ergebnis nicht rechtzeitig vorliegt.",
    price: "Auf Anfrage",
    priceDetails: "Der Aufwand hängt vom geforderten Assessment-Level, vom Geltungsbereich und vom Reifegrad nach VDA ISA ab. Wir erstellen nach einem Erstgespräch ein Angebot.",
    deliverables: [
      "Bestimmung des Geltungsbereichs und der Assessment-Ziele",
      "Gap-Analyse gegen den VDA-ISA-Fragenkatalog",
      "Umsetzungsplan und Unterstützung bei der Behebung von Abweichungen",
      "Vorbereitung auf das Assessment, inklusive Nachweisführung",
    ],
    boundary: "Das TISAX-Assessment führt ein von der ENX Association zugelassener Prüfdienstleister durch. Wir sind kein Prüfdienstleister und führen keine Assessments durch. TISAX ist eine eingetragene Marke der ENX Association.",
  },
  {
    slug: "bsi-c5",
    category: "audits",
    twin: false,
    name: "BSI C5 für Cloud-Anbieter",
    shortName: "BSI C5",
    appliesTo: "Cloud-Anbieter, die Kunden im öffentlichen Sektor oder in regulierten Branchen bedienen",
    risk: "Ausschluss aus Ausschreibungen und Beschaffungen, wenn ein Nachweis nach dem Cloud Computing Compliance Criteria Catalogue fehlt.",
    price: "Auf Anfrage",
    priceDetails: "Der Aufwand hängt von Dienstumfang, Architektur und vorhandenen Nachweisen ab. Wir erstellen nach einem Erstgespräch ein Angebot.",
    deliverables: [
      "Gap-Analyse gegen den aktuellen C5-Kriterienkatalog",
      "Abbildung der vorhandenen Kontrollen und Nachweise auf die C5-Kriterien",
      "Maßnahmenplan und Unterstützung bei der Umsetzung",
      "Vorbereitung auf die Prüfung durch Ihre Wirtschaftsprüferin oder Ihren Wirtschaftsprüfer",
    ],
    boundary: "Ein C5-Testat stellt eine unabhängige Wirtschaftsprüfungsgesellschaft aus. Wir sind kein Testat-Aussteller; wir bereiten Sie auf die Prüfung vor.",
  },
  // ───────────── Schwachstellenscans ─────────────
  {
    slug: "network-vulnerability-scanning",
    category: "vulnerability-scanning",
    twin: true,
    name: "Netzwerk-Schwachstellenscan",
    appliesTo: "Unternehmen mit Routern, Firewalls und internen Netzwerken",
    risk: "Offene Ports und ungepatchte Netzwerkgeräte bleiben unentdeckt und angreifbar.",
    price: "280 – 1.400 € pro Projekt · 2 – 5 € pro Asset/Monat",
    priceDetails: "Der Preis steigt mit der Zahl der IP-Adressen. Kleine Netzwerke unter 50 IPs liegen am unteren Ende, größere interne Netzwerke erfordern mehr Abdeckung.",
  },
  {
    slug: "web-application-vulnerability-scanning",
    category: "vulnerability-scanning",
    twin: true,
    name: "Schwachstellenscan für Webanwendungen",
    appliesTo: "Organisationen mit öffentlich erreichbaren Websites oder APIs",
    risk: "Schwachstellen aus den OWASP Top 10, etwa Injection und Cross-Site-Scripting, bleiben möglicherweise unentdeckt.",
    price: "450 – 2.300 € je Anwendung",
    priceDetails: "Einfache Präsenz- oder Login-Seiten liegen am unteren Ende. Komplexe SaaS- oder FinTech-Anwendungen mit vielen Rollen und API-Anbindungen kosten mehr.",
  },
  {
    slug: "host-based-vulnerability-scanning",
    category: "vulnerability-scanning",
    twin: true,
    name: "Host-basierter Schwachstellenscan",
    appliesTo: "Unternehmen mit Servern, Arbeitsplatzrechnern und Endgeräten",
    risk: "Fehlende Betriebssystem-Patches und Fehlkonfigurationen auf Endgeräten können zur lokalen Kompromittierung führen.",
    price: "450 – 1.850 € pro Projekt · 3 – 7 € je Endgerät/Monat",
    priceDetails: "Erfordert in der Regel Agenten oder authentifizierten Zugriff. Der Preis hängt von Anzahl der Hosts, Betriebssystemen und Prüftiefe ab.",
  },
  {
    slug: "database-vulnerability-scanning",
    category: "vulnerability-scanning",
    twin: true,
    name: "Schwachstellenscan für Datenbanken",
    appliesTo: "Unternehmen, die sensible Daten in SQL- oder NoSQL-Datenbanken speichern",
    risk: "Schwache Zugangsdaten, fehlerhafte Zugriffskontrollen und Fehlkonfigurationen können unbefugten Zugriff oder einen größeren Datenabfluss ermöglichen.",
    price: "750 – 2.800 €+ je Datenbankumgebung",
    priceDetails: "Spezielle Prüfungen decken datenbankspezifische Fehlkonfigurationen, schwache Zugangsdaten, Berechtigungen und Schwächen in der Zugriffskontrolle ab.",
  },
  {
    slug: "authenticated-vulnerability-scanning",
    category: "vulnerability-scanning",
    twin: true,
    name: "Authentifizierter Schwachstellenscan",
    appliesTo: "Organisationen, die interne Systeme tiefgehend prüfen lassen wollen",
    risk: "Verborgene interne Fehlkonfigurationen, fehlende Patches und Schwächen in der Registry bleiben möglicherweise unentdeckt.",
    price: "900 – 3.700 €+ pro Projekt",
    priceDetails: "Tiefer Zugriff und die Konfiguration von Dienstkonten liefern deutlich bessere Daten, die unsere Ingenieure sorgfältig validieren, um Fehlalarme zu entfernen.",
  },
  {
    slug: "unauthenticated-vulnerability-scanning",
    category: "vulnerability-scanning",
    twin: true,
    name: "Nicht-authentifizierter Schwachstellenscan",
    shortName: "Externer Scan",
    appliesTo: "Unternehmen, die die Sicht eines externen Angreifers erhalten möchten",
    risk: "Schwächen am Perimeter und öffentlich erreichbare Dienste bleiben möglicherweise unbemerkt.",
    price: "230 – 900 € pro Projekt",
    priceDetails: "Ein schneller, weitgehend automatisierter Blick auf die Außenwirkung mit offenen Ports und Diensten bei minimalem Einrichtungsaufwand.",
  },
  {
    slug: "cloud-native-vulnerability-scanning",
    category: "vulnerability-scanning",
    twin: true,
    name: "Schwachstellenscan für Cloud-native Umgebungen",
    shortName: "Cloud-Scan",
    appliesTo: "Cloud-first-Unternehmen mit Containern, Serverless-Diensten und verwalteten Cloud-Plattformen",
    risk: "Ungepatchte Images, öffentlich erreichbarer Speicher und schwache IAM-Kontrollen können Cloud-Workloads angreifbar machen.",
    price: "1.400 – 4.600 €+ pro Projekt · laufende Pakete möglich",
    priceDetails: "Umfasst AWS-, Azure- oder GCP-Umgebungen inklusive IAM, Registries und Serverless-Konfiguration, mit fachlicher Auswertung der Ergebnisse.",
  },
  // ───────────── Penetrationstests ─────────────
  {
    slug: "network-penetration-testing",
    category: "penetration-testing",
    twin: true,
    name: "Netzwerk-Penetrationstest",
    appliesTo: "Unternehmen mit interner oder externer Netzwerkinfrastruktur",
    risk: "Angreifer können ungepatchte Dienste und Netzwerkpfade ausnutzen und Datenabflüsse oder Ransomware-Vorfälle auslösen.",
    price: "900 – 3.700 €+ pro Projekt",
    priceDetails: "Der Aufwand wächst mit IPs, Subnetzen und Komplexität. Kleine externe Perimeter kosten weniger als große interne Active-Directory-Umgebungen.",
  },
  {
    slug: "web-application-penetration-testing",
    category: "penetration-testing",
    twin: true,
    name: "Penetrationstest für Webanwendungen",
    shortName: "Web-Pentest",
    appliesTo: "SaaS-Anbieter, eCommerce und Organisationen mit öffentlich erreichbaren Webanwendungen",
    risk: "Ausnutzbare Schwachstellen wie SQL-Injection und XSS können zu Datenpannen, Compliance-Verstößen und Vertrauensverlust führen.",
    price: "550 – 2.800 €+ je Anwendung",
    priceDetails: "Einfache Seiten ohne Anmeldung oder schlichte Portale liegen am unteren Ende. Komplexe SaaS-, FinTech-, API- und Zahlungsabläufe erfordern tiefere manuelle Tests.",
  },
  {
    slug: "mobile-app-penetration-testing",
    category: "penetration-testing",
    twin: true,
    name: "Penetrationstest für mobile Apps",
    shortName: "Mobile-Pentest",
    appliesTo: "Unternehmen, die iOS- oder Android-Apps für Kunden oder Mitarbeitende anbieten",
    risk: "Unsichere Apps können personenbezogene Daten preisgeben, mobile Geräte kompromittieren oder aus App-Stores entfernt werden.",
    price: "900 – 3.200 €+ je Plattform",
    priceDetails: "Die Tests umfassen APK- bzw. IPA-Analyse, lokale Datenspeicherung und abgefangenen API-Verkehr. iOS und Android werden oft gebündelt geprüft.",
  },
  {
    slug: "cloud-infrastructure-penetration-testing",
    category: "penetration-testing",
    twin: true,
    name: "Penetrationstest für Cloud-Infrastruktur",
    shortName: "Cloud-Pentest",
    appliesTo: "Unternehmen, die AWS, Azure, GCP oder Cloud-native Dienste nutzen",
    risk: "Falsch konfigurierte IAM-Rollen, Speicher oder Serverless-Dienste können Daten offenlegen und unbefugten Cloud-Zugriff ermöglichen.",
    price: "1.400 – 4.600 €+ je Umgebung",
    priceDetails: "Spezielle Tests konzentrieren sich auf Cloud-Identitäten, Speicher, Konfiguration und Dienstmissbrauch statt nur auf klassische Netzwerk-Ports.",
  },
  {
    slug: "social-engineering-penetration-testing",
    category: "penetration-testing",
    twin: true,
    name: "Social-Engineering-Test",
    appliesTo: "Organisationen, die die Widerstandsfähigkeit von Menschen und Prozessen prüfen wollen",
    risk: "Phishing und Identitätsvortäuschung können Zugangsdaten entwenden und ansonsten starke technische Kontrollen umgehen.",
    price: "450 – 1.850 €+ je Kampagne",
    priceDetails: "In der Regel mit maßgeschneidertem Phishing. Erweiterte, ausdrücklich genehmigte Tests können Vishing oder physische Szenarien umfassen, wo dies praktikabel ist. Beteiligung von Betriebsrat und Datenschutz sollte vorab geklärt werden.",
  },
  {
    slug: "wireless-network-penetration-testing",
    category: "penetration-testing",
    twin: true,
    name: "WLAN-Penetrationstest",
    shortName: "WLAN-Pentest",
    appliesTo: "Büros, Einzelhandelsstandorte und Produktionsbetriebe mit WLAN oder Bluetooth",
    risk: "Schwache Funknetz-Kontrollen können unbefugten Zugriff, Rogue-Access-Points und das Abhören von Datenverkehr ermöglichen.",
    price: "450 – 1.400 €+ je Standort",
    priceDetails: "Vor Ort oder über eine genehmigte Drop-Box, geprüft werden WPA2/WPA3, Segmentierung, Rogue-Access-Points und Gastnetz.",
  },
  {
    slug: "iot-embedded-penetration-testing",
    category: "penetration-testing",
    twin: true,
    name: "IoT- und Embedded-Penetrationstest",
    shortName: "IoT-Pentest",
    appliesTo: "Hersteller, Medizingeräte-Anbieter und Unternehmen für Smart-Technologie",
    risk: "Kompromittierte Hardware kann Daten abfließen lassen, Teil von Botnetzen werden oder Folgen für die physische Sicherheit haben.",
    price: "1.850 – 5.500 €+ je Gerätetyp",
    priceDetails: "Spezielle Hardwaretests können UART-, JTAG- und SPI-Analyse, Firmware-Extraktion und Reverse Engineering umfassen. Geräte werden in der Regel an das Labor geschickt.",
  },
];

export const getDeService = (slug: string) => deServices.find((service) => service.slug === slug);

export const getDeServicesByCategory = (category: ServiceCategory) =>
  deServices.filter((service) => service.category === category);
