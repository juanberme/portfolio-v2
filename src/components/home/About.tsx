import Image from "next/image";
import { GitHubIcon, ToolIcon } from "@/components/Icons";
import Widget from "@/components/Widget";
import OrgTag from "@/components/ui/OrgTag";
import { ORGS } from "@/content/orgs";
import { about } from "@/content/home";
import { Tx, biAlt } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { GITHUB_SCALE } from "@/lib/tokens";
import GitHubGraph from "./GitHubGraph";
import LiveClock from "./LiveClock";
import s from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`wrap ${s.section}`}>
      <div className={s.wall}>
        <Widget tone="bare" className={s.story}>
          <h2 className="d1">
            <Tx t={about.title} />
          </h2>
          <p className={s.lead}>
            <Tx t={about.lead} />
          </p>
          <p className={`b3 dim ${s.before}`}>
            <Tx t={about.beforeLead} /> <OrgTag org={ORGS.alegra} />
            <Tx t={about.beforePre} /> <OrgTag org={ORGS.bees} /> <Tx t={about.beforeAnd} />{" "}
            <OrgTag org={ORGS.bluepixel} />
            <Tx t={about.beforePost} />
          </p>
        </Widget>

        <div className={s.side}>
        <Widget flush className={s.map}>
          <div className={s.mapcard}>
            <Image
              src="/images/map-bogota.webp"
              {...biAlt(about.mapAlt)}
              width={2080}
              height={1320}
              sizes="1040px"
              className={s.mapImg}
            />
            <i className={s.halo} />
            <i className={s.pin} />
            <div className={s.pill}>
              <i className={s.pillDot} />
              <b>Bogotá, CO</b>
              <LiveClock className={s.time} />
            </div>
          </div>
        </Widget>

        <Widget tone="navy" className={`on-dark ${s.github}`}>
          <div className={s.row}>
            <p className={`lbl ${s.ghTitle}`}>
              <GitHubIcon />
              GitHub
            </p>
            <a href={SITE.links.github} className={s.handle}>
              @{SITE.github} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={s.row}>
            <span className={`b6 ${s.onNavyDim}`}>
              <Tx t={about.github.perDay} />
            </span>
            <span className={s.legend}>
              <Tx t={about.github.less} />
              {GITHUB_SCALE.map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
              <Tx t={about.github.more} />
            </span>
          </div>
          <GitHubGraph user={SITE.github} profile={SITE.links.github} />
        </Widget>
        </div>

        <Widget className={s.tools}>
          <p className="lbl dim">
            <Tx t={about.toolsTitle} />
          </p>
          <div className={s.chips}>
            {about.tools.map((t) => (
              <span key={t.name} className={s.chip}>
                {t.logo ? (
                  <img src={t.logo} alt="" width={20} height={20} className={s.logo} />
                ) : (
                  <i className={s.ico}>
                    <ToolIcon name={t.icon ?? ""} />
                  </i>
                )}
                <b>{t.name}</b>
                <span className={s.role}>
                  <Tx t={t.role} />
                </span>
              </span>
            ))}
          </div>
        </Widget>
      </div>
    </section>
  );
}
