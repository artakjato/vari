import type { ReactNode } from "react";

interface BadgeProps {
  color: string;
  children: ReactNode;
}

export function Badge({ color, children }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "Inter",
        color: "white",
        background: color,
        opacity: 0.9,
      }}
    >
      {children}
    </span>
  );
}
