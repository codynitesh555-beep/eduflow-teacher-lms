import { useDispatch, useSelector } from 'react-redux';
import { setSection } from '../store/slices/uiSlice';
import { StatCard } from '../components/cards/StatCard';
import { LiveClassCard } from '../components/cards/LiveClassCard';
import { AttDonut } from '../components/cards/AttDonut';
import { Avatar } from '../components/ui/Avatar';
import { RippleBtn } from '../components/ui/RippleBtn';

export function HomeSection({ onAiOpen }) {
  const dispatch = useDispatch();
  const { teacher } = useSelector(state => state.auth);
  const { ongoing, upcoming } = useSelector(state => state.classes);
  const { students } = useSelector(state => state.students);

  const missed = upcoming.filter((u) => u.status === "missed").length;
  const totalStudents = students.length * ongoing.length;
  const overallAtt = Math.round(
    students.reduce((a, s) => a + (s.attended / s.total) * 100, 0) / students.length
  );
  
  const stats = [
    { label: "Ongoing Today", val: ongoing.length, icon: "▶", color: "#E8621A", bg: "#FFF0E8", nav: "ongoing" },
    { label: "Upcoming Classes", val: upcoming.length, icon: "📅", color: "#7C3AED", bg: "#F3EEFF", nav: "upcoming" },
    { label: "Total Students", val: totalStudents, icon: "👥", color: "#059669", bg: "#ECFDF5", nav: "attendance" },
    { label: "Missed Classes", val: missed, icon: "⚠", color: "#DC2626", bg: "#FEF2F2", nav: "upcoming" },
  ];

  const handleNav = (navId) => dispatch(setSection(navId));

  return (
    <div className="flex flex-col gap-8 animate-[slideUp_0.4s_ease-out]">
      {/* Greeting Card */}
      <div className="bg-slate-900 rounded-[2rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex items-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 translate-y-1/3" />
        
        <div className="relative z-10 w-full sm:w-2/3">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-full tracking-wide mb-6">
            ✦ Teacher Dashboard
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">{teacher.name}</h2>
          <p className="text-lg text-slate-300 font-medium max-w-xl leading-relaxed mb-8">
            You have <strong className="text-white">{ongoing.length} active classes</strong> today.<br />
            Overall attendance is at <strong className="text-white">{overallAtt}%</strong>.
          </p>
          <div className="flex flex-wrap gap-4">
            <RippleBtn onClick={() => handleNav("ongoing")}>
              View Classes →
            </RippleBtn>
            <RippleBtn variant="secondary" onClick={onAiOpen} className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
              🤖 AI Insights
            </RippleBtn>
          </div>
        </div>
        
        <div className="hidden sm:flex w-1/3 relative z-10 justify-center items-center pointer-events-none">
          <div className="text-8xl drop-shadow-2xl animate-[slideUp_1s_ease-out]">📚</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} stat={s} delay={i * 80} onNav={handleNav} />
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Column */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-xl font-bold text-slate-800">Live Classes</h3>
              <button className="text-orange-600 font-bold text-sm tracking-wide hover:text-orange-700 transition" onClick={() => handleNav("ongoing")}>
                See all →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ongoing.map(c => <LiveClassCard key={c.id} cls={c} />)}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-xl font-bold text-slate-800">Upcoming Schedule</h3>
              <button className="text-orange-600 font-bold text-sm tracking-wide hover:text-orange-700 transition" onClick={() => handleNav("upcoming")}>
                See all →
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {upcoming.slice(0, 3).map((c) => (
                <div key={c.id} className={`flex items-center gap-4 p-4 rounded-xl border ${c.status === 'missed' ? 'bg-red-50/50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm border border-slate-100">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-800 text-[15px] truncate">{c.name} — {c.grade}</div>
                    <div className="text-sm font-semibold text-slate-500 mt-0.5">{c.date} · {c.time}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    ${c.status === 'missed' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'}
                  `}>
                    {c.status === 'missed' ? "Missed" : "Scheduled"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="w-full xl:w-[400px] shrink-0 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-8">Class Attendance</h3>
          <AttDonut pct={overallAtt} />
          
          <div className="flex flex-col gap-4 mt-6">
            {students.slice(0, 5).map(s => {
              const p = Math.round((s.attended / s.total) * 100);
              const isGood = p >= 75;
              const isWarn = p >= 60 && p < 75;
              
              return (
                <div key={s.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-3 w-1/3">
                    <Avatar initials={s.initials} size={32} index={s.id - 1} />
                    <span className="font-bold text-[14px] text-slate-800 truncate">{s.name.split(" ")[0]}</span>
                  </div>
                  <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isGood ? 'bg-emerald-500' : isWarn ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${p}%` }}
                    />
                  </div>
                  <span className={`w-10 text-right font-bold text-[13px] ${isGood ? 'text-emerald-600' : isWarn ? 'text-amber-600' : 'text-red-600'}`}>
                    {p}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
