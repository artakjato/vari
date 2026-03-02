import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useMapStore } from '../../stores/mapStore';

function toLabel(value: string) {
	return value
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

export function Breadcrumbs() {
	const { breadcrumbs, resetMap, focusIndustry, industries, viewport } = useMapStore();

	const resolveCrumbLabel = (crumb: string) => {
		if (crumb.toLowerCase() === 'all industries') return 'All industries';

		const industry = industries.find((item) => item.slug === crumb);
		if (industry) return industry.name;

		return toLabel(crumb);
	};

	const visibleCrumbs = viewport === 'mobile' ? breadcrumbs.filter((crumb) => crumb.toLowerCase() !== 'all industries') : breadcrumbs;

	if (visibleCrumbs.length === 0) {
		return null;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, ease: 'easeOut' }}
			className="absolute left-3 right-3 top-3 flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 overflow-x-auto rounded-full border border-border/85 bg-white/92 px-3 py-1.5 shadow-[0_8px_20px_rgba(56,34,14,0.12)] backdrop-blur sm:left-4 sm:right-auto sm:top-4 sm:max-w-[calc(100%-2rem)] sm:gap-2 sm:px-4 sm:py-2"
		>
			{visibleCrumbs.map((crumb, index) => {
				const isCurrent = index === visibleCrumbs.length - 1;

				return (
					<span key={`${crumb}-${index}`} className="flex shrink-0 items-center gap-1.5">
						{index > 0 && <ChevronRight size={14} className="text-muted-foreground" />}
						<button
							onClick={() => {
								if (index === 0) {
									resetMap();
									return;
								}

								if (index === 1) {
									focusIndustry(crumb);
								}
							}}
							className={`text-[11px] font-semibold transition-colors duration-200 ease-out sm:text-xs ${
								isCurrent ? 'text-[#2f3b52]' : 'text-[#8d7258] hover:text-[#2f3b52]'
							}`}
						>
							{resolveCrumbLabel(crumb)}
						</button>
					</span>
				);
			})}
		</motion.div>
	);
}
