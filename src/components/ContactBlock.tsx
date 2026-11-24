import AsciiField from "@/components/AsciiField";
import LanguageSwitch from "@/components/LanguageSwitch";
import { SecondaryButton, TextLink } from "@/components/ui/Button";
import { contact } from "@/content/home";
import { Tx } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { COLOR } from "@/lib/tokens";
import s from "./ContactBlock.module.css";

/** The navy "Let's work together" block (end of the home and of every case). */
export default function ContactBlock() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={s.section}>
      <div className={`on-dark ${s.card}`} style={{ "--btn-ink": "var(--paper)", "--btn-bg": "var(--navy)" } as React.CSSProperties}>
        <AsciiField mode="fade" tint px={6} fg={COLOR.blue} bg={COLOR.navy} />
        <div className={s.inner}>
          <div className={s.left}>
            <img src="/images/logo.svg" alt="" width={40} height={40} />
            <h2 id="contact-title" className={s.title}>
              <Tx t={contact.title} />
            </h2>
            <SecondaryButton
              href={`mailto:${SITE.email}`}
              label={{ en: SITE.email, es: SITE.email }}
              event="email_click"
              eventProps={{ from: "footer" }}
              className={s.email}
            />
          </div>
          <div className={s.links}>
            <TextLink href={SITE.links.linkedin} label={{ en: "LinkedIn", es: "LinkedIn" }} arrow="out" />
            <TextLink href={SITE.links.github} label={{ en: "GitHub", es: "GitHub" }} arrow="out" />
            <TextLink href={SITE.links.behance} label={{ en: "Behance", es: "Behance" }} arrow="out" />
            <TextLink href={SITE.links.cv} label={contact.cv} arrow="down" event="cv_download" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The site footer: one line under the contact block. */
export function SiteFooter() {
  return (
    <footer className={`wrap ${s.footer}`}>
      <span>
        <Tx t={contact.footer} />
      </span>
      <LanguageSwitch />
    </footer>
  );
}
