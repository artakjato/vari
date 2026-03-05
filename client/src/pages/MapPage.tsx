import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import { Breadcrumbs } from '../components/map/Breadcrumbs';
import { MapCanvas } from '../components/map/MapCanvas';
import { InspectorPanel } from '../components/panels/InspectorPanel';
import { TopBar } from '../components/ui/TopBar';
import { useMapNavigation } from '../hooks/useMapNavigation';
import { useViewport } from '../hooks/useViewport';
import { useMapStore } from '../stores/mapStore';

export function MapPage() {
	useMapNavigation();
	useViewport();

	const loading = useMapStore((state) => state.loading);
	const error = useMapStore((state) => state.error);
	const loadMapData = useMapStore((state) => state.loadMapData);
	const industriesCount = useMapStore((state) => state.industries.length);
	const rolesCount = useMapStore((state) => state.roles.length);
	const viewport = useMapStore((state) => state.viewport);
	const inspectorOpen = useMapStore((state) => state.inspectorOpen);

	useEffect(() => {
		if (industriesCount > 0 && rolesCount > 0) return;
		void loadMapData();
	}, [industriesCount, loadMapData, rolesCount]);

	if (loading) {
		return (
			<div className="flex h-screen w-screen flex-col items-center justify-center gap-3 bg-background px-5 sm:gap-6">
				<div className="flex scale-[0.68] gap-2.5 sm:scale-100 sm:gap-6">
					{[1, 2, 3, 4].map((item) => (
						<motion.div
							key={item}
							className="rounded-full"
							style={{
								width: 100 + item * 20,
								height: 80 + item * 15,
								background: 'linear-gradient(90deg, #ffdcb7 25%, #fff2df 50%, #ffdcb7 75%)',
								backgroundSize: '200% 100%',
							}}
							animate={{
								backgroundPosition: ['200% 0', '-200% 0'],
								scale: [1, 1.02, 1],
							}}
							transition={{
								backgroundPosition: { duration: 1.5, ease: 'easeInOut', repeat: Infinity },
								scale: { duration: 3, ease: 'easeInOut', repeat: Infinity, delay: item * 0.2 },
							}}
						/>
					))}
				</div>
				<p className="text-[13px] font-medium text-muted-foreground sm:text-sm">Loading roadmap map...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background px-4 sm:px-6">
				<div className="rounded-2xl border border-[#f6bfb7] bg-[#fff3f1] p-5 text-center backdrop-blur-sm sm:p-8">
					<p className="text-[1.05rem] font-semibold text-[#b8382a] sm:text-lg">Connection Error</p>
					<p className="mt-2 max-w-sm text-[13px] text-[#c14d40] sm:text-sm">{error}</p>
					<button
						onClick={() => loadMapData()}
						className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground transition-colors duration-150 hover:bg-[#e66800] sm:text-sm"
					>
						<RefreshCw size={14} />
						Retry
					</button>
				</div>
			</div>
		);
	}

	const inspectorVariant = viewport === 'mobile' ? 'fullscreen' : viewport === 'tablet' ? 'bottom-sheet' : 'sidebar';

	return (
		<div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
			<TopBar />

			<div className="relative flex min-h-0 flex-1 overflow-hidden bg-[linear-gradient(180deg,#fff7ee_0%,#fff4e8_100%)]">
				<div className={`relative min-h-0 flex-1 ${viewport === 'mobile' ? 'overflow-y-auto overflow-x-hidden touch-pan-y overscroll-contain' : ''}`}>
					<MapCanvas />
					{viewport !== 'mobile' && <Breadcrumbs />}
				</div>

				{viewport === 'desktop' && inspectorOpen && (
					<div className="h-full">
						<InspectorPanel variant="sidebar" />
					</div>
				)}

				{viewport !== 'desktop' && inspectorOpen && <InspectorPanel variant={inspectorVariant as 'bottom-sheet' | 'fullscreen'} />}
			</div>
		</div>
	);
}
