import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useMapStore } from '../../stores/mapStore';

const navItems = [
	{ label: 'Explore', to: '/map' },
	{ label: 'Saved', to: '/pins' },
];

export function TopBar() {
	const location = useLocation();
	const currentUser = useMapStore((state) => state.currentUser);
	const resetMap = useMapStore((state) => state.resetMap);

	return (
		<header className="h-14 border-b border-border/80 bg-background/95 px-3 backdrop-blur sm:h-16 sm:px-5 md:h-[4.5rem] md:px-8 lg:px-10">
			<div className="mx-auto flex h-full w-full max-w-[1520px] items-center justify-between gap-2.5 sm:gap-4">
				<div className="flex items-center gap-2.5 sm:gap-5">
					<Link to="/" onClick={resetMap} className="inline-flex items-center gap-1.5 text-[0.95rem] font-bold tracking-tight text-foreground sm:gap-2 sm:text-lg md:text-[1.12rem]">
						<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">V</span>
						Vari
					</Link>

					<nav className="hidden items-center gap-1 rounded-full border border-border/90 bg-white/70 p-1 md:flex">
						{navItems.map((item) => {
							const isActive = location.pathname.startsWith(item.to);

							return (
								<Link
									key={item.label}
									to={item.to}
									className="relative rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground md:px-4 md:text-sm"
								>
									{isActive && (
										<motion.span
											layoutId="topbar-active"
											className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(120deg,#ffd6ab_0%,#ffc58d_40%,#ffb5ca_100%)]"
											transition={{ duration: 0.2, ease: 'easeOut' }}
										/>
									)}
									<span className={isActive ? 'text-[#2c2b3d]' : ''}>{item.label}</span>
								</Link>
							);
						})}
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
						<span className="ml-1 hidden rounded-full border border-border/80 bg-white/70 px-2.5 py-1 text-xs font-semibold text-muted-foreground md:inline-block md:px-3 md:text-sm">
							{currentUser.displayName}
						</span>
					) : (
						<Link to="/auth" className="ml-1 text-[11px] font-semibold text-foreground hover:underline sm:text-sm">
							Log in
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
