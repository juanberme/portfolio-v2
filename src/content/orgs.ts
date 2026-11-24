/**
 * Places I work or have worked at. One source for the name and logo, used by OrgTag,
 * the case pages and the Trajectory cards.
 */
export interface Org {
  name: string;
  logo?: string;
}

export const ORGS = {
  alegra: { name: "Alegra", logo: "/images/logos/alegra.webp" },
  bees: { name: "300Bees", logo: "/images/logos/300bees.webp" },
  lakuna: { name: "Lakuna", logo: "/images/logos/lakuna.webp" },
  bluepixel: { name: "BluePixel", logo: "/images/logos/bluepixel.webp" },
  icesi: { name: "Universidad Icesi", logo: "/images/logos/Icesi.svg" },
} satisfies Record<string, Org>;
