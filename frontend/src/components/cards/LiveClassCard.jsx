import { useState, useEffect } from 'react';

export function LiveClassCard({ cls }) {
  const [elapsed, setElapsed] = useState(0);
  
  useEffect(() => {
    const tick = () => setElapsed(Math.floor((Date.now() - cls.startedAt) / 60000));
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, [cls.startedAt]);

  return (
    <div 
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between transition-all hover:shadow-md cursor-pointer group"
      style={{ borderLeftWidth: '4px', borderLeftColor: cls.accentColor }}
    >
      <div className="flex items-center gap-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: `${cls.accentColor}1A` }} // 1A is ~10% opacity
        >
          {cls.icon}
        </div>
        <div>
          <div className="font-bold text-[15px] text-slate-800">
            {cls.name} <span className="text-slate-400 font-normal">—</span> {cls.grade}
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[13px] font-semibold text-slate-500">
            <span>{cls.time}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{cls.room}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="font-bold text-[14px] text-slate-700 font-mono tracking-tighter">
          ⏱ {elapsed}m
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-bold text-red-500 animate-pulse">
          <span className="text-[8px]">●</span> LIVE
        </div>
      </div>
    </div>
  );
}
