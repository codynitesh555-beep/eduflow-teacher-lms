const PALETTE = [
  "#D4622A", "#B45309", "#16A34A", "#0891B2", "#7C3AED", 
  "#DB2777", "#EA580C", "#065F46", "#1D4ED8", "#9D174D"
];

export function Avatar({ initials, size = 44, index = 0 }) {
  const bgColor = PALETTE[index % PALETTE.length];
  return (
    <div 
      className="rounded-full flex items-center justify-center font-bold text-white shadow-inner flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size * 0.4
      }}
    >
      {initials}
    </div>
  );
}
