import { motion } from 'framer-motion';
import { Clock, ExternalLink, Star, TrendingUp } from 'lucide-react';
import type { Course } from '../../lib/types';

interface CourseMatchmakerProps {
	courses: Course[];
	salaryMedian?: number;
}

function formatSEK(value: number): string {
	return new Intl.NumberFormat('sv-SE', {
		style: 'decimal',
		maximumFractionDigits: 0,
	}).format(value);
}

function StarRating({ rating }: { rating: number }) {
	const full = Math.floor(rating);
	const partial = rating - full;

	return (
		<div className="flex items-center gap-0.5">
			{Array.from({ length: 5 }).map((_, i) => {
				const fill = i < full ? 1 : i === full ? partial : 0;
				return (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 400, damping: 18 }}
					>
						<Star size={11} className={fill >= 0.5 ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-[#d1b395]'} />
					</motion.div>
				);
			})}
			<span className="ml-1 text-[10px] tabular-nums text-[#8a7159]">{rating.toFixed(1)}</span>
		</div>
	);
}

export function CourseMatchmaker({ courses, salaryMedian }: CourseMatchmakerProps) {
	return (
		<div className="space-y-3">
			{salaryMedian && (
				<motion.div className="flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
					<span className="inline-flex items-center gap-1 text-[10px] text-[#8a7159]">
						<TrendingUp size={10} className="text-emerald-600" />
						~{formatSEK(salaryMedian)} SEK/mo after completion
					</span>
				</motion.div>
			)}

			<div className="space-y-2">
				{courses.map((course, i) => (
					<motion.a
						key={`${course.provider}-${course.name}`}
						href={course.url}
						target="_blank"
						rel="noreferrer"
						className="group block rounded-2xl border border-[#ecd3b7] bg-white/88 p-3.5 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 + i * 0.08, duration: 0.25 }}
						whileHover={{
							y: -3,
							scale: 1.01,
							borderColor: 'rgba(255, 123, 0, 0.35)',
							transition: { type: 'spring', stiffness: 300, damping: 20 },
						}}
					>
						<div className="flex items-start justify-between gap-3">
							<div className="min-w-0 flex-1 space-y-1.5">
								<div>
									<p className="truncate text-xs font-semibold text-[#1a2740] transition-colors duration-200 group-hover:text-[#e66800] sm:text-sm">{course.name}</p>
									<p className="text-[11px] text-[#7e6a57]">{course.provider}</p>
								</div>

								<StarRating rating={course.rating} />

								<div className="flex flex-wrap items-center gap-2">
									{course.timeToMarket && (
										<span className="inline-flex items-center gap-1 rounded-full bg-[#fff3e3] px-2 py-0.5 text-[10px] text-[#866b53]">
											<Clock size={9} />
											{course.timeToMarket}
										</span>
									)}

									<span
										className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] ${
											course.type === 'free' ? 'border-emerald-200/70 bg-emerald-50 text-emerald-700' : 'border-amber-200/70 bg-amber-50 text-amber-700'
										}`}
									>
										{course.type === 'free' ? 'Free' : 'Paid'}
									</span>

									{course.postGradSalary && (
										<span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] text-blue-700">
											<TrendingUp size={9} />
											~{formatSEK(course.postGradSalary)} SEK/mo
										</span>
									)}
								</div>
							</div>

							<motion.div className="mt-1 flex-shrink-0 rounded-full bg-[#fff3e3] p-1.5 text-[#b58550] transition-colors duration-200 group-hover:bg-[#ffe1bf] group-hover:text-[#d87313]" whileHover={{ scale: 1.1 }}>
								<ExternalLink size={12} />
							</motion.div>
						</div>
					</motion.a>
				))}
			</div>
		</div>
	);
}
