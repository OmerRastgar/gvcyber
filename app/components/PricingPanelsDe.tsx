import type { ServiceCategory } from "../data/services";
import { DE_PRICE_NOTE } from "../data/de/services";

type Props = {
  category: ServiceCategory;
  risk: string;
  price: string;
  priceDetails: string;
  formalPrice?: string;
  formalDetails?: string;
};

/** German pricing panels: server-rendered EUR figures (no client-side currency conversion). */
export default function PricingPanelsDe({ category, risk, price, priceDetails, formalPrice, formalDetails }: Props) {
  const isAudit = category === "audits";
  return (
    <section className={isAudit ? "service-evidence-grid audit-pricing-layout" : "service-evidence-grid"}>
      <article className="risk-panel">
        <p>WARUM ES WICHTIG IST</p>
        <h2>Das Risiko, wenn es fehlt</h2>
        <span>{risk}</span>
      </article>

      <article className="price-panel">
        <p>RICHTWERT FÜR UNSERE LEISTUNG · DEUTSCHLAND</p>
        <h2>{price}</h2>
        <span>{priceDetails}</span>
        <div className="pricing-scope-note">
          <b>Der Umfang bestimmt den Preis.</b>
          <span>Wir kalkulieren nach Personen, Komplexität des Unternehmens und technischem Umfang: Systeme, Anwendungen, Standorte, Zugänge, Qualität der vorhandenen Nachweise und Tiefe der Umsetzung.</span>
        </div>
        <small>{DE_PRICE_NOTE}</small>
      </article>

      {formalPrice && (
        <article className="price-panel formal-panel">
          <p>FÖRMLICHE PRÜFUNG ODER ZERTIFIZIERUNG</p>
          <h2>{formalPrice}</h2>
          <span>{formalDetails}</span>
        </article>
      )}
    </section>
  );
}
