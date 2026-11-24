"use client";

import { useEffect, useRef } from "react";
import { registerField, type AsciiMode } from "@/lib/ascii-engine";

interface Props {
  mode: AsciiMode;
  px?: number;
  fg: string;
  bg?: string;
  tint?: boolean;
  flip?: boolean;
  light?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** Decorative animated ASCII background. Fills its positioned parent. */
export default function AsciiField({ mode, px = 6, fg, bg = "none", tint, flip, light, className, style }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return registerField(ref.current, { mode, px, fg, bg, tint, flip, light });
  }, [mode, px, fg, bg, tint, flip, light]);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", ...style }}
    />
  );
}
