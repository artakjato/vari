import { motion } from 'framer-motion';

interface Props {
  from: { x: number; y: number };  // parent bubble center
  to: { x: number; y: number };    // child bubble center
  color: string;                    // industry color (use lighter opacity)
}

export function ConnectionLine({ from, to, color }: Props) {
  // Quadratic bezier: the control point is midway between the two with a slight upward offset
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2 - 30;
  const path = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;

  return (
    <motion.path
      d={path}
      stroke={color}
      strokeWidth={2}
      strokeOpacity={0.4}
      fill="none"
      initial={{ pathLength: 0 }}    // starts invisible
      animate={{ pathLength: 1 }}    // draws itself to full length
      transition={{ duration: 0.6, delay: 0.2 }}
    />
  );
}