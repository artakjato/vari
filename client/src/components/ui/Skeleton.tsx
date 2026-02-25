export function Skeleton({
  width,
  height,
  radius = 8,
}: {
  width: number | string;
  height: number;
  radius?: number;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg, #e0d5c9 25%, #ece6df 50%, #e0d5c9 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s ease-in-out infinite",
      }}
    />
  );
}
