import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';

// 1. IMPORT: Added setSection so we can change pages
import { 
  setSection, 
  toggleSidebar, 
  setSearch, 
  toggleNotifs 
} from '../store/slices/uiSlice';

export default function DashboardLayout({ onAiOpen, children }) {
  const dispatch = useDispatch();
  
  // Get data from Redux state
  const teacher = useSelector(state => state.auth?.teacher);
  const { section, sidebarOpen, search, notifications, showNotifs } = useSelector(state => state.ui);
  
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <div className={`flex min-h-screen bg-slate-50 overflow-hidden font-sans ${sidebarOpen ? 'sidebar-open' : ''}`}>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => dispatch(toggleSidebar())} 
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        section={section}
        open={sidebarOpen}
        onToggle={() => dispatch(toggleSidebar())}
        teacher={teacher}
        // 2. THE FIX: Passing the onNav function to handle clicks
        onNav={(id) => dispatch(setSection(id))} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <TopBar
          teacher={teacher}
          section={section}
          search={search}
          onSearch={(val) => dispatch(setSearch(val))}
          onMenu={() => dispatch(toggleSidebar())}
          unread={unreadCount}
          notifs={notifications}
          showNotifs={showNotifs}
          onNotifToggle={() => dispatch(toggleNotifs())}
          onAiOpen={onAiOpen}
        />
        
        <main 
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8"
          onClick={() => {
            if (showNotifs) dispatch(toggleNotifs());
          }}
        >
          <div className="max-w-[1600px] mx-auto w-full pb-20">
            {/* children renders the pages defined in App.jsx */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}