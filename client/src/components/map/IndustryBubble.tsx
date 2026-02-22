//this component renders ONE bubble for ONE industry
//It takes the industry data as a prop and draws it in SVG
import { motion } from 'framer-motion';
import type { Industry } from '../../lib/types'; 
import { useMapStore } from '../../stores/mapStore'; 

interface Props {
  industry: Industry;
  onClick: () => void; 
}

export function IndustryBubble({ 
  industry, 
  onClick 
}: Props) { 
  const focusedSlug = useMapStore((state) => state.focusedIndustrySlug); 

  const isFocused = focusedSlug ===industry.slug; // user clicked this bubble
  const isOtherFocused = focusedSlug !== null && !isFocused; //user clicked a different bubble 

  return(
    <motion.g
    transform={`translate(${industry.position.x}, ${industry.position.y})`} 
    onClick={onClick} 
    style={{ cursor: "pointer" }}
    animate={{ 
      scale: isFocused ? 2.5 : isOtherFocused ? 0.6 : 1, 
      opacity: isOtherFocused ? 0.15 : 1,
      filter: isOtherFocused ? 'blur(2px)' : 'none', 
    }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        whileHover={!focusedSlug ? { scale: 1.08 } : {}}
        whileTap={!focusedSlug ? { scale: 0.95 } : {}}
  >
        {/* The main circle */}
        <circle r={80} fill={industry.color} opacity={0.9} />
        {/* Industry name */}
        <text
          textAnchor="middle"
          dy={-10}
          fill="white"
          fontSize={14}
          fontFamily="Outfit"
        >
          {industry.name}
        </text>
        {/* Small icon image below name */}
        <image href={industry.icon} x={-12} y={8} width={24} height={24} />
      </motion.g>
  );
}