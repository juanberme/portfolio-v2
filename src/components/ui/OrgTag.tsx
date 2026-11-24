import type { Org } from "@/content/orgs";
import { Tx, type T } from "@/lib/i18n";
import s from "./OrgTag.module.css";

/**
 * A place I work or have worked at: round logo + name in a small pill.
 * Sized in em, so it scales with the text it sits in (hero line, a paragraph, a case cover).
 * `name` overrides the org's name (e.g. a bilingual "Personal project"); the logo is optional.
 */
export default function OrgTag({ org, name, className }: { org?: Org; name?: T; className?: string }) {
  const logo = org?.logo;
  return (
    <span className={`${s.tag} ${logo ? "" : s.noLogo} ${className ?? ""}`}>
      {logo && <img src={logo} alt="" className={s.logo} />}
      {name ? <Tx t={name} /> : org?.name}
    </span>
  );
}
