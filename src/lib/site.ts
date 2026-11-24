/** Site-wide constants. Change links here, not in components. */
export const SITE = {
  name: "Camilo Bermeo",
  /* used for absolute URLs in link previews; update when the domain is decided */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://camilo-bermeo.vercel.app",
  email: "camilo22601@gmail.com",
  github: "juanberme",
  links: {
    linkedin: "https://www.linkedin.com/in/juan-camilo-bermeo/",
    github: "https://github.com/juanberme",
    behance: "https://www.behance.net/camilo22604819",
    /* points at the CV on the current live site (agreed: keep it there for now) */
    cv: "/cv/camilo-bermeo-cv.pdf",
  },
} as const;
