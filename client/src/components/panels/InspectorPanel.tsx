import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Clock3, MapPin, Rocket, ShieldCheck, Star, Wrench, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPin, fetchRoleSalary } from '../../lib/api';
import type { RoleSalaryResponse } from '../../lib/types';
import { useMapStore } from '../../stores/mapStore';
import { SalaryBar } from '../ui/SalaryBar';
import { CourseMatchmaker } from './CourseMatchmaker';
import { JobMarketTicker } from './JobMarketTicker';
import { NearThisPanel } from './NearThisPanel';
import { ToolsAccordion } from './ToolsAccordion';

const stepIcons = [BookOpen, Wrench, Rocket, ShieldCheck, Briefcase];
const stepIconBg = ['bg-[#ff7b00]', 'bg-[#ff4f91]', 'bg-[#f3a13c]', 'bg-[#37b57f]', 'bg-[#4d8ff0]'];

interface InspectorPanelProps {
	variant?: 'sidebar' | 'bottom-sheet' | 'fullscreen';
}

type InspectorTab = 'profile' | 'tools' | 'related' | 'jobs';

export function InspectorPanel({ variant = 'sidebar' }: InspectorPanelProps) {
	const { selectedRoleSlug, roles, industries, expandedDistrictSlug } = useMapStore();
	const [activeTab, setActiveTab] = useState<InspectorTab>('profile');
	const [lastResolvedRoleSlug, setLastResolvedRoleSlug] = useState<string | null>(null);
	const [liveSalary, setLiveSalary] = useState<RoleSalaryResponse | null>(null);
	const [salaryLoading, setSalaryLoading] = useState(false);
	const [pinnedStepIds, setPinnedStepIds] = useState<string[]>([]);

	const selectedRole = roles.find((item) => item.slug === selectedRoleSlug);
	const role =
		selectedRole ?? (lastResolvedRoleSlug ? roles.find((item) => item.slug === lastResolvedRoleSlug) ?? null : null);
	const industry = industries.find((item) => item.slug === role?.industrySlug);
	const expandedDistrict = expandedDistrictSlug && industry ? industry.children.find((district) => district.slug === expandedDistrictSlug) : null;
	const totalHours = role?.learningPath?.reduce((hours, step) => hours + step.estimatedHours, 0) ?? 0;
	const hasRelatedRoles = !!role && roles.some((item) => item.industrySlug === role.industrySlug && item.slug !== role.slug);
	const salaryAverage = liveSalary?.averageMonthly ?? null;
	const salaryMedian = liveSalary?.median ?? null;
	const salaryP25 = liveSalary?.p25 ?? null;
	const salaryP75 = liveSalary?.p75 ?? null;
	const salaryBadgeText = salaryLoading
		? 'Loading salary...'
		: salaryAverage !== null
			? `${new Intl.NumberFormat('sv-SE').format(Math.round(salaryAverage))} SEK/mo avg`
			: 'Salary unavailable';
	const tabs = useMemo<Array<{ key: InspectorTab; label: string }>>(() => {
		if (!role || !industry) return [];
		const items: Array<{ key: InspectorTab; label: string }> = [{ key: 'profile', label: 'Profile' }];
		if (expandedDistrict) items.push({ key: 'tools', label: 'Tools' });
		if (hasRelatedRoles) items.push({ key: 'related', label: 'Related' });
		items.push({ key: 'jobs', label: 'Jobs' });
		return items;
	}, [expandedDistrict, hasRelatedRoles, industry, role]);

	useEffect(() => {
		if (selectedRole?.slug) {
			setLastResolvedRoleSlug(selectedRole.slug);
		}
	}, [selectedRole?.slug]);

	useEffect(() => {
		if (!role?.slug) {
			setLiveSalary(null);
			setSalaryLoading(false);
			return;
		}

		let cancelled = false;
		setLiveSalary(null);
		setSalaryLoading(true);

		fetchRoleSalary(role.slug)
			.then((response) => {
				if (cancelled) return;
				setLiveSalary(response.data);
			})
			.catch(() => {
				if (cancelled) return;
				setLiveSalary(null);
			})
			.finally(() => {
				if (cancelled) return;
				setSalaryLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [role?.slug]);

	useEffect(() => {
		setActiveTab('profile');
	}, [role?.slug]);

	useEffect(() => {
		if (!tabs.length) return;
		if (!tabs.some((tab) => tab.key === activeTab)) {
			setActiveTab(tabs[0].key);
		}
	}, [activeTab, tabs]);

	const close = () => useMapStore.setState({ inspectorOpen: false });

	const handlePin = async () => {
		if (!role) return;
		await createPin({ targetType: 'role', targetId: role.slug });
	};

	const handlePinLearningStep = async (stepOrder: number) => {
		if (!role) return;
		const stepPinId = `${role.slug}::${stepOrder}`;
		if (pinnedStepIds.includes(stepPinId)) return;
		await createPin({ targetType: 'learning-step', targetId: stepPinId });
		setPinnedStepIds((current) => (current.includes(stepPinId) ? current : [...current, stepPinId]));
	};

	const wrapperClasses =
		variant === 'sidebar'
			? 'flex h-full w-[624px] max-w-[94vw] flex-shrink-0 flex-col border-l border-[#efcfb0] bg-[linear-gradient(180deg,#fffaf3_0%,#fff2e3_100%)] shadow-[-12px_0_32px_rgba(65,38,16,0.12)]'
			: variant === 'bottom-sheet'
				? 'fixed inset-x-0 bottom-0 z-40 flex h-[88dvh] flex-col rounded-t-3xl border-t border-[#efcfb0] bg-[linear-gradient(180deg,#fffaf3_0%,#fff2e3_100%)] shadow-[0_-10px_28px_rgba(65,38,16,0.14)]'
				: 'fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col rounded-t-2xl border-t border-[#efcfb0] bg-[linear-gradient(180deg,#fffaf3_0%,#fff2e3_100%)] shadow-[0_-10px_28px_rgba(65,38,16,0.12)]';

	return (
		<aside className={wrapperClasses}>
			<header className="flex items-center justify-between border-b border-[#ebd2b7] px-4 py-3.5 sm:px-5 sm:py-4">
				<span className="text-[13px] font-semibold text-[#2f3b52] sm:text-sm">Path Inspector</span>
				<button onClick={close} className="rounded-full p-1 text-[#8b7057] transition-colors hover:bg-[#fff2e1] hover:text-[#2f3b52]">
					<X size={18} />
				</button>
			</header>

			<ScrollArea className="min-h-0 flex-1">
				{!role || !industry ? (
					<div className="flex flex-col items-center gap-3 px-6 py-16 text-center sm:px-8 sm:py-20">
							<MapPin size={28} className="text-[#c9a47c]" />
							<p className="text-sm text-[#8d7258]">Select a role bubble to open learning path details, demand signals, and recommended courses.</p>
					</div>
				) : (
					<div className="space-y-4 px-4 py-4 sm:space-y-6 sm:px-5 sm:py-5">
							<div className="inline-flex flex-wrap rounded-full border border-[#e8ceb1] bg-white/80 p-1">
								{tabs.map((tab) => (
									<button
										key={tab.key}
										onClick={() => setActiveTab(tab.key)}
										className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 ${
											activeTab === tab.key ? 'bg-[#ffe6cb] text-[#5f3d21]' : 'text-[#8b7057] hover:text-[#2f3b52]'
										}`}
									>
										{tab.label}
									</button>
								))}
							</div>

							{activeTab === 'profile' && (
								<section className="space-y-3 rounded-2xl border border-[#ecd3b7] bg-white/85 p-3.5 shadow-[0_6px_18px_rgba(61,34,10,0.08)] sm:p-4">
									<div>
										<h2 className="text-[1.35rem] leading-tight text-[#1a2740] sm:text-2xl">{role.name}</h2>
										<p className="mt-1 text-xs text-[#7d6a59] sm:text-sm">in {industry.name}</p>
									</div>

									<div className="flex flex-wrap gap-2">
										<Badge variant="outline" className="rounded-full border-[#e4cbb0] px-2.5 text-[11px] text-[#886f57]">
											{salaryBadgeText}
										</Badge>
									</div>

									{liveSalary?.live && liveSalary.year && (
										<p className="text-[10px] font-medium uppercase tracking-[0.09em] text-[#9a7b5e]">
											SCB {liveSalary.year} · {liveSalary.sectorLabel ?? liveSalary.sectorCode} · {liveSalary.occupationLabel ?? liveSalary.occupationCode}
										</p>
									)}

									{salaryMedian !== null && salaryP25 !== null && salaryP75 !== null && (
										<SalaryBar p25={salaryP25} median={salaryMedian} p75={salaryP75} marker={salaryAverage ?? undefined} markerSuffix="avg" />
									)}

									<p className="text-[13px] leading-relaxed text-[#5e5460] sm:text-sm">{role.description}</p>

									{!!role.learningPath?.length && (
										<div className="space-y-3 rounded-2xl border border-[#ecd4bb] bg-[#fffaf3] p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] sm:space-y-4 sm:p-3">
											<div className="flex items-center justify-between">
												<h3 className="text-[13px] font-semibold text-[#1a2740] sm:text-sm">Learning path</h3>
												<span className="text-[11px] text-[#8a715a] sm:text-xs">
													{role.learningPath?.length ?? 0} steps - ~{totalHours}h
												</span>
											</div>

											<div className="space-y-3">
												{(role.learningPath ?? []).map((step, index) => {
													const Icon = stepIcons[index % stepIcons.length];
													const iconBg = stepIconBg[index % stepIconBg.length];
													const stepPinId = `${role.slug}::${step.order}`;
													const isPinned = pinnedStepIds.includes(stepPinId);

													return (
														<motion.div
															key={`${role.slug}-profile-step-${step.order}`}
															whileHover={{ y: -2, scale: 1.015 }}
															transition={{ duration: 0.18, ease: 'easeOut' }}
															className="rounded-2xl border border-[#ecd4bb] bg-white p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] sm:p-3"
														>
															<div className="flex gap-3">
																<span className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl text-white sm:h-8 sm:w-8 ${iconBg}`}>
																	<Icon size={14} className="sm:h-4 sm:w-4" />
																</span>

																<div className="min-w-0 flex-1 space-y-2">
																	<div className="flex items-center justify-between gap-2">
																		<p className="truncate text-[13px] font-semibold text-[#1a2740] sm:text-sm">{step.title}</p>
																		<div className="flex items-center gap-1.5">
																			<span className="inline-flex items-center gap-1 rounded-full bg-[#fff0dc] px-2 py-0.5 text-[10px] text-[#866a50] sm:text-[11px]">
																				<Clock3 size={11} />
																				{step.estimatedHours}h
																			</span>
																			<Button
																				type="button"
																				size="icon-xs"
																				variant={isPinned ? 'secondary' : 'outline'}
																				onClick={() => void handlePinLearningStep(step.order)}
																				disabled={isPinned}
																				className="h-6 w-6 border-[#e9cfb4] text-[#7f6853] hover:text-[#1a2740]"
																				aria-label={isPinned ? `Pinned ${step.title}` : `Pin ${step.title}`}
																				title={isPinned ? 'Pinned' : 'Pin learning step'}
																			>
																				<Star size={11} className={isPinned ? 'fill-current' : ''} />
																			</Button>
																		</div>
																	</div>

																	<p className="text-xs leading-relaxed text-[#756456] sm:text-[13px]">{step.description}</p>

																	<div className="flex flex-wrap gap-1.5">
																		{step.resources.map((resource) => (
																			<a
																				key={`${step.order}-${resource.name}`}
																				href={resource.url}
																				target="_blank"
																				rel="noreferrer"
																				className="inline-flex items-center gap-1 rounded-full border border-[#e9cfb4] bg-white px-2 py-0.5 text-[10px] text-[#7f6853] transition-colors duration-200 ease-out hover:text-[#1a2740] sm:px-2.5 sm:py-1 sm:text-[11px]"
																			>
																				{resource.name}
																				<span
																					className={`rounded-full px-1.5 py-0.5 text-[10px] ${
																						resource.type === 'free' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
																					}`}
																				>
																					{resource.type}
																				</span>
																			</a>
																		))}
																	</div>
																</div>
															</div>
														</motion.div>
													);
												})}
											</div>
										</div>
									)}
								</section>
							)}

							{activeTab === 'tools' && expandedDistrict && (
								<div>
									<ToolsAccordion districtName={expandedDistrict.name} stacks={expandedDistrict.stacks} />
								</div>
							)}

							{activeTab === 'related' && <NearThisPanel currentRoleSlug={role.slug} industrySlug={role.industrySlug} />}

							{activeTab === 'jobs' && (
								<section className="space-y-3 rounded-2xl border border-[#ecd3b7] bg-white/85 p-3.5 shadow-[0_6px_18px_rgba(61,34,10,0.08)] sm:p-4">
									<h3 className="text-sm font-semibold text-[#1a2740]">Jobs and courses</h3>

									<Card className="border-[#ecd3b7] bg-[#fffaf3] py-4 shadow-none">
										<CardContent className="px-4">
											<JobMarketTicker roleSlug={role.slug} roleName={role.name} />
										</CardContent>
									</Card>

									<CourseMatchmaker courses={role.courses ?? []} salaryMedian={salaryMedian ?? undefined} />
								</section>
							)}

							<div className="flex flex-col gap-2 pt-1 sm:flex-row">
								<Button onClick={handlePin} className="h-10 flex-1 rounded-full text-[13px] sm:h-11 sm:text-sm">
									<Star size={13} />
									Pin role
								</Button>
								<Button variant="outline" onClick={close} className="h-10 rounded-full border-[#e7ceb2] bg-white/90 px-4 text-[13px] sm:h-11 sm:text-sm">
									Close
								</Button>
							</div>
					</div>
				)}
			</ScrollArea>
		</aside>
	);
}
