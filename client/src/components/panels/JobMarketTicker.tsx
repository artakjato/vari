import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { Loader2, MapPin, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchJobCount } from '../../lib/api';

interface JobMarketTickerProps {
	roleSlug: string;
	roleName: string;
}

interface JobData {
	count: number;
	regions: Record<string, number>;
}

function regionGradient(region: string, index: number) {
	const normalized = region.toLowerCase();
	if (normalized.includes('stockholm')) return 'from-[#4d8ff0] to-[#62b5ff]';
	if (normalized.includes('got') || normalized.includes('goth')) return 'from-[#36b67f] to-[#6ed6a5]';
	if (normalized.includes('malm')) return 'from-[#ff6da8] to-[#ffa6cb]';
	return index % 2 === 0 ? 'from-[#ffb15c] to-[#ff8d3a]' : 'from-[#cba27a] to-[#e2c4a5]';
}

export function JobMarketTicker({ roleSlug, roleName }: JobMarketTickerProps) {
	const [jobData, setJobData] = useState<JobData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const displayCount = useTransform(rounded, (value) => value.toLocaleString('sv-SE'));
	const counterRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		let isMounted = true;
		setIsLoading(true);
		setJobData(null);
		count.set(0);

		fetchJobCount(roleSlug)
			.then((response) => {
				if (!isMounted) return;
				setJobData(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Job count fetch failed:', error);
				if (!isMounted) return;
				setJobData({ count: 0, regions: {} });
				setIsLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, [roleSlug, count]);

	useEffect(() => {
		if (jobData === null) return;
		const controls = animate(count, jobData.count, {
			type: 'spring',
			stiffness: 50,
			damping: 20,
			mass: 1,
		});
		return controls.stop;
	}, [jobData, count]);

	useEffect(() => {
		const unsubscribe = displayCount.on('change', (value) => {
			if (!counterRef.current) return;
			counterRef.current.textContent = value;
		});
		return unsubscribe;
	}, [displayCount]);

	const regions = useMemo(() => {
		if (jobData === null) return [];
		return Object.entries(jobData.regions).sort((a, b) => b[1] - a[1]);
	}, [jobData]);

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-3">
				<div className="relative">
					<motion.div
						className={`absolute -left-0.5 -top-0.5 h-3 w-3 rounded-full ${isLoading ? 'bg-amber-400' : 'bg-emerald-400'}`}
						animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0.2, 0.7] }}
						transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
					/>
					<div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-amber-500' : 'bg-emerald-500'}`} />
				</div>
				<div>
					<p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#a17f62] sm:tracking-[0.15em]">Open roles in Sweden</p>
					<p className="mt-0.5 text-[10px] text-[#836d59] sm:text-[11px]">{roleName}</p>
					<div className="flex items-baseline gap-2">
						{isLoading ? (
							<div className="flex h-9 items-center gap-2 text-[#8f7258]">
								<Loader2 size={16} className="animate-spin" />
								<span className="text-sm">Fetching data...</span>
							</div>
						) : (
							<>
								<motion.span
									ref={counterRef}
									className="text-2xl font-semibold tabular-nums tracking-tight text-[#1a2740] sm:text-3xl"
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1, duration: 0.3 }}
								>
									0
								</motion.span>
								<motion.span
									className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
								>
									<TrendingUp size={10} />
									Live
								</motion.span>
							</>
						)}
					</div>
				</div>
			</div>

			{jobData !== null && !isLoading && jobData.count > 0 && regions.length > 0 && (
				<div className="space-y-1.5 pt-2">
					<p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#a17f62] sm:tracking-[0.15em]">Regional demand</p>
					<div className="space-y-1">
						{regions.map(([region, regionCount], i) => {
							const share = jobData.count > 0 ? regionCount / jobData.count : 0;
							return (
								<motion.div
									key={region}
									className="group flex items-center gap-2"
									initial={{ opacity: 0, x: -8 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 + i * 0.08, duration: 0.25 }}
								>
									<MapPin size={10} className="flex-shrink-0 text-[#9d7d60]" />
									<span className="w-16 text-[11px] text-[#635748] sm:w-20 sm:text-xs">{region}</span>
									<div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#f2ddc7]">
										<motion.div
											className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${regionGradient(region, i)}`}
											initial={{ width: 0 }}
											animate={{ width: `${share * 100}%` }}
											transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
										/>
									</div>
									<span className="min-w-8 text-right text-[11px] tabular-nums text-[#7f6853]">{regionCount}</span>
								</motion.div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
