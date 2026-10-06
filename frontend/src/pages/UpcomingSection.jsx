import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpcomingCard } from '../components/cards/UpcomingCard';
import { setRescheduleTarget } from '../store/slices/uiSlice';

export function UpcomingSection() {
  const dispatch = useDispatch();
  const { upcoming } = useSelector(state => state.classes);
  const { search } = useSelector(state => state.ui);
  
  const [filter, setFilter] = useState("all");

  const filtered = upcoming.filter((c) => {
    const q = search.toLowerCase();
    const matchS = c.name.toLowerCase().includes(q) || c.grade.toLowerCase().includes(q) || c.date.toLowerCase().includes(q);
    const matchF = filter === "all" || c.status === filter;
    return matchS && matchF;
  });

  const counts = {
    all: upcoming.length,
    scheduled: upcoming.filter((u) => u.status === "scheduled").length,
    missed: upcoming.filter((u) => u.status === "missed").length,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-6 mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Upcoming Classes</h2>
          <p className="text-slate-500 font-medium mt-1">
            {counts.scheduled} scheduled · <span className="text-red-500 font-bold">{counts.missed} missed</span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 bg-slate-200/50 p-1.5 rounded-xl w-fit mb-4">
        {["all", "scheduled", "missed"].map((f) => (
          <button
            key={f}
            className={`px-4 xl:px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 outline-none flex items-center gap-2
              ${filter === f ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}
            `}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "scheduled" ? "✅ Scheduled" : "⚠ Missed"}
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-black
              ${filter === f ? 'bg-slate-100' : 'bg-slate-200'}
            `}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
         <div className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm border border-slate-100 border-dashed animate-[slideUp_0.4s_ease-out]">
         <div className="text-5xl mb-4 opacity-50 grayscale">📭</div>
         <p className="text-lg font-bold text-slate-400">No classes match your criteria.</p>
       </div>
      )}

      <div className="flex flex-col gap-4">
        {filtered.map((c, i) => (
          <UpcomingCard
            key={c.id}
            cls={c}
            delay={i * 60}
            onReschedule={() => dispatch(setRescheduleTarget(c))}
          />
        ))}
      </div>
    </div>
  );
}
