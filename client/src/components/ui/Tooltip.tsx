import { useState } from 'react';
import type { ReactNode } from 'react';


interface TooltipProps {
  text: string;
  children: ReactNode; 
}

export function Tooltip({ text, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
    style={{ position: 'relative', display: 'inline-block' }}
    onMouseEnter={() => setVisible(true)}
    onMouseLeave={() => setVisible(false)}
    >
      {children}

    {visible && (
      <div
      style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: 8,
        padding: '6px 12px',
        borderRadius: 6,
        background: 'var(--text-primary)',
        color: 'white',
        fontSize: 12,
        fontFamily: 'Inter',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}
      >
        {text}
      </div>
    )}
    </div>
  );
}