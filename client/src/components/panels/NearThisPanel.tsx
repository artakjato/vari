import { useMapStore } from '../../stores/mapStore';
import { Card, CardContent } from '../ui/Card';

interface Props {
	currentRoleSlug: string;
	industrySlug: string;
}

export function NearThisPanel({ currentRoleSlug, industrySlug }: Props) {
	const selectRole = useMapStore((state) => state.selectRole);
	const roles = useMapStore((state) => state.roles);

	const relatedRoles = roles.filter((role) => role.industrySlug === industrySlug && role.slug !== currentRoleSlug);

	if (!relatedRoles.length) return null;

	return (
		<section className="space-y-2">
			<h3 className="text-[13px] font-semibold text-[#1a2740] sm:text-sm">Related roles</h3>
			<div className="space-y-2">
				{relatedRoles.map((role) => (
					<Card
						key={role.slug}
						onClick={() => selectRole(role.slug)}
						className="cursor-pointer gap-2 border-[#ecd3b7] bg-white/88 py-3 transition-colors duration-200 ease-out hover:bg-[#fff9f1]"
					>
						<CardContent className="flex items-start justify-between gap-3 px-3">
							<div>
								<p className="text-[13px] font-semibold text-[#1a2740] sm:text-sm">{role.name}</p>
								<p className="mt-1 text-[11px] leading-relaxed text-[#756456] sm:text-xs">{role.description.slice(0, 76)}...</p>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
