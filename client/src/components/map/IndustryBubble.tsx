import { AnimatePresence, motion } from "framer-motion";
import type { Industry, Role } from "../../lib/types";
import { useMapStore } from "../../stores/mapStore";

export interface PlanetStyle {
  radius: number;
  fill: string;
  ring?: "saturn" | "uranus";
}

interface BubblePalette {
  fill: string;
  border: string;
  accent: string;
}

interface Props {
  industry: Industry;
  roles: Role[];
  index: number;
  palette: BubblePalette;
  orbitPosition?: { x: number; y: number };
  planetStyle?: PlanetStyle;
}

const spawnVariants = {
  hidden: { opacity: 0, scale: 0.6, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, scale: 0.85, filter: 'blur(3px)', transition: { duration: 0.15 } },
};

const springBounce = { type: 'spring' as const, stiffness: 400, damping: 12, mass: 0.8 };

export function IndustryBubble({ industry, roles, index, palette, orbitPosition, planetStyle }: Props) {
  const focusedIndustrySlug = useMapStore((state) => state.focusedIndustrySlug);
  const focusIndustry = useMapStore((state) => state.focusIndustry);
  const selectRole = useMapStore((state) => state.selectRole);
  const expandDistrict = useMapStore((state) => state.expandDistrict);
  const expandedDistrictSlug = useMapStore((state) => state.expandedDistrictSlug);
  const searchQuery = useMapStore((state) => state.searchQuery);
  const searchMatchedIndustrySlugs = useMapStore((state) => state.searchMatchedIndustrySlugs);

  const isFocused = focusedIndustrySlug === industry.slug;
  const isOtherFocused = focusedIndustrySlug !== null && !isFocused;

  const isSearchActive = searchQuery.trim().length > 0;
  const isSearchMatch = !isSearchActive || searchMatchedIndustrySlugs.includes(industry.slug);
  const isSearchDimmed = isSearchActive && !isSearchMatch;

  const isDimmed = isOtherFocused || isSearchDimmed;
  const shouldPulse = isSearchActive && isSearchMatch && !isDimmed;

  const radius = planetStyle?.radius ?? 40;
  const cx = orbitPosition ? orbitPosition.x : industry.position.x;
  const cy = orbitPosition ? orbitPosition.y : industry.position.y;

  const districts = industry.children || [];
  const pillWidths = districts.map((district) => Math.max(82, district.name.length * 6.4 + 26));
  const pillGap = 10;
  const totalPillsWidth =
    pillWidths.reduce((total, width) => total + width, 0) + (districts.length - 1) * pillGap;
  const pillY = cy + radius + 40;

  let xCursor = cx - totalPillsWidth / 2;
  const districtPositions = districts.map((_, idx) => {
    const x = xCursor + pillWidths[idx] / 2;
    xCursor += pillWidths[idx] + pillGap;
    return { x, y: pillY };
  });

  const borderColor = isFocused ? "#6C778A" : palette.border;
  const shadowOpacity = isFocused ? 0.2 : 0.1;
  const fillOpacity = isFocused ? 0.75 : 0.68;

  const breathDuration = 7 + index * 1.1;
  const breathDelay = index * 0.3;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isDimmed ? 0.4 : 1,
        scale: shouldPulse ? [1, 1.02, 1] : 1,
        y: [0, -3.5, 0],
        rotate: [0, 0.4, 0, -0.4, 0],
        filter: "saturate(1)",
      }}
      transition={{
        opacity: { duration: 0.2, ease: "easeOut" },
        scale: {
          duration: shouldPulse ? 2.2 : 0.2,
          repeat: shouldPulse ? Infinity : 0,
          ease: "easeInOut",
        },
        y: {
          duration: breathDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: breathDelay,
        },
        rotate: {
          duration: breathDuration * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: breathDelay + 0.5,
        },
        filter: { duration: 0.18, ease: "easeOut" },
      }}
      whileHover={!isDimmed ? { scale: 1.04, y: -7, transition: springBounce } : undefined}
      whileTap={!isDimmed ? { scale: 0.96, transition: { type: 'spring', stiffness: 500, damping: 15 } } : undefined}
      style={{ pointerEvents: isDimmed ? "none" : "auto", transformOrigin: `${cx}px ${cy}px` }}
    >
      {}
      <motion.circle
        cx={cx}
        cy={cy + 7}
        r={radius * 0.9}
        fill="rgba(0, 0, 0, 0.4)"
        filter="url(#soft-shadow)"
        animate={{ opacity: shadowOpacity }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ pointerEvents: "none" }}
      />

      {}
      {planetStyle?.ring === "saturn" && (
        <path
          d={`M ${cx - radius * 2.2} ${cy} A ${radius * 2.2} ${radius * 0.6} 0 0 1 ${cx + radius * 2.2} ${cy}`}
          fill="none" stroke="#EED0A1" strokeWidth={radius * 0.3} opacity="0.6"
          transform={`rotate(-20 ${cx} ${cy})`}
          style={{ pointerEvents: "none" }}
        />
      )}
      {planetStyle?.ring === "uranus" && (
        <path
          d={`M ${cx - radius * 1.8} ${cy} A ${radius * 1.8} ${radius * 0.3} 0 0 1 ${cx + radius * 1.8} ${cy}`}
          fill="none" stroke="#A2E4F0" strokeWidth={radius * 0.15} opacity="0.5"
          transform={`rotate(70 ${cx} ${cy})`}
          style={{ pointerEvents: "none" }}
        />
      )}

      {}
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={planetStyle?.fill || palette.fill}
        animate={{ fillOpacity }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(event) => {
          event.stopPropagation();
          focusIndustry(industry.slug);
        }}
        style={{ cursor: "pointer" }}
      />

      {}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={planetStyle?.fill || palette.fill}
        strokeWidth={3}
        opacity={0.3}
        filter="url(#soft-shadow)"
        style={{ pointerEvents: "none" }}
      />

      {}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={borderColor}
        strokeWidth={isFocused ? 2.1 : 1.15}
        opacity={isFocused ? 1 : 0.4}
        style={{ pointerEvents: "none" }}
      />

      {}
      {planetStyle?.ring === "saturn" && (
        <path
          d={`M ${cx - radius * 2.2} ${cy} A ${radius * 2.2} ${radius * 0.6} 0 0 0 ${cx + radius * 2.2} ${cy}`}
          fill="none" stroke="#EED0A1" strokeWidth={radius * 0.3} opacity="0.9"
          transform={`rotate(-20 ${cx} ${cy})`}
          style={{ pointerEvents: "none" }}
        />
      )}
      {planetStyle?.ring === "uranus" && (
        <path
          d={`M ${cx - radius * 1.8} ${cy} A ${radius * 1.8} ${radius * 0.3} 0 0 0 ${cx + radius * 1.8} ${cy}`}
          fill="none" stroke="#A2E4F0" strokeWidth={radius * 0.15} opacity="0.8"
          transform={`rotate(70 ${cx} ${cy})`}
          style={{ pointerEvents: "none" }}
        />
      )}

      {}
      {isFocused && (
        <circle
          cx={cx}
          cy={cy}
          r={radius + 8}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={1.5}
          style={{ pointerEvents: "none" }}
        />
      )}

      {}
      <g onClick={() => focusIndustry(industry.slug)} style={{ cursor: "pointer", userSelect: "none" }}>
        {}
        <rect
          x={cx - 70}
          y={cy + radius + 15 - 18}
          width={140}
          height={40}
          fill="rgba(0,0,0,0.5)"
          rx={6}
          style={{ pointerEvents: "none" }}
        />
        <text
          x={cx}
          y={cy + radius + 15}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize={isFocused ? 18 : 16}
          fontWeight="600"
          fontFamily="var(--font-sans)"
          letterSpacing="-0.015em"
          style={{ pointerEvents: "none", textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
        >
          {industry.name}
        </text>
        <text
          x={cx}
          y={cy + radius + 28}
          textAnchor="middle"
          fill="#E2E8F0"
          fontSize={11}
          fontWeight="500"
          fontFamily="var(--font-sans)"
          style={{ pointerEvents: "none" }}
        >
          {industry.subtitle}
        </text>
      </g>

      {}
      <AnimatePresence>
        {isFocused &&
          districts.map((district, districtIndex) => {
            const position = districtPositions[districtIndex];
            const width = pillWidths[districtIndex];
            const isExpanded = expandedDistrictSlug === district.slug;
            const roleForDistrict = roles.find((role) => role.districtSlug === district.slug);

            return (
              <motion.g
                key={district.slug}
                custom={districtIndex}
                variants={spawnVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -3, scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.92, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                onClick={(event) => {
                  event.stopPropagation();
                  expandDistrict(isExpanded ? null : district.slug);
                  if (roleForDistrict) selectRole(roleForDistrict.slug);
                }}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={position.x - width / 2}
                  y={position.y - 15}
                  width={width}
                  height={30}
                  rx={15}
                  fill={isExpanded ? "#334155" : "#FFFFFF"}
                  stroke={isExpanded ? "none" : "#D7DEE8"}
                  strokeWidth={1}
                  style={{ filter: "drop-shadow(0 5px 10px rgba(100,116,139,0.16))" }}
                />
                <text
                  x={position.x}
                  y={position.y + 4}
                  textAnchor="middle"
                  fill={isExpanded ? "#FFFFFF" : "#1A1A1A"}
                  fontSize={11}
                  fontWeight="600"
                  fontFamily="var(--font-sans)"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {district.name}
                </text>

              </motion.g>
            );
          })}
      </AnimatePresence>
    </motion.g>
  );
}
