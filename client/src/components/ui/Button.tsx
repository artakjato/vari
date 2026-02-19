import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Button({
  variant = "primary",
  children,
  onClick,
  style,
}: ButtonProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--accent-primary)",
      color: "white",
      border: "none",
    },
    secondary: {
      background: "var(--accent-secondary)",
      color: "var(--text-primary)",
      border: "none",
    },
    ghost: {
      background: "transparent",
      color: "var(--accent-primary)",
      border: "2px solid var(--accent-primary)",
    },
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        padding: "10px 20px",
        borderRadius: 8,
        fontFamily: "Outfit",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}
