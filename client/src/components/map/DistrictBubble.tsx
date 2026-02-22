import { motion } from 'framer-motion';
import type { District } from '../../lib/types';
import { useMapStore } from '../../stores/mapStore'; 

interface Props {
  district: District; 
  index: number;
  parentPosition: { x:number; y: number };
  color: string; 
} 

export function DistrictBubble({ district, index, parentPosition, color }: Props) {
  const focusDistrict = useMapStore((state) => state.focusDistrict)

//positioning each district in a circle around the parent
//angle = spread them evenly; sidtance = 150px from parent center
const angle = (index * (360 / 3)) * (Math.PI / 180); //adjust divisor to match district count
const offsetX = Math.cos(angle) * 150;
const offsetY = Math.sin(angle) * 150;
const x = parentPosition.x + offsetX;
const y = parentPosition.y + offsetY;

return (
  <motion.g
  transform={`translate(${x}, ${y})`}
      onClick={() => focusDistrict(district.slug)}
      style={{ cursor: 'pointer' }}
      initial={{ scale: 0, opacity: 0 }}     // starts invisible and tiny
      animate={{ scale: 1, opacity: 1 }}     // grows to full size
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.1,                  // each district appears 0.1s after the previous
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
  >
      <circle r={40} fill={color} opacity={0.8} />
      <text textAnchor="middle" dy={4} fill="white" fontSize={11} fontFamily="Outfit">
        {district.name}
      </text>
  </motion.g>
);
}   