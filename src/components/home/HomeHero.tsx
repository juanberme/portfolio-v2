import LanguageSwitch from "@/components/LanguageSwitch";
import { SecondaryButton, TextLink } from "@/components/ui/Button";
import OrgTag from "@/components/ui/OrgTag";
import { hero, nav } from "@/content/home";
import { ORGS } from "@/content/orgs";
import { Tx } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import HeroField from "./HeroField";
import s from "./HomeHero.module.css";

export default function HomeHero() {
  return (
    <div className={s.outer}>
      <header id="top" className={s.header}>
        <HeroField />
        <nav className={s.nav}>
          <a href="#work" className={s.navLink}>
            <Tx t={nav.work} />
          </a>
          <a href="#top" className={s.logo}>
            <span className="sr-only">
              <Tx t={nav.home} />
            </span>
            <img src="/images/logo.svg" alt="" width={40} height={40} />
          </a>
          <a href="#contact" className={s.navLink}>
            <Tx t={nav.contact} />
          </a>
        </nav>
        <div className={s.lang}>
          <LanguageSwitch />
        </div>
        <div className={s.copy} data-hero-copy>
          <span className={s.hi}>
            <Tx t={hero.hi} />{" "}
            <OrgTag org={ORGS.alegra} />
          </span>
          <h1 className={s.title}>
            <Tx t={hero.title} />
          </h1>
          <p className={s.body}>
            <Tx t={hero.body} />
          </p>
          <div className={s.ctas}>
            <SecondaryButton href={`mailto:${SITE.email}`} label={hero.email} event="email_click" eventProps={{ from: "hero" }} />
            <TextLink href="#work" label={hero.seeWork} arrow="down" />
          </div>
        </div>
      </header>
    </div>
  );
}
