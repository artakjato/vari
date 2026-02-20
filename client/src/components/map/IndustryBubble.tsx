//this component renders ONE bubble for ONE industry
//It takes the industry data as a prop and draws it in SVG
import { motion } from 'framer-motion';
import type { Industry } from '../../lib/types'; 

export function IndustryBubble({ 
  industry, 
  onClick 
}: { 
  industry: Industry; 
  onClick: () => void 
}) {
  const { x, y } = industry.position; 

  return(
    <g transform={`translate(${x}, ${y})`} onClick={onClick} style={{ cursor: "pointer" }}>
      <motion.g
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
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
    </g>
  );
}