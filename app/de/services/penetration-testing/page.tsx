import CategoryPageDe from "../../../components/CategoryPageDe";
import { deMetadata } from "../../../i18n/locales";

export const metadata = deMetadata({
  title: "Penetrationstests: Web, Netz, Cloud",
  description: "Manuelle Penetrationstests für Netzwerke, Webanwendungen, mobile Apps, Cloud, WLAN und IoT, mit klaren Empfehlungen zur Behebung.",
  path: "/de/services/penetration-testing",
});

export default function PentestsDe() {
  return <CategoryPageDe category="penetration-testing" />;
}
