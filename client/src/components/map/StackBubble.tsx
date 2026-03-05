import { motion } from "framer-motion";
import type { TechStack } from "../../lib/types";

interface Props {
  stack: TechStack;
  index: number;
  position: { x: number; y: number };
}

export function StackBubble({ stack, index, position }: Props) {
  const { x, y } = position;

  const w = Math.max(100, stack.name.length * 7.5 + 40);
  const r = 16;
  const hw = w / 2 - r;

  return (
    <motion.g
      initial={{ x, y, scale: 0, opacity: 0 }}
      animate={{ x, y, scale: 1, opacity: 1 }}
      style={{ cursor: "pointer" }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        delay: 0.2 + index * 0.08,
      }}
      whileHover={{ scale: 1.1, filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.open(stack.url, "_blank")}
    >
      <path
        d={`M ${-hw},${-r} H ${hw} A ${r} ${r} 0 0 1 ${hw} ${r} H 15 L 5 ${r + 10} L -5 ${r} H ${-hw} A ${r} ${r} 0 0 1 ${-hw} ${-r} Z`}
        fill="#A37554"
      />
      <text
        textAnchor="middle"
        dy={4}
        fill="white"
        fontSize={11}
        fontFamily="Plus Jakarta Sans"
      >
        {stack.name}
      </text>
    </motion.g>
  );
}
