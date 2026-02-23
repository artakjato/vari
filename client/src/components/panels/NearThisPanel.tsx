import { useMapStore } from "../../stores/mapStore";
import { Card } from "../ui/Card";
import { seedData } from "../../data/seedData";

interface Props {
  currentRoleSlug: string; // the role currently shown in the inspector
  industrySlug: string; // the industry this role belongs to
}

export function NearThisPanel({ currentRoleSlug, industrySlug }: Props) {
  const selectRole = useMapStore((state) => state.selectRole);

  // Find all roles in the same industry, but exclude the current one
  const relatedRoles = seedData.roles.filter(
    (r) => r.industrySlug === industrySlug && r.slug !== currentRoleSlug,
  );

  if (relatedRoles.length === 0) return null; // nothing to show

  return (
    <div style={{ marginTop: 24 }}>
      <h3
        style={{
          fontFamily: "Outfit",
          fontSize: 14,
          color: "var(--text-secondary)",
        }}
      >
        Related Roles
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 8,
        }}
      >
        {relatedRoles.map((role) => (
          <Card key={role.slug} style={{ padding: 12, cursor: "pointer" }}>
            <div onClick={() => selectRole(role.slug)}>
              <div
                style={{ fontWeight: 600, fontFamily: "Outfit", fontSize: 13 }}
              >
                {role.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  marginTop: 4,
                }}
              >
                {role.description.slice(0, 80)}...
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
