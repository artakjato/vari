import { AnimatePresence, motion } from 'framer-motion';
import type { TechStack } from '../../lib/types';

export function seededRandom(seed: string): number {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = (Math.imul(37, hash) + seed.charCodeAt(i)) | 0;
	}
	const x = Math.cos(hash) * 20000;
	return Math.abs(x - Math.floor(x));
}

export const ORBIT_BANDS = [160, 240, 320, 400, 480, 560];
export const BUBBLE_SIZE_BOOST = 5;
export const PLANET_SIZES = [42, 34, 28, 22].map((size) => size + BUBBLE_SIZE_BOOST);

export const ROLE_COLORS: Record<string, { from: string; to: string }> = {
	frontend: { from: '#ffa95b', to: '#ff7938' },
	backend: { from: '#ff76a8', to: '#d83b86' },
	'machine-learning': { from: '#8b8dff', to: '#6253e0' },
	devops: { from: '#7ccf9f', to: '#30a365' },
	mobile: { from: '#ffd06a', to: '#ff9e25' },
	'data-ai': { from: '#67b9ff', to: '#3876db' },
};

const DEFAULT_PLANET_COLOR = { from: '#c8b094', to: '#9f835f' };
const MOON_GRADIENT_ID_PREFIX = 'moon-grad';

export function CelestialSun({ label, size = 100 }: { label: string; size?: number }) {
	const words = label.split(' ');
	let line1 = label;
	let line2 = '';

	if (words.length >= 2 && label.length > 10) {
		const mid = Math.ceil(words.length / 2);
		line1 = words.slice(0, mid).join(' ');
		line2 = words.slice(mid).join(' ');
	}

	const hasTwoLines = line2.length > 0;
	const fontSize = size > 80 ? 22 : 16;

	return (
		<motion.g initial={{ scale: 0.95 }} animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={{ cursor: 'pointer' }}>
			<circle cx={0} cy={0} r={size + 18} fill="none" style={{ filter: 'drop-shadow(0 0 35px rgba(255,146,28,0.5)) drop-shadow(0 0 80px rgba(255,88,70,0.2))' }} />

			<defs>
				<radialGradient id="sun-grad" cx="50%" cy="50%" r="52%">
					<stop offset="0%" stopColor="#ffe48a" />
					<stop offset="62%" stopColor="#ff9c3f" />
					<stop offset="100%" stopColor="#ff6f56" />
				</radialGradient>
			</defs>

			<circle cx={0} cy={0} r={size} fill="url(#sun-grad)" />

			<text
				x={0}
				y={hasTwoLines ? -6 : 6}
				textAnchor="middle"
				fill="#1a2740"
				fontSize={fontSize}
				fontWeight="800"
				fontFamily="Sora, Plus Jakarta Sans, sans-serif"
				style={{ pointerEvents: 'none' }}
			>
				{hasTwoLines ? (
					<>
						<tspan x="0" dy="0">
							{line1}
						</tspan>
						<tspan x="0" dy={`${fontSize + 6}px`}>
							{line2}
						</tspan>
					</>
				) : (
					label
				)}
			</text>
		</motion.g>
	);
}

interface CelestialPlanetProps {
	label: string;
	slug: string;
	isIndustry: boolean;
	orbitIndex: number;
	angle?: number;
	position?: { x: number; y: number };
	sizeIndex: number;
	sizeOverride?: number;
	colorSlug?: string;
	isSelected?: boolean;
	isDimmed?: boolean;
	onClick: () => void;
	moons?: { name: string; slug: string; stacks: TechStack[] }[];
	selectedMoonSlug?: string | null;
	onMoonClick?: (slug: string) => void;
}

export function CelestialPlanet({
	label,
	slug,
	orbitIndex,
	angle: angleOverride,
	position,
	sizeIndex,
	sizeOverride,
	colorSlug,
	isSelected,
	isDimmed,
	onClick,
	moons = [],
	selectedMoonSlug,
	onMoonClick,
}: CelestialPlanetProps) {
	const orbitRadius = ORBIT_BANDS[orbitIndex % ORBIT_BANDS.length];
	const radius = sizeOverride ?? PLANET_SIZES[sizeIndex % PLANET_SIZES.length];

	let angle = angleOverride ?? (seededRandom(slug) * 1.5 + orbitIndex * 0.4) * Math.PI * 2;

	if (angleOverride === undefined && slug === 'web-development') {
		angle = Math.PI * 0.15;
	}

	const degrees = (angle * 180) / Math.PI;

	const getColorForSlug = (value: string) => {
		const lower = value.toLowerCase();
		if (lower.includes('front') || lower.includes('web')) return ROLE_COLORS.frontend;
		if (lower.includes('back')) return ROLE_COLORS.backend;
		if (lower.includes('machine') || lower.includes('ml') || lower.includes('ai')) return ROLE_COLORS['machine-learning'];
		if (lower.includes('devops') || lower.includes('cloud') || lower.includes('infra')) return ROLE_COLORS.devops;
		if (lower.includes('mobile') || lower.includes('ios') || lower.includes('android')) return ROLE_COLORS.mobile;
		if (lower.includes('data')) return ROLE_COLORS['data-ai'];
		if (lower.includes('cyber') || lower.includes('sec')) return { from: '#ff6a63', to: '#d9443f' };
		if (lower.includes('game') || lower.includes('embed')) return { from: '#ffb648', to: '#f18719' };
		return DEFAULT_PLANET_COLOR;
	};

	const color = colorSlug ? getColorForSlug(colorSlug) : getColorForSlug(slug);
	const renderMoons = isSelected && moons.length > 0;
	const moonGradientId = `${MOON_GRADIENT_ID_PREFIX}-${slug}`;
	const usesFixedPosition = position !== undefined;
	const moonOrbitRadius = usesFixedPosition ? radius + 30 : radius + 45;

	return (
		<g transform={usesFixedPosition ? `translate(${position.x}, ${position.y})` : `rotate(${degrees})`}>
			<AnimatePresence>
				{isSelected && !usesFixedPosition && (
					<motion.line
						x1={0}
						y1={0}
						x2={orbitRadius}
						y2={0}
						stroke="rgba(131, 91, 50, 0.35)"
						strokeWidth="2"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						exit={{ pathLength: 0, opacity: 0 }}
						transition={{ duration: 0.4 }}
						style={{ pointerEvents: 'none' }}
					/>
				)}
			</AnimatePresence>

			<g transform={usesFixedPosition ? undefined : `translate(${orbitRadius}, 0)`}>
				<g transform={usesFixedPosition ? undefined : `rotate(${-degrees})`}>
					<motion.g
						whileHover={{ scale: 1.08 }}
						whileTap={{ scale: 0.95 }}
						onClick={(event) => {
							event.stopPropagation();
							onClick();
						}}
						style={{ cursor: 'pointer', opacity: isDimmed ? 0.32 : 1 }}
						animate={isSelected ? { scale: [1, 1.05, 1] } : {}}
						transition={isSelected ? { repeat: Infinity, duration: 4 } : {}}
					>
						<defs>
							<radialGradient id={`grad-${slug}`} cx="30%" cy="30%" r="70%">
								<stop offset="0%" stopColor={color.from} />
								<stop offset="100%" stopColor={color.to} />
							</radialGradient>
							<radialGradient id={moonGradientId} cx="32%" cy="30%" r="70%">
								<stop offset="0%" stopColor="#fff4d9" />
								<stop offset="100%" stopColor="#c8a87c" />
							</radialGradient>
						</defs>

						<circle cx={0} cy={0} r={radius} fill="none" stroke={color.from} strokeWidth="4" opacity="0.34" filter="blur(8px)" />
						<circle cx={0} cy={0} r={radius} fill={`url(#grad-${slug})`} />
						<circle cx={-radius * 0.24} cy={-radius * 0.24} r={radius * 0.58} fill="#fff8ef" opacity="0.28" filter="blur(1.5px)" />

						<text
							x={0}
							y={radius + 28}
							textAnchor="middle"
							fill="#293753"
							fontSize="11"
							fontWeight="700"
							fontFamily="Plus Jakarta Sans, sans-serif"
							style={{ pointerEvents: 'none' }}
						>
							{label}
						</text>
					</motion.g>

					<AnimatePresence>
						{renderMoons && (
							<motion.g
								initial={{ opacity: 0, scale: 0.84 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.84 }}
								transition={{ duration: 0.25, staggerChildren: 0.08 }}
							>
								<circle cx={0} cy={0} r={moonOrbitRadius} fill="none" stroke="rgba(157, 111, 66, 0.22)" strokeWidth="1.1" strokeDasharray="4 6" />

								{moons.map((moon, moonIndex) => {
									const moonAngleOffset = moons.length > 1 ? Math.PI / (moons.length - 1) : Math.PI / 2;
									const moonAngle = Math.PI + moonIndex * moonAngleOffset;
									const moonX = Math.cos(moonAngle) * moonOrbitRadius;
									const moonY = Math.sin(moonAngle) * moonOrbitRadius;

									const isMoonSelected = selectedMoonSlug === moon.slug;
									const asteroids = moon.stacks || [];
									const asteroidOrbitRadius = 35;

									return (
										<g key={moon.slug}>
											{isMoonSelected && (
												<motion.line
													x1={0}
													y1={0}
													x2={moonX}
													y2={moonY}
													stroke="rgba(137, 92, 49, 0.35)"
													strokeWidth="1.5"
													initial={{ pathLength: 0 }}
													animate={{ pathLength: 1 }}
													transition={{ duration: 0.3 }}
												/>
											)}

											<motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transform={`translate(${moonX}, ${moonY})`}>
												<text
													x={0}
													y={-18}
													textAnchor="middle"
													fill="#51617a"
													fontSize="11"
													fontWeight="600"
													fontFamily="Plus Jakarta Sans, sans-serif"
													style={{ pointerEvents: 'none' }}
												>
													{moon.name}
												</text>

												<motion.circle
													cx={0}
													cy={0}
													r={10 + BUBBLE_SIZE_BOOST}
													fill={`url(#${moonGradientId})`}
													whileHover={{ scale: 1.18 }}
													onClick={(event) => {
														event.stopPropagation();
														onMoonClick?.(moon.slug);
													}}
													style={{ cursor: 'pointer' }}
													animate={isMoonSelected ? { stroke: '#ed7a1d', strokeWidth: 2 } : {}}
												/>

												<AnimatePresence>
													{isMoonSelected && asteroids.length > 0 && (
														<motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
															<circle cx={0} cy={0} r={asteroidOrbitRadius} fill="none" stroke="rgba(168, 122, 80, 0.2)" strokeWidth="1" />
															{asteroids.map((stack, asteroidIndex) => {
																const asteroidAngle = (asteroidIndex / asteroids.length) * Math.PI * 2;
																const asteroidX = Math.cos(asteroidAngle) * asteroidOrbitRadius;
																const asteroidY = Math.sin(asteroidAngle) * asteroidOrbitRadius;

																return (
																	<motion.g
																		key={`${stack.name}-${asteroidIndex}`}
																		initial={{ scale: 0 }}
																		animate={{ scale: 1 }}
																		transition={{ delay: asteroidIndex * 0.04 }}
																	>
																		<line x1={0} y1={0} x2={asteroidX} y2={asteroidY} stroke="rgba(165, 118, 76, 0.22)" strokeWidth="1" />
																		<motion.g
																			transform={`translate(${asteroidX}, ${asteroidY})`}
																			animate={{ y: [-2, 2, -2] }}
																			transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: asteroidIndex * 0.2 }}
																		>
																			<circle cx={0} cy={0} r={5} fill="#b9874f" />
																			<text
																				x={0}
																				y={15}
																				textAnchor="middle"
																				fill="#7d664f"
																				fontSize="9"
																				fontFamily="Plus Jakarta Sans, sans-serif"
																				style={{ pointerEvents: 'none' }}
																			>
																				{stack.name}
																			</text>
																		</motion.g>
																	</motion.g>
																);
															})}
														</motion.g>
													)}
												</AnimatePresence>
											</motion.g>
										</g>
									);
								})}
							</motion.g>
						)}
					</AnimatePresence>
				</g>
			</g>
		</g>
	);
}
