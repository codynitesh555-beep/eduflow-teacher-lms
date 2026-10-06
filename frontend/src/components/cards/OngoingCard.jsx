import { useState, useEffect } from 'react';
import { RippleBtn } from '../ui/RippleBtn';

export function OngoingCard({ cls, delay, onStart }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const tick = () => setElapsed(Math.floor((Date.now() - cls.startedAt) / 60000));
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, [cls.startedAt]);

  const progress = Math.min(100, (elapsed / 90) * 100);

  return (
    <div 
      className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-[slideUp_0.5s_ease-out]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-1.5"
        style={{ backgroundColor: cls.accentColor }}
      />
      
      <div className="flex justify-between items-start mb-6">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${cls.accentColor}1A`, color: cls.accentColor }}
        >
          {cls.icon}
        </div>
        <div className="bg-red-50 text-red-600 font-bold text-xs tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-red-100">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          LIVE · {elapsed}m
        </div>
      </div>

      <h3 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight mb-1">
        {cls.name}
      </h3>
      <div className="font-bold text-slate-500 mb-6">{cls.grade}</div>

      <div className="flex flex-col gap-3 mb-8 bg-slate-50 rounded-xl p-4">
        <div className="flex items-center gap-3 text-[14px] font-semibold text-slate-600">
          <span className="w-5 text-center grayscale opacity-60">⏰</span>
          {cls.time}
        </div>
        <div className="flex items-center gap-3 text-[14px] font-semibold text-slate-600">
          <span className="w-5 text-center grayscale opacity-60">📍</span>
          {cls.room}
        </div>
        <div className="flex items-center gap-3 text-[14px] font-semibold text-slate-600">
          <span className="w-5 text-center grayscale opacity-60">👥</span>
          {cls.studentCount} students
        </div>
      </div>

      <div className="mt-auto">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%`, backgroundColor: cls.accentColor }}
          />
        </div>
        
        <RippleBtn 
          className="w-full shadow-none hover:shadow-lg"
          style={{ backgroundImage: `linear-gradient(to right, ${cls.accentColor}, ${cls.accentColor}DD)` }}
          onClick={() => onStart(cls)}
        >
          Start Class →
        </RippleBtn>
      </div>
    </div>
  );
}
