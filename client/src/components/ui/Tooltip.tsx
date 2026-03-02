import type { ReactNode } from "react";
import { useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg bg-foreground px-2.5 py-1 text-xs text-background shadow-sm">
          {text}
        </span>
      )}
    </span>
  );
}