"use client";

import { useEffect, useState } from "react";

/** Current time in Bogotá, refreshed every 20 s. Empty on the server to avoid a mismatch. */
export default function LiveClock({ tz = "America/Bogota", className }: { tz?: string; className?: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, [tz]);
  return <span className={className}>{time}</span>;
}
