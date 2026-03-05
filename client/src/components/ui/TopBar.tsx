import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ChevronDown, LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMapStore } from '../../stores/mapStore';

const communityLinks = [
	{ name: 'AI Sweden', url: 'https://www.ai.se/' },
	{ name: 'Nordic APIs', url: 'https://nordicapis.com' },
	{ name: 'Norrsken Foundation', url: 'https://www.norrsken.org' },
	{ name: 'SwedenJS', url: 'https://swedenjs.org' },
	{ name: 'TechSverige', url: 'https://techsverige.se' },
	{ name: 'Women in Tech Sweden', url: 'https://womenintech.se' },
] as const;

export function TopBar() {
	const location = useLocation();
	const navigate = useNavigate();
	const currentUser = useMapStore((state) => state.currentUser);
	const resetMap = useMapStore((state) => state.resetMap);
	const [isCommunityMenuOpen, setCommunityMenuOpen] = useState(false);
	const communityMenuRef = useRef<HTMLDivElement | null>(null);

	const isMapRoute = location.pathname.startsWith('/map');
	const isSavedRoute = location.pathname.startsWith('/pins');

	useEffect(() => {
		const closeOnOutsideClick = (event: MouseEvent) => {
			if (!communityMenuRef.current) return;
			const target = event.target as Node;
			if (!communityMenuRef.current.contains(target)) {
				setCommunityMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', closeOnOutsideClick);
		return () => document.removeEventListener('mousedown', closeOnOutsideClick);
	}, []);

	useEffect(() => {
		setCommunityMenuOpen(false);
	}, [location.pathname]);

	const handleLogout = () => {
		localStorage.removeItem('vari_token');
		useMapStore.setState({ currentUser: null, pins: [] });
		resetMap();
		navigate('/');
	};

	return (
		<header className="relative z-40 h-14 border-b border-border/80 bg-background/95 px-3 backdrop-blur sm:h-16 sm:px-5 md:h-[4.5rem] md:px-8 lg:px-10">
			<div className="mx-auto flex h-full w-full max-w-[1520px] items-center justify-between gap-2.5 sm:gap-4">
				<div className="flex items-center gap-2.5 sm:gap-5">
					<Link to="/" onClick={resetMap} className="inline-flex items-center gap-1.5 text-[0.95rem] font-bold tracking-tight text-foreground sm:gap-2 sm:text-lg md:text-[1.12rem]">
						<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">V</span>
						Vari
					</Link>

					<nav className="hidden items-center gap-1 rounded-full border border-border/90 bg-white/70 p-1 md:flex">
						<div className="relative" ref={communityMenuRef}>
							<button
								type="button"
								onClick={() => setCommunityMenuOpen((current) => !current)}
								onKeyDown={(event) => {
									if (event.key === 'Escape') setCommunityMenuOpen(false);
								}}
								className="relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground md:px-4 md:text-sm"
								aria-haspopup="menu"
								aria-expanded={isCommunityMenuOpen}
								aria-label="Explore tech communities menu"
							>
								{isMapRoute && (
									<motion.span
										layoutId="topbar-active"
										className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(120deg,#ffd6ab_0%,#ffc58d_40%,#ffb5ca_100%)]"
										transition={{ duration: 0.2, ease: 'easeOut' }}
									/>
								)}
								<span className={isMapRoute ? 'text-[#2c2b3d]' : ''}>Explore Tech Communities</span>
								<ChevronDown
									size={14}
									className={`transition-transform duration-200 ${isCommunityMenuOpen ? 'rotate-180' : ''} ${isMapRoute ? 'text-[#2c2b3d]' : ''}`}
								/>
							</button>

							{isCommunityMenuOpen && (
								<div className="absolute left-0 top-[calc(100%+0.5rem)] z-[60] w-64 rounded-2xl border border-border/90 bg-white/95 p-1.5 shadow-[0_16px_36px_rgba(36,24,13,0.18)] backdrop-blur">
									{communityLinks.map((item) => (
										<a
											key={item.name}
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => setCommunityMenuOpen(false)}
											className="flex w-full rounded-xl px-3 py-2 text-left text-sm text-[#2f3b52] transition-colors hover:bg-[#fff0df]"
										>
											{item.name}
										</a>
									))}
								</div>
							)}
						</div>

						<Link
							to="/pins"
							className="relative rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground md:px-4 md:text-sm"
						>
							{isSavedRoute && (
								<motion.span
									layoutId="topbar-active"
									className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(120deg,#ffd6ab_0%,#ffc58d_40%,#ffb5ca_100%)]"
									transition={{ duration: 0.2, ease: 'easeOut' }}
								/>
							)}
							<span className={isSavedRoute ? 'text-[#2c2b3d]' : ''}>Saved</span>
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-1.5 sm:gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={resetMap}
						className="hidden h-8 rounded-full border-border/90 bg-white/75 px-3 text-xs sm:inline-flex sm:h-9 sm:text-sm"
					>
						Reset
					</Button>

					<Link to="/pins">
						<Button size="sm" className="h-8 rounded-full px-3 text-[11px] sm:h-9 sm:px-3.5 sm:text-sm">
							<span className="sm:hidden">Pins</span>
							<span className="hidden sm:inline">My Pins</span>
						</Button>
					</Link>

					{currentUser ? (
						<>
							<span className="ml-1 hidden rounded-full border border-border/80 bg-white/70 px-2.5 py-1 text-xs font-semibold text-muted-foreground md:inline-block md:px-3 md:text-sm">
								{currentUser.displayName}
							</span>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={handleLogout}
								className="h-8 rounded-full border-border/90 bg-white/75 px-3 text-[11px] sm:h-9 sm:text-sm"
							>
								<LogOut size={13} />
								<span>Log out</span>
							</Button>
						</>
					) : (
						<Link to="/auth">
							<Button
								variant="outline"
								size="sm"
								className="h-8 rounded-full border-border/90 bg-white/75 px-3 text-[11px] sm:h-9 sm:text-sm"
							>
								Log in
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
