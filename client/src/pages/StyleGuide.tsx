import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Tooltip } from '../components/ui/Tooltip';

export function StyleGuide() {
	return (
		<div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
			<div className="space-y-1">
				<h1 className="text-3xl text-foreground">Vari Style Guide</h1>
				<p className="text-sm text-muted-foreground">Reusable warm-theme components and interaction states.</p>
			</div>

			<section className="space-y-3">
				<h2 className="text-lg font-semibold text-foreground">Buttons</h2>
				<div className="flex flex-wrap gap-2">
					<Button>Primary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
				</div>
			</section>

			<section className="space-y-3">
				<h2 className="text-lg font-semibold text-foreground">Badges</h2>
				<div className="flex flex-wrap gap-2">
					<Badge>Default</Badge>
					<Badge variant="outline" className="border-[#e6ccb0] bg-[#fff3e3] text-[#876f57]">
						Category
					</Badge>
					<Badge variant="secondary">Secondary</Badge>
				</div>
			</section>

			<section className="space-y-3">
				<h2 className="text-lg font-semibold text-foreground">Card</h2>
				<Card>
					<CardContent className="space-y-2">
						<h3 className="text-base font-semibold text-foreground">Roadmap card sample</h3>
						<p className="text-sm text-muted-foreground">Cards use warm borders, elevated white surfaces, and strong text contrast.</p>
					</CardContent>
				</Card>
			</section>

			<section className="space-y-3">
				<h2 className="text-lg font-semibold text-foreground">Tooltip</h2>
				<Tooltip text="Contextual helper tooltip">
					<Button variant="outline">Hover me</Button>
				</Tooltip>
			</section>
		</div>
	);
}
