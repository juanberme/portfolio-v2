import Image from "next/image";
import Link from "next/link";
import AsciiField from "@/components/AsciiField";
import LanguageSwitch from "@/components/LanguageSwitch";
import OrgTag from "@/components/ui/OrgTag";
import type { Case } from "@/content/cases";
import { nav } from "@/content/home";
import { Tx, biAlt } from "@/lib/i18n";
import s from "./CaseCover.module.css";
import { COLOR } from "@/lib/tokens";

/** Cover of a case page (canvas: "portada A7"): giant title over a navy ASCII aurora, the screen rising below. */
export default function CaseCover({ c }: { c: Case }) {
  return (
    <header className={`on-dark ${s.cover}`}>
      <AsciiField mode="aurora" flip px={8} fg={COLOR.blue} bg={COLOR.navy} style={{ zIndex: 0 }} />
      <nav className={s.nav}>
        <Link href="/#work" className={s.navLink}>
          <Tx t={nav.allWork} />
        </Link>
        <Link href="/" className={s.logo}>
          <span className="sr-only">
            <Tx t={nav.home} />
          </span>
          <img src="/images/logo.svg" alt="" width={40} height={40} />
        </Link>
        <span className={s.navRight}>
          <a href="#contact" className={s.navLink}>
            <Tx t={nav.contact} />
          </a>
          <LanguageSwitch tone="dark" />
        </span>
      </nav>

      <div className={s.head}>
        <span className={s.meta}>
          <OrgTag org={{ name: c.org.en, logo: c.orgLogo }} name={c.org} />
          <span className={s.metaText}>
            · {c.year} · <Tx t={c.topic} />
          </span>
        </span>
        <h1 className={s.title}>
          <Tx t={c.title} />
        </h1>
        <p className={s.tease}>
          <Tx t={c.tease} />
        </p>
      </div>

      <div className={s.persp}>
        {c.cover.kind === "web" ? (
          <div className={s.crop}>
            <Image
              src={c.cover.shot.src}
              width={c.cover.shot.w}
              height={c.cover.shot.h}
              {...biAlt(c.cover.shot.alt)}
              priority
              sizes="(max-width: 900px) 92vw, 1270px"
              className={s.cropImg}
              style={{ left: c.cover.crop.left, top: c.cover.crop.top, width: c.cover.crop.width }}
            />
          </div>
        ) : (
          <div className={s.phones}>
            {c.cover.shots.map((sh, i) => (
              <Image
                key={sh.src}
                src={sh.src}
                width={sh.w}
                height={sh.h}
                {...biAlt(sh.alt)}
                priority={i === 0}
                sizes="(max-width: 900px) 44vw, 300px"
                className={s.phone}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
