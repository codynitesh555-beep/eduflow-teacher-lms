import { Avatar } from './ui/Avatar';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

// Reordered for industrial workflow
const NAV = [
  { id: "dashboard", label: "Dashboard", emoji: "⊞" },
  { id: "attendance", label: "Attendance", emoji: "📋" }, 
  { id: "ongoing", label: "Ongoing Classes", emoji: "▶" },
  { id: "upcoming", label: "Upcoming Classes", emoji: "📅" },
];

export function Sidebar({ section, onNav, open, onToggle, teacher }) {
  const dispatch = useDispatch();

  return (
    <aside className={`fixed lg:static top-0 left-0 h-screen bg-slate-900 text-white z-40 transition-all duration-300 ease-in-out flex flex-col pt-4 pb-6 overflow-hidden ${open ? 'w-72' : 'w-0 lg:w-20'} ${!open && "invisible lg:visible"}`}>
      
      {/* Logo & Toggle */}
      <div className={`flex items-center px-6 mb-8 h-12 flex-shrink-0 ${open ? 'justify-between' : 'justify-center w-20 px-0'}`}>
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight whitespace-nowrap overflow-hidden">
          <span className="text-orange-500 font-serif text-2xl flex-shrink-0">✦</span>
          {open && <span>EduFlow</span>}
        </div>
        <button 
          onClick={onToggle} 
          className="hidden lg:flex w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          {open ? "‹" : "›"}
        </button>
      </div>

      {/* Profile Section - FIXED WITH OPTIONAL CHAINING */}
      {open && (
        <div className="px-6 mb-8 mt-2 animate-[slideUp_0.4s_ease-out]">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4">
            <div className="relative">
              {/* Added ?. and fallback ?? to initials */}
              <Avatar initials={teacher?.initials || "??"} size={44} index={0} />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-800 rounded-full" title="Online" />
            </div>
            <div className="overflow-hidden">
              {/* Added ?. and fallback to name and subject */}
              <div className="font-bold text-[15px] truncate">{teacher?.name || "Loading profile..."}</div>
              <div className="text-xs text-slate-400 font-medium truncate">{teacher?.subject || "Teacher"}</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden ${open ? 'px-4' : 'px-2'}`}>
        {open && <div className="text-xs font-bold text-slate-500 tracking-widest pl-4 mb-3 mt-2 uppercase">Navigation</div>}
        
        {NAV.map((n) => {
          const isActive = section === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-semibold text-sm relative outline-none group mb-1
                ${isActive ? 'bg-orange-600 shadow-lg shadow-orange-600/20 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                ${!open && 'justify-center px-0'}
              `}
              title={!open ? n.label : undefined}
            >
              <span className={`text-[17px] ${isActive ? '' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                {n.emoji}
              </span>
              {open && <span className="whitespace-nowrap">{n.label}</span>}
              {isActive && open && <span className="absolute right-4 w-2 h-2 rounded-full bg-orange-200" />}
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className={`mt-auto ${open ? 'px-4' : 'px-2'}`}>
        <button 
          onClick={() => dispatch(logout())}
          className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors font-semibold text-sm ${!open && 'justify-center px-0'}`}
          title={!open ? "Sign Out" : undefined}
        >
          <span className="text-[17px]">⏻</span>
          {open && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}