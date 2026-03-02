import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { TechStack } from '../../lib/types';

interface Props {
	districtName: string;
	stacks: TechStack[];
}

export function ToolsAccordion({ districtName, stacks }: Props) {
	const [selectedStackName, setSelectedStackName] = useState<string | null>(null);

	const stacksByCategory = stacks.reduce<Record<string, TechStack[]>>((acc, stack) => {
		const key = stack.category ?? 'Other';
		if (!acc[key]) acc[key] = [];
		acc[key].push(stack);
		return acc;
	}, {});

	const categories = Object.keys(stacksByCategory);
	const selectedStack = selectedStackName ? stacks.find((stack) => stack.name === selectedStackName) : null;
	const dependencies = selectedStack ? (selectedStack.dependencies ?? []).map((name) => stacks.find((stack) => stack.name === name)).filter(Boolean) : [];

	return (
		<section className="space-y-3 rounded-2xl border border-[#ecd3b7] bg-white/88 p-4 shadow-[0_6px_18px_rgba(61,34,10,0.08)]">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-semibold text-[#1a2740]">Tools and Technologies</h3>
				<span className="text-xs text-[#8b7258]">
					{districtName} · {stacks.length} tools
				</span>
			</div>

			<AnimatePresence mode="wait">
				{selectedStack ? (
					<motion.div
						key={`detail-${selectedStack.name}`}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.18, ease: 'easeOut' }}
						className="space-y-3"
					>
						<button
							onClick={() => setSelectedStackName(null)}
							className="flex items-center gap-2 text-xs font-semibold text-[#8d7258] transition-colors duration-150 hover:text-[#1a2740]"
						>
							<ChevronDown size={12} className="rotate-90" />
							Back to all tools
						</button>

						<div className="flex items-center gap-2">
							<img
								src={selectedStack.icon}
								alt={selectedStack.name}
								width={18}
								height={18}
								className="object-contain"
								onError={(event) => {
									(event.currentTarget as HTMLImageElement).style.display = 'none';
								}}
							/>
							<span className="text-sm font-semibold text-[#1a2740]">{selectedStack.name}</span>
						</div>

						{selectedStack.url && (
							<a
								href={selectedStack.url}
								target="_blank"
								rel="noreferrer"
								onClick={(event) => event.stopPropagation()}
								className="inline-flex items-center gap-1.5 rounded-lg bg-[#fff3e3] px-3 py-1.5 text-xs font-semibold text-[#c26412] transition-colors duration-150 hover:bg-[#ffe3c5]"
							>
								Official documentation
								<ExternalLink size={11} />
							</a>
						)}

						{dependencies.length > 0 && (
							<div className="space-y-2">
								<p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a28264]">Prerequisites and related</p>
								<div className="flex flex-wrap gap-1.5">
									{dependencies.map((dependency) => (
										<button
											key={dependency!.name}
											onClick={() => setSelectedStackName(dependency!.name)}
											className="inline-flex items-center gap-1.5 rounded-full border border-[#e6ccb0] bg-white px-2.5 py-1 text-[11px] text-[#745f4b] transition-colors duration-150 hover:bg-[#fff3e3] hover:text-[#1a2740]"
										>
											<img
												src={dependency!.icon}
												alt={dependency!.name}
												width={13}
												height={13}
												className="object-contain"
												onError={(event) => {
													(event.currentTarget as HTMLImageElement).style.display = 'none';
												}}
											/>
											{dependency!.name}
										</button>
									))}
								</div>
							</div>
						)}

						{dependencies.length === 0 && <p className="text-xs text-[#917763]">No specific prerequisites listed for this stack.</p>}
					</motion.div>
				) : (
					<motion.div
						key="category-list"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.15 }}
						className="space-y-3"
					>
						{categories.map((category) => (
							<div key={category} className="space-y-1.5">
								<p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a28264]">{category}</p>
								<div className="flex flex-wrap gap-1.5">
									{stacksByCategory[category].map((stack) => (
										<button
											key={stack.name}
											onClick={() => setSelectedStackName(stack.name)}
											className="inline-flex items-center gap-1.5 rounded-full border border-[#e6ccb0] bg-white px-2.5 py-1 text-[11px] text-[#745f4b] transition-colors duration-150 hover:bg-[#fff3e3] hover:text-[#1a2740]"
										>
											<img
												src={stack.icon}
												alt={stack.name}
												width={13}
												height={13}
												className="flex-shrink-0 object-contain"
												onError={(event) => {
													(event.currentTarget as HTMLImageElement).style.display = 'none';
												}}
											/>
											{stack.name}
										</button>
									))}
								</div>
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
