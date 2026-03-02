import { Command, Search } from 'lucide-react';
import { Dialog } from 'radix-ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSearch } from '../../hooks/useSearch';
import { useMapStore } from '../../stores/mapStore';

export function SearchBar() {
	const [open, setOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { query, setQuery, results, matchedIndustrySlugs } = useSearch();

	const { industries, focusedIndustrySlug, focusIndustry, selectRole, setSearchState, clearSearch } = useMapStore(
		useShallow((state) => ({
			industries: state.industries,
			focusedIndustrySlug: state.focusedIndustrySlug,
			focusIndustry: state.focusIndustry,
			selectRole: state.selectRole,
			setSearchState: state.setSearchState,
			clearSearch: state.clearSearch,
		}))
	);

	const activeColor = useMemo(() => {
		const selectedIndustry = industries.find((industry) => industry.slug === focusedIndustrySlug);
		return selectedIndustry?.color ?? '#ff7b00';
	}, [focusedIndustrySlug, industries]);

	useEffect(() => {
		setSearchState(query, matchedIndustrySlugs);
	}, [matchedIndustrySlugs, query, setSearchState]);

	useEffect(() => {
		return () => clearSearch();
	}, [clearSearch]);

	useEffect(() => {
		const onShortcut = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				setOpen((current) => !current);
			}
		};

		window.addEventListener('keydown', onShortcut);
		return () => window.removeEventListener('keydown', onShortcut);
	}, []);

	useEffect(() => {
		if (open) {
			requestAnimationFrame(() => {
				inputRef.current?.focus();
			});
		}
	}, [open]);

	const closeAndReset = () => {
		setOpen(false);
		setQuery('');
		clearSearch();
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={(nextOpen) => {
				setOpen(nextOpen);
				if (!nextOpen) {
					setQuery('');
					clearSearch();
				}
			}}
		>
			<Dialog.Trigger asChild>
				<button
					className="flex w-full max-w-[720px] items-center justify-between rounded-full border border-border/80 bg-white/90 px-3 py-2 text-left shadow-[0_6px_20px_rgba(61,34,10,0.12)] backdrop-blur-lg transition duration-200 ease-out hover:-translate-y-0.5 sm:px-4 sm:py-2.5"
					style={{ borderColor: `${activeColor}66` }}
				>
					<span className="flex items-center gap-2">
						<Search size={16} className="text-[#a27446]" />
						<span className="text-[13px] font-semibold text-[#2f3b52] sm:text-sm">
							<span className="sm:hidden">Search roles</span>
							<span className="hidden sm:inline">Search roles, industries, and stacks</span>
						</span>
					</span>
					<span className="hidden items-center gap-1 rounded-full border border-border/75 bg-[#fff3e6] px-2 py-0.5 text-[11px] text-[#9b6b3a] sm:inline-flex sm:text-xs">
						<Command size={12} />K
					</span>
				</button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-40 bg-[#2c1c0f]/20 backdrop-blur-[2px]" />
				<Dialog.Content
					className="fixed left-1/2 top-16 z-50 w-[min(760px,94vw)] -translate-x-1/2 rounded-2xl border border-border/80 bg-[#fffdf9]/95 p-2 shadow-[0_16px_48px_rgba(61,34,10,0.2)] backdrop-blur-xl focus:outline-none sm:top-20 sm:w-[min(760px,92vw)] sm:rounded-3xl sm:p-3"
					style={{ borderColor: `${activeColor}55` }}
				>
					<div className="flex items-center gap-2 rounded-xl border border-border/80 bg-[#fff5e8] px-2.5 py-2 sm:rounded-2xl sm:px-3 sm:py-2.5">
						<Search size={16} className="text-[#a27446]" />
						<input
							ref={inputRef}
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Type to filter roadmap bubbles..."
							className="w-full bg-transparent text-[13px] font-medium text-[#2f3b52] outline-none placeholder:text-[#b28a63] sm:text-sm"
						/>
						<button onClick={closeAndReset} className="rounded-full border border-border/75 bg-white/80 px-2 py-0.5 text-[11px] text-[#8f7258] hover:bg-white sm:text-xs">
							Esc
						</button>
					</div>

					<div className="mt-2 max-h-[56vh] overflow-y-auto rounded-xl border border-border/75 sm:mt-3 sm:max-h-[360px] sm:rounded-2xl">
						{results.length ? (
							<div className="divide-y divide-border/70">
								{results.map((result) => {
									const item = result.item;
									const color = item.type === 'industry' ? item.color : industries.find((industry) => industry.slug === item.industrySlug)?.color;

									return (
										<button
											key={`${item.type}-${item.slug}`}
											onClick={() => {
												if (item.type === 'industry') {
													focusIndustry(item.slug);
												} else {
													focusIndustry(item.industrySlug);
													selectRole(item.slug);
												}
												closeAndReset();
											}}
											className="flex w-full items-center gap-3 bg-white/75 px-3 py-2.5 text-left transition duration-150 ease-out hover:bg-[#fff3e6] sm:px-4 sm:py-3"
										>
											<span className="h-3 w-3 rounded-full" style={{ background: color ?? activeColor }} />
											<span className="flex-1">
												<span className="block text-[13px] font-semibold text-[#2f3b52] sm:text-sm">{item.name}</span>
												<span className="block text-[10px] uppercase tracking-[0.12em] text-[#96785f] sm:text-[11px] sm:tracking-[0.14em]">
													{item.type === 'industry' ? 'Industry' : 'Role'}
												</span>
											</span>
										</button>
									);
								})}
							</div>
						) : (
							<div className="px-3 py-6 text-[13px] text-[#987960] sm:px-4 sm:py-8 sm:text-sm">{query.trim().length > 1 ? 'No matching paths.' : 'Start typing to search the roadmap.'}</div>
						)}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
