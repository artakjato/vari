import { motion } from 'framer-motion';
import type { Industry } from '../../lib/types';
import { useMapStore } from '../../stores/mapStore';

interface Props {
  industry: Industry;
  onClick: () => void;
}

export function IndustryBubble({ industry, onClick }: Props) {
  // Read the focused industry from the global store
  const focusedSlug = useMapStore((state) => state.focusedIndustrySlug);

  // Determine this bubble's visual state
  const isFocused = focusedSlug === industry.slug;      // user clicked THIS bubble
  const isOtherFocused = focusedSlug !== null && !isFocused; // user clicked a DIFFERENT bubble

  return (
    <motion.g
      initial={{ x: industry.position.x, y: industry.position.y }}
      animate={{
        x: industry.position.x,
        y: industry.position.y,
        // Focused bubble grows 2.5x; other bubbles shrink and fade out
        scale: isFocused ? 2.5 : isOtherFocused ? 0.6 : 1,
        opacity: isOtherFocused ? 0.15 : 1,
        filter: isOtherFocused ? 'blur(2px)' : 'none',
      }}
      onClick={onClick}
      style={{ cursor: "pointer"}}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      whileHover={!focusedSlug ? { scale: 1.08 } : {}}    // only hover effect at zoom level 1
      whileTap={!focusedSlug ? { scale: 0.95 } : {}}
    >
      <circle r={80} fill={industry.color} opacity={0.9} />
      <text textAnchor="middle" dy={-10} fill="white" fontSize={14} fontFamily="Outfit">
        {industry.name}
      </text>
      <image href={industry.icon} x={-12} y={8} width={24} height={24} />
    </motion.g>
  );
}