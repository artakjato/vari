import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ConnectionTraceProps {

  fromX: number;
  fromY: number;

  toX: number;
  toY: number;

  color: string;

  visible: boolean;
}

export function ConnectionTrace({ fromX, fromY, toX, toY, color, visible }: ConnectionTraceProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const pathLength = useMotionValue(0);
  const dashOffset = useMotionValue(1);

  const midX = (fromX + toX) / 2;
  const cpOffsetY = Math.abs(toY - fromY) * 0.4 + 30;
  const d = `M ${fromX} ${fromY} C ${midX} ${fromY - cpOffsetY}, ${midX} ${toY + cpOffsetY}, ${toX} ${toY}`;

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathLength.set(length);
    }
  }, [d, pathLength]);

  useEffect(() => {
    if (visible) {
      animate(dashOffset, 0, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    } else {
      animate(dashOffset, 1, { duration: 0.25, ease: 'easeIn' });
    }
  }, [visible, dashOffset]);

  const strokeDashoffset = useTransform(
    [dashOffset, pathLength],
    ([offset, length]: number[]) => offset * length
  );

  if (!visible) return null;

  return (
    <g style={{ pointerEvents: 'none' }}>
      {}
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.15}
        filter="url(#trace-glow)"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset,
        }}
      />

      {}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.7}
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset,
        }}
      />

      {}
      <motion.circle
        r={3.5}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.1, 0.85, 1],
        }}
      >
        <animateMotion
          dur="1.8s"
          repeatCount="indefinite"
          path={d}
        />
      </motion.circle>
    </g>
  );
}
