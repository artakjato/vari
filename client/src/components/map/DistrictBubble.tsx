import { motion } from "framer-motion";
import type { District } from "../../lib/types";
import { useMapStore } from "../../stores/mapStore";

interface Props {
  district: District;
  index: number;
  position: { x: number; y: number };
  color: string;
}

export function DistrictBubble({
  district,
  index,
  position,
  color,
}: Props) {
  const focusDistrict = useMapStore((state) => state.focusDistrict);

  const { x, y } = position;

  const w = Math.max(120, district.name.length * 7.5 + 40);
  const r = 20;
  const hw = w / 2 - r;

  return (
    <motion.g
      initial={{ x, y, scale: 0, opacity: 0 }}
      animate={{ x, y, scale: 1, opacity: 1 }}
      onClick={() => focusDistrict(district.slug)}
      style={{ cursor: "pointer" }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.05, filter: "drop-shadow(0px 8px 12px rgba(0,0,0,0.15))" }}
      whileTap={{ scale: 0.95 }}
    >
      <path
        d={`M ${-hw},${-r} H ${hw} A ${r} ${r} 0 0 1 ${hw} ${r} H 15 L 5 ${r + 10} L -5 ${r} H ${-hw} A ${r} ${r} 0 0 1 ${-hw} ${-r} Z`}
        fill="white"
        stroke={color}
        strokeWidth={1.5}
      />
      <text
        textAnchor="middle"
        dy={4}
        fill="white"
        fontSize={11}
        fontFamily="Outfit"
      >
        {district.name}
      </text>
    </motion.g>
  );
}
