export function Skeleton({ width, height, radius = 8 }: { width: number | string; height: number; radius?: number }) {
	return (
		<div
			style={{
				width,
				height,
				borderRadius: radius,
				background: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
				backgroundSize: '200% 100%',
				animation: 'shimmer 1.25s ease-in-out infinite',
			}}
		/>
	);
}
