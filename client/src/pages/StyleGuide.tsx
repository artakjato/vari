import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { Tooltip } from "../components/ui/Tooltip";

export function StyleGuide() {
  return (
    <div style={{ padding: 32, maxWidth: 600, margin: "0 auto" }}>
      <h1>Vari Style Guide</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
        All reusable UI component in one piece
      </p>

      {/* Buttons */}
      <h2>Buttons</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <Badge color="#D4845A">Web Dev</Badge>
        <Badge color="#B8956A">Mobile</Badge>
        <Badge color="#7B8FA1">Security</Badge>
      </div>

      {/* Card */}
      <h2>Card</h2>
      <Card>
        <h3 style={{ margin: 0 }}>This is a card</h3>
        <p style={{ color: "var(--text-secondary)" }}>
          Cards are white containers used throughout the app
        </p>
      </Card>

      {/* Tooltip */}
      <h2 style={{ marginTop: 24 }}>Tooltip</h2>
      <Tooltip text="I'm a tooltip!">
        <Button variant="secondary">Hover over me</Button>
      </Tooltip>
    </div>
  );
}
