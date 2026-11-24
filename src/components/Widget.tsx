import s from "./Widget.module.css";

type Tone = "card" | "navy" | "blue" | "orange" | "bare";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  /** remove the inner padding (for media that bleeds to the edge) */
  flush?: boolean;
}

/** The rounded tile used across About and Trajectory. */
export default function Widget({ tone = "card", flush, className = "", children, ...rest }: Props) {
  return (
    <div className={`${s.w} ${s[tone]} ${flush ? s.flush : ""} ${className}`} {...rest}>
      {children}
    </div>
  );
}
