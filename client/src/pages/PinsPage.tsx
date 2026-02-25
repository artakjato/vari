import { useState, useEffect } from "react";
import { getPins } from "../lib/api";
import { useMapStore } from "../stores/mapStore";
import { PinCard } from "../components/pins/PinCard";

interface Pin {
  _id: string;
  targetType: "role" | "industry";
  targetId: string;
  notes: string;
}

export function PinsPage() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);
  const industries = useMapStore((s) => s.industries);
  const roles = useMapStore((s) => s.roles);
  const currentUser = useMapStore((s) => s.currentUser);

  useEffect(() => {
    getPins()
      .then((res) => setPins(res.data))
      .catch(() => setPins([])) // if not logged in, show empty
      .finally(() => setLoading(false));
  }, []);

  // Helper: look up the display name of a pinned item
  const resolveName = (pin: Pin): string => {
    if (pin.targetType === "role") {
      const role = roles.find((r) => r.slug === pin.targetId);
      return role?.name ?? pin.targetId;
    }
    const industry = industries.find((ind) => ind.slug === pin.targetId);
    return industry?.name ?? pin.targetId;
  };

  const handleDelete = (id: string) => {
    setPins((prev) => prev.filter((p) => p._id !== id));
  };

  if (!currentUser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-canvas)",
        }}
      >
        <p style={{ fontFamily: "Inter", color: "var(--text-secondary)" }}>
          Please <a href="/auth">sign in</a> to view your saved pins.
        </p>
      </div>
    );
  }

  if (loading) return <p style={{ padding: 40 }}>Loading your pins...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "var(--bg-canvas)",
      }}
    >
      <h1 style={{ fontFamily: "Outfit", fontSize: 28, marginBottom: 24 }}>
        My Saved Pins ⭐
      </h1>
      {pins.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", fontFamily: "Inter" }}>
          You haven't pinned any roles or industries yet. Explore the
          <a href="/map" style={{ marginLeft: 4 }}>
            map
          </a>{" "}
          and click "Pin" on things you find interesting!
        </p>
      ) : (
        <div style={{ display: "grid", gap: 16, maxWidth: 600 }}>
          {pins.map((pin) => (
            <PinCard
              key={pin._id}
              pin={pin}
              displayName={resolveName(pin)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
