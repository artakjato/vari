import type  { ReactNode } from 'react'; 

interface CardProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export function Card({ children, style }: CardProps) {
  return (
    <div
    style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', 
      ...style, 
    }}
    >
      {children}
    </div>
  ); 
}