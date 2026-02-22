//This is the full-screen SVG stage that contains all bubbles
import { IndustryBubble } from './IndustryBubble';
import { DistrictBubble } from './DistrictBubble';
import { StackBubble } from './StackBubble'

import { useMapStore } from '../../stores/mapStore';
import { seedData } from '../../data/seedData'; 

export function MapCanvas() {
  const { focusIndustry, focusedIndustrySlug, focusedDistrictSlug, zoomLevel } = useMapStore();

  //find the full industry object for the focused industry
  const focusedIndustry = seedData.industries.find(i => i.slug === focusedIndustrySlug); 

  return(
    <svg width="100vw" height="100vh" style={{ background: 'var(--bg-primary)' }}>
      {/* Background dot grid pattern */}
      <defs>
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--border-subtle)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />

      {/* Level 1: All industry bubbles (always rendered) */}
      {seedData.industries.map((industry) => (
        <IndustryBubble
          key={industry.slug}
          industry={industry}
          onClick={() => focusIndustry(industry.slug)}
        />
      ))}

      {/* Level 2: District bubbles (only when an industry is focused) */}
      {zoomLevel >= 2 && focusedIndustry && (
        <>
       

          {/* Draw the district bubbles */}
          {focusedIndustry.children.map((district, i) => (
            <DistrictBubble
              key={district.slug}
              district={district}
              index={i}
              parentPosition={focusedIndustry.position}
              color={focusedIndustry.color}
            />
          ))}
        </>
      )}

      {/* Level 3: Stack bubbles (only when a district is focused) */}
      {zoomLevel >= 3 && focusedIndustry && focusedDistrictSlug && (() => {
        const district = focusedIndustry.children.find(d => d.slug === focusedDistrictSlug);
        if (!district) return null;

        // Calculate district's position (same math as DistrictBubble)
        const districtIndex = focusedIndustry.children.indexOf(district);
        const angle = (districtIndex * (360 / focusedIndustry.children.length)) * (Math.PI / 180);
        const districtPos = {
          x: focusedIndustry.position.x + Math.cos(angle) * 150,
          y: focusedIndustry.position.y + Math.sin(angle) * 150,
        };

        return district.stacks.map((stack, i) => (
          <StackBubble
            key={stack.name}
            stack={stack}
            index={i}
            parentPosition={districtPos}
          />
        ));
      })()}
    </svg>
  );
}