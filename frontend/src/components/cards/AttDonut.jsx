export function AttDonut({ pct }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  
  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-8 flex items-center justify-center">
      <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90 origin-center drop-shadow-xl">
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="12"
        />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke="#EA580C"
          strokeWidth="12"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          strokeLinecap="round"
          strokeDashoffset="0"
          className="transition-all duration-[1.2s] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <span className="text-3xl font-black text-slate-800 tracking-tighter">{pct}%</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Overall</span>
      </div>
    </div>
  );
}
