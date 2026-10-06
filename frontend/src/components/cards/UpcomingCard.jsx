import { RippleBtn } from '../ui/RippleBtn';

function formatTime(t) {
  if (!t.includes(":")) return t;
  const [h, m] = t.split(":");
  const hr = parseInt(h);
  const p = hr >= 12 ? "PM" : "AM";
  const h12 = hr > 12 ? hr - 12 : hr === 0 ? 12 : hr;
  return `${h12}:${m} ${p}`;
}

export function UpcomingCard({ cls, delay, onReschedule }) {
  const isMissed = cls.status === "missed";
  
  return (
    <div 
      className={`bg-white rounded-[1.5rem] p-6 shadow-sm border flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-lg animate-[slideUp_0.4s_ease-out]
        ${isMissed ? 'border-red-200' : 'border-slate-100'}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0
        ${isMissed ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-500'}
      `}>
        {cls.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="text-lg font-bold text-slate-800 truncate">{cls.name}</h3>
          <span className="text-slate-400 font-medium">— {cls.grade}</span>
          
          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ml-auto sm:ml-0
            ${isMissed ? 'bg-red-100 text-red-700' : cls.rescheduled ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}
          `}>
            {isMissed ? "⚠ Missed" : cls.rescheduled ? "🔄 Rescheduled" : "✓ Scheduled"}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-[14px] font-semibold text-slate-500 mb-2">
          <span>📅 {cls.date}</span>
          <span>⏰ {formatTime(cls.time)}</span>
        </div>
        
        {isMissed && (
          <div className="text-sm font-medium text-red-500 bg-red-50 px-3 py-2 rounded-lg inline-block">
            This class was not conducted. Please reschedule at your convenience.
          </div>
        )}
        {cls.rescheduled && (
          <div className="text-sm font-medium text-blue-600">✓ Rescheduled successfully</div>
        )}
      </div>
      
      <div className="w-full sm:w-auto mt-4 sm:mt-0 shrink-0">
        <RippleBtn 
          variant={isMissed ? 'primary' : 'secondary'}
          className={isMissed ? '!bg-gradient-to-r !from-red-500 !to-red-600 !shadow-red-500/30' : ''}
          onClick={onReschedule}
        >
          {isMissed ? "📅 Reschedule" : "✏ Reschedule"}
        </RippleBtn>
      </div>
    </div>
  );
}
