interface Props {
	p25: number;
	median: number;
	p75: number;
	marker?: number;
	markerSuffix?: string;
}

function formatSEK(value: number): string {
	return `${Math.round(value / 1000)}k`;
}

export function SalaryBar({ p25, median, p75, marker, markerSuffix }: Props) {
	const min = p25 * 0.9;
	const max = p75 * 1.1;
	const range = max - min;

	const leftPct = ((p25 - min) / range) * 100;
	const markerValue = marker ?? median;
	const markerPct = Math.min(100, Math.max(0, ((markerValue - min) / range) * 100));
	const rightPct = ((p75 - min) / range) * 100;
	const barWidth = rightPct - leftPct;
	const markerLabel = markerSuffix ? `${formatSEK(markerValue)} SEK ${markerSuffix}` : `${formatSEK(markerValue)} SEK`;

	return (
		<div className="space-y-1.5">
			<div className="flex items-center justify-between">
				<p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a28264]">Salary Range (SEK/mo)</p>
			</div>

			<div className="relative h-6 w-full rounded-full bg-[#f7e8d4]">
				<div className="absolute top-1 h-4 rounded-full bg-gradient-to-r from-[#ffd6a8] via-[#ff9b4d] to-[#ff7b00]" style={{ left: `${leftPct}%`, width: `${barWidth}%` }} />
				<div className="absolute top-0 h-6 w-0.5 rounded-full bg-[#c95f12]" style={{ left: `${markerPct}%` }} />
			</div>

			<div className="flex justify-between text-[10px] text-[#8a7159]">
				<span>{formatSEK(p25)} SEK</span>
				<span className="font-semibold text-[#1a2740]">{markerLabel}</span>
				<span>{formatSEK(p75)} SEK</span>
			</div>
		</div>
	);
}
