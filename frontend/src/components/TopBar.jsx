import { useState, useEffect } from 'react';
import { Avatar } from './ui/Avatar';
import { Search } from 'lucide-react';

const TITLES = {
  dashboard: "Dashboard",
  ongoing: "Ongoing Classes",
  upcoming: "Upcoming Classes",
  attendance: "Attendance",
};

export function TopBar({ 
  teacher, onMenu, search, onSearch, section, unread, 
  notifs, showNotifs, onNotifToggle, onAiOpen 
}) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-30 h-20 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenu}
          className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
        >
          ☰
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {TITLES[section]}
          </h1>
          <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5 tracking-wide">
            {dateStr}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden md:flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full font-bold text-sm">
          <span>⏱</span> {timeStr}
        </div>

        <div className="relative hidden md:flex items-center group">
          <span className="absolute left-4 text-slate-400 group-focus-within:text-orange-500 transition-colors">
            <Search size={18} />
          </span>
          <input
            className="w-64 bg-slate-100 border border-transparent rounded-full py-2.5 pl-11 pr-10 text-sm font-medium text-slate-700 transition-all outline-none focus:bg-white focus:border-orange-300 focus:ring-4 focus:ring-orange-500/10 focus:w-80"
            placeholder="Search classes, students…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          {search && (
            <button 
              className="absolute right-3 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 text-xs transition-colors"
              onClick={() => onSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        <button 
          className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 text-slate-600 font-semibold text-sm px-4 py-2.5 rounded-full hover:border-orange-300 hover:text-orange-600 shadow-sm transition-all"
          onClick={onAiOpen}
          title="AI Insights"
        >
          <span>🤖</span>
          <span>AI Insights</span>
        </button>

        <div className="relative shrink-0">
          <button 
            className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-colors outline-none
              ${showNotifs ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
            `}
            onClick={onNotifToggle}
          >
            🔔
            {unread > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {unread}
              </span>
            )}
          </button>
          
          {showNotifs && (
            <div className="absolute top-full right-0 mt-3 w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-[slideUp_0.2s_ease-out]">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold tracking-tight text-slate-800">Notifications</span>
                {unread > 0 && <span className="bg-orange-100 text-orange-700 font-bold text-xs px-2 py-1 rounded-full">{unread} new</span>}
              </div>
              <div className="max-h-[400px] overflow-y-auto mix-blend-normal">
                {notifs.map(n => (
                  <div key={n.id} className={`p-5 border-b border-slate-50 last:border-0 flex gap-4 transition-colors hover:bg-slate-50 ${n.read ? 'opacity-60' : 'bg-white'}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0
                      ${n.type === 'alert' ? 'bg-red-500' : n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}
                    `} />
                    <div>
                      <div className="text-[14px] font-semibold text-slate-800 leading-snug mb-1.5 pr-2">{n.text}</div>
                      <div className="text-xs font-semibold text-slate-400">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:block">
          <Avatar initials={teacher.initials} size={40} index={0} />
        </div>
      </div>
    </header>
  );
}
