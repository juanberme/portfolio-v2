import { TextLink } from "@/components/ui/Button";
import { Tx, tr } from "@/lib/i18n";

export default function NotFound() {
  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <p className="lbl dim">404</p>
        <h1 className="d1">
          <Tx t={tr("This page doesn't exist.", "Esta página no existe.")} />
        </h1>
        <TextLink href="/" label={tr("Back to home", "Volver al inicio")} arrow="next" />
      </div>
    </main>
  );
}
