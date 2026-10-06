import { useState, useEffect } from 'react';

export function StatCard({ stat, delay, onNav }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const target = stat.val;
    const duration = 1000;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [stat.val]);

  return (
    <div 
      className="bg-white rounded-[24px] p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-300/50 cursor-pointer group border border-slate-100 animate-[slideUp_0.6s_out_back]"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onNav(stat.nav)}
    >
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: stat.bg, color: stat.color }}
      >
        {stat.icon}
      </div>
      <div className="mt-8 font-black text-4xl text-slate-800 tracking-tight">{count}</div>
      <div className="mt-1.5 font-bold text-[15px] text-slate-500">{stat.label}</div>
      <div 
        className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        style={{ backgroundColor: stat.color, color: 'white' }}
      >
        →
      </div>
    </div>
  );
}
