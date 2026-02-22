import { motion } from "framer-motion";
import type { TechStack } from "../../lib/types";

interface Props {
  stack: TechStack;
  index: number;
  parentPosition: { x: number; y: number }; //the parent district's center
}

export function StackBubble({ stack, index, parentPosition }: Props) {
  // Position stacks in a small circle around the district
  const angle = index * (360 / 4) * (Math.PI / 180);
  const x = parentPosition.x + Math.cos(angle) * 80;
  const y = parentPosition.y + Math.sin(angle) * 80;

  return (
    <motion.g
  
      initial={{ x, y, scale: 0, opacity: 0 }}
      animate={{ x, y, scale: 1, opacity: 1 }}
          style={{ cursor: "pointer" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2 + index * 0.08, // slight delay after districts appear
      }}
      whileHover={{ scale: 1.15 }}
      onClick={() => window.open(stack.url, "_blank")} // opens tech docs in new tab
    >
      <circle r={20} fill="white" stroke="#E8DDD0" strokeWidth={1} />
      <image href={stack.icon} x={-10} y={-10} width={20} height={20} />
      {/* Name label below the circle */}
      <text
        textAnchor="middle"
        y={32}
        fill="var(--text-secondary)"
        fontSize={9}
        fontFamily="Inter"
      >
        {stack.name}
      </text>
    </motion.g>
  );
}
