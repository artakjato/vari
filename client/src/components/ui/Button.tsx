import React from 'react';
import { motion } from "framer-motion"; 

type ButtonVariant = "primary" | "secondary" | "ghost"; 

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}; 

const baseClasses =
"inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold" +  // + for joining long lines 
"transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]" +
"disabled:opacity-50 disabled:cursor-not-allowed"; 

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--accent-primary)] text-white",
  secondary: "bg-[var(--accent-secondary)] text-[var(--text-primary)]",
  ghost: "bg-transparent border border-[var(--border-subtle)] text-[var(--text-primary)]",
};


export function Button ({
  variant = "primary",
  className = "",
  ...props
} : ButtonProps) {
return (
  <motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className={`${baseClasses} ${variantClasses[variant]} ${className}`}
  {...props}
  />
)};