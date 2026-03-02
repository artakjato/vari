import { useMemo } from 'react';
import { useMapStore } from '../../stores/mapStore';
import { CelestialPlanet, CelestialSun, ORBIT_BANDS } from './CelestialEntities';

const INDUSTRY_LAYOUT_OVERRIDES: Record<string, { orbitIndex?: number; angle?: number }> = {
	'cloud-infrastructure': {

		orbitIndex: 3,
		angle: -Math.PI / 4,
	},
};

const AMBIENT_BLOBS = Array.from({ length: 14 }).map((_, i) => ({
	id: `blob-${i}`,
	top: `${8 + Math.random() * 82}%`,
	left: `${2 + Math.random() * 96}%`,
	size: 14 + Math.random() * 28,
	opacity: 0.08 + Math.random() * 0.12,
	delay: `${Math.random() * 4}s`,
}));

export function MapCanvas() {
	const focusedIndustrySlug = useMapStore((state) => state.focusedIndustrySlug);
	const selectedRoleSlug = useMapStore((state) => state.selectedRoleSlug);
	const expandedDistrictSlug = useMapStore((state) => state.expandedDistrictSlug);
	const viewport = useMapStore((state) => state.viewport);

	const industries = useMapStore((state) => state.industries);
	const roles = useMapStore((state) => state.roles);

	const handleBackgroundClick = () => {
		useMapStore.setState({
			focusedIndustrySlug: null,
			inspectorOpen: false,
			selectedRoleSlug: null,
			expandedDistrictSlug: null,
		});
	};

	const isIndustryFocused = focusedIndustrySlug !== null;
	const isMobile = viewport === 'mobile';

	const planetsData = useMemo(() => {
		if (!isIndustryFocused) {
			return industries.map((industry, i) => ({
				id: industry.slug,
				slug: industry.slug,
				label: industry.name,
				isIndustry: true,
				orbitIndex: INDUSTRY_LAYOUT_OVERRIDES[industry.slug]?.orbitIndex ?? i % ORBIT_BANDS.length,
				sizeIndex: i % 4,
				colorSlug: industry.slug,
				angle: INDUSTRY_LAYOUT_OVERRIDES[industry.slug]?.angle,
				onClick: () => useMapStore.getState().focusIndustry(industry.slug),
				isSelected: false,
				moons: [],
			}));
		}

		const industryRoles = roles.filter((role) => role.industrySlug === focusedIndustrySlug);
		const sortedRoles = [...industryRoles].sort((a, b) => a.name.localeCompare(b.name));

		return sortedRoles.map((role, i) => {
			const targetIndustry = industries.find((industry) => industry.slug === focusedIndustrySlug);
			const roleMoons = targetIndustry?.children?.filter((district) => role.districtSlug === district.slug) || [];

			return {
				id: role.slug,
				slug: role.slug,
				label: role.name,
				isIndustry: false,
				orbitIndex: i % ORBIT_BANDS.length,
				sizeIndex: i % 4,
				colorSlug: role.slug,
				angle: undefined,
				onClick: () => useMapStore.getState().selectRole(role.slug),
				isSelected: selectedRoleSlug === role.slug,
				moons: roleMoons,
			};
		});
	}, [isIndustryFocused, industries, roles, focusedIndustrySlug, selectedRoleSlug]);

	const focusedIndustryName = industries.find((industry) => industry.slug === focusedIndustrySlug)?.name || 'Tech ecosystem';
	const activeSunLabel = isIndustryFocused ? focusedIndustryName : 'Tech ecosystem';
	const mobileSunY = -200;
	const mobilePlanetRadius = 48;
	const mobileGridTop = 20;
	const mobileColSpacing = 155;
	const mobileRowSpacing = 150;

	const getMobilePosition = (index: number) => {
		const col = index % 2;
		const row = Math.floor(index / 2);
		return {
			x: col === 0 ? -mobileColSpacing / 2 : mobileColSpacing / 2,
			y: mobileGridTop + row * mobileRowSpacing,
		};
	};

	const lastRow = planetsData.length > 0 ? Math.floor((planetsData.length - 1) / 2) : 0;
	const mobileContentBottom = mobileGridTop + lastRow * mobileRowSpacing + mobilePlanetRadius + 50;
	const mobileVBTop = mobileSunY - 80;

	const mobileVBHeight = mobileContentBottom - mobileVBTop + 700;
	const mobileVBWidth = 370;

	return (

		<div
			onClick={isMobile ? handleBackgroundClick : undefined}
			onKeyDown={isMobile ? (e) => e.key === 'Escape' && handleBackgroundClick() : undefined}
			className={`relative w-full ${isMobile ? 'bg-[#fff4e8]' : 'h-full overflow-hidden bg-[radial-gradient(circle_at_18%_14%,#ffe7c7_0%,transparent_33%),radial-gradient(circle_at_86%_8%,#ffd4e5_0%,transparent_24%),linear-gradient(180deg,#fff8ee_0%,#fff1df_100%)]'}`}
			style={isMobile ? { touchAction: 'pan-y' } : undefined}
		>
			<div className="pointer-events-none absolute inset-0">
				{AMBIENT_BLOBS.map((blob) => (
					<div
						key={blob.id}
						className="absolute rounded-full bg-white"
						style={{
							top: blob.top,
							left: blob.left,
							width: blob.size,
							height: blob.size,
							opacity: blob.opacity,
							animation: `float-slow 7s ease-in-out ${blob.delay} infinite`,
						}}
					/>
				))}
			</div>

			<svg
				className={isMobile ? 'block w-full' : 'absolute left-0 top-0 h-full w-full'}
				viewBox={isMobile ? `${-mobileVBWidth / 2} ${mobileVBTop} ${mobileVBWidth} ${mobileVBHeight}` : '-1200 -800 2400 1600'}
				preserveAspectRatio={isMobile ? 'xMidYMin meet' : 'xMidYMid slice'}
			>
				<defs>
					<radialGradient id="bg-glow" cx="50%" cy="50%" r="65%">
						<stop offset="0%" stopColor="#fffef9" />
						<stop offset="55%" stopColor="#fff2e1" />
						<stop offset="100%" stopColor="#ffe7cb" />
					</radialGradient>
				</defs>

				<rect
					x={isMobile ? -mobileVBWidth / 2 : -1200}
					y={isMobile ? mobileVBTop : -800}
					width={isMobile ? mobileVBWidth : 2400}
					height={isMobile ? mobileVBHeight : 1600}
					fill="url(#bg-glow)"
					opacity={0.96}
					onClick={handleBackgroundClick}
				/>

				{isMobile ? (
					<g>
						{planetsData.map((planet, index) => {
							const pos = getMobilePosition(index);
							const dx = pos.x;
							const dy = pos.y - mobileSunY;
							const orbitR = Math.hypot(dx, dy);
							return (
								<circle
									key={`mobile-orbit-${planet.id}`}
									cx={0}
									cy={mobileSunY}
									r={orbitR}
									fill="none"
									stroke="rgba(166, 114, 63, 0.18)"
									strokeDasharray={index % 2 === 0 ? '5 7' : '4 6'}
									strokeWidth="1.15"
									style={{ pointerEvents: 'none' }}
								/>
							);
						})}
					</g>
				) : (
					<g>
						{ORBIT_BANDS.map((radius, idx) => (
							<circle
								key={`orbit-${radius}`}
								cx={0}
								cy={0}
								r={radius}
								fill="none"
								stroke="rgba(166, 114, 63, 0.24)"
								strokeDasharray={idx % 2 === 0 ? '5 7' : '4 6'}
								strokeWidth="1.15"
								style={{ pointerEvents: 'none' }}
							/>
						))}
					</g>
				)}

				<g>
					{planetsData.map((planet, index) => (
						<CelestialPlanet
							key={planet.id}
							label={planet.label}
							slug={planet.slug}
							isIndustry={planet.isIndustry}
							orbitIndex={isMobile ? 0 : planet.orbitIndex}
							sizeIndex={isMobile ? 0 : planet.sizeIndex}
							sizeOverride={isMobile ? mobilePlanetRadius : undefined}
							colorSlug={planet.colorSlug}
							angle={isMobile ? undefined : planet.angle}
							position={isMobile ? getMobilePosition(index) : undefined}
							isSelected={planet.isSelected}
							isDimmed={selectedRoleSlug !== null && !planet.isSelected && !planet.isIndustry}
							onClick={planet.onClick}
							moons={planet.moons}
							selectedMoonSlug={expandedDistrictSlug}
							onMoonClick={(moonSlug) => {
								useMapStore.getState().expandDistrict(moonSlug === expandedDistrictSlug ? null : moonSlug);
							}}
						/>
					))}

					<g transform={isMobile ? `translate(0, ${mobileSunY})` : undefined}>
						<CelestialSun label={activeSunLabel} size={100} />
					</g>
				</g>
			</svg>
		</div>
	);
}
