import CategoryPageDe from "../../../components/CategoryPageDe";
import { deMetadata } from "../../../i18n/locales";

export const metadata = deMetadata({
  title: "Audit, ISO 27001, NIS2 und DSGVO",
  description: "Audit und Compliance-Vorbereitung für Deutschland: ISO 27001 und IT-Grundschutz, NIS2 und KRITIS, TISAX, BSI C5, DSGVO, SOC 2 und DORA.",
  path: "/de/services/audits",
});

export default function AuditsDe() {
  return <CategoryPageDe category="audits" />;
}
