export function BubbleLabel({ name, subtitle, color }: { name: string; subtitle?: string; color: string }) {
  return (
    <g>
      <text textAnchor="middle" y={-10} fill="white" fontSize={13} fontWeight="600" fontFamily="Outfit">
        {name}
      </text>
      {subtitle && (
        <text textAnchor="middle" y={8} fill="rgba(255,255,255,0.7)" fontSize={10}>
          {subtitle}
        </text>
      )}
    </g>
  );
}