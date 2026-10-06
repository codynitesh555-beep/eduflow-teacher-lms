export function Field({ label, icon, error, suffix, children }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between items-center mb-1.5 px-0.5">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          <span className="text-base text-slate-500">{icon}</span>
          {label}
        </label>
        {error && <span className="text-xs font-semibold text-red-500 animate-pulse">{error}</span>}
      </div>
      <div className={`relative flex items-center bg-slate-100 rounded-xl transition-all duration-300 focus-within:bg-orange-50 focus-within:ring-2 focus-within:ring-orange-500/30 ${error ? 'ring-2 ring-red-500/50 bg-red-50' : 'border border-slate-200'}`}>
        {/* We assume children is an input that handles its own className, but we wrap it nicely */}
        <div className="flex-1 [&>input]:w-full [&>input]:bg-transparent [&>input]:border-none [&>input]:px-4 [&>input]:py-3.5 [&>input]:text-slate-800 [&>input]:text-[15px] [&>input]:placeholder:text-slate-400 [&>input]:outline-none">
          {children}
        </div>
        {suffix && <div className="px-3 flex items-center text-slate-400">{suffix}</div>}
      </div>
    </div>
  );
}
