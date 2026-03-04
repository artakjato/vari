import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PinCard } from "../components/pins/PinCard";
import { getPins } from "../lib/api";
import type { Pin } from "../lib/types";
import { useMapStore } from "../stores/mapStore";

export function PinsPage() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);

  const industries = useMapStore((state) => state.industries);
  const roles = useMapStore((state) => state.roles);
  const currentUser = useMapStore((state) => state.currentUser);

  useEffect(() => {
    getPins()
      .then((response) => setPins(response.data))
      .catch(() => setPins([]))
      .finally(() => setLoading(false));
  }, []);

  const resolveName = (pin: Pin) => {
    if (pin.targetType === "role") {
      const role = roles.find((item) => item.slug === pin.targetId);
      return role?.name ?? pin.targetId;
    }

    if (pin.targetType === "industry") {
      const industry = industries.find((item) => item.slug === pin.targetId);
      return industry?.name ?? pin.targetId;
    }

    const [roleSlug, stepOrderRaw] = pin.targetId.split("::");
    if (!roleSlug || !stepOrderRaw) return pin.targetId;

    const role = roles.find((item) => item.slug === roleSlug);
    const stepOrder = Number(stepOrderRaw);
    const step = Number.isFinite(stepOrder)
      ? role?.learningPath?.find((item) => item.order === stepOrder)
      : undefined;

    if (role?.name && step?.title) return `${role.name} - ${step.title}`;
    if (step?.title) return step.title;
    if (role?.name) return `${role.name} - Step ${stepOrderRaw}`;
    return pin.targetId;
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6">
        <p className="text-[13px] text-muted-foreground sm:text-sm">
          Please <Link to="/auth" className="font-medium text-foreground hover:underline">sign in</Link> to view saved pins.
        </p>
      </div>
    );
  }

  if (loading) {
    return <p className="px-4 py-8 text-[13px] font-medium text-muted-foreground sm:px-6 sm:text-sm">Loading your pins...</p>;
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
      <div className="mx-auto w-full max-w-3xl space-y-3.5 sm:space-y-4">
        <h1 className="text-[1.75rem] leading-tight text-foreground sm:text-3xl">My saved pins</h1>

        {!pins.length ? (
          <p className="text-[13px] text-muted-foreground sm:text-sm">
            You have not pinned roles, industries, or learning steps yet. Explore the{" "}
            <Link to="/map" className="font-medium text-foreground hover:underline">
              map
            </Link>
            .
          </p>
        ) : (
          <div className="space-y-2.5 sm:space-y-3">
            {pins.map((pin) => (
              <PinCard
                key={pin._id}
                pin={pin}
                name={resolveName(pin)}
                onDelete={(id) => setPins((items) => items.filter((item) => item._id !== id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
