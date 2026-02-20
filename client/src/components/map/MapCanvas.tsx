//This is the full-screen SVG stage that contains all bubbles
import { IndustryBubble } from './IndustryBubble';
import { useMapStore } from '../../stores/mapStore';
import { seedData } from '../../data/seedData'; 

export function MapCanvas() {
  const { focusIndustry } = useMapStore();

  return(
    <svg width="100vw" height="100vh" style={{ background: 'var(--bg-primary)' }}>
      {/* Background pattern (optional: subtle dot grid) */}
      <defs>
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--border-subtle)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />

      {/* Render one IndustryBubble for each industry in seed data */}
      {seedData.industries.map((industry) => (
        <IndustryBubble
          key={industry.slug}
          industry={industry}
          onClick={() => focusIndustry(industry.slug)}
        />
      ))}
    </svg>
  ); 
}