import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { store } from './store/store';
import { setAiPanelOpen } from './store/slices/uiSlice';
import { restoreSession } from './store/slices/authSlice';

import { LoginPage } from './pages/LoginPage';
// Remove the { } from DashboardLayout if it's a default export
import DashboardLayout from './layouts/DashboardLayout'; 
import { HomeSection } from './pages/HomeSection';

// FIX 1: Changed '../' to './' because App.jsx and 'pages' are in the same src folder
import OngoingSection from './pages/OngoingSection'; 

import { UpcomingSection } from './pages/UpcomingSection';

// FIX 2: Added AttendanceSection import so the page actually loads
import AttendanceSection from './pages/AttendanceSection'; 

import { ToastStack } from './components/ui/ToastStack';
import { RescheduleModal } from './components/RescheduleModal';
import { AIInsightsPanel } from './components/AIInsightsPanel';

function AppContent() {
  const dispatch = useDispatch();
  const { authed, restoring } = useSelector(state => state.auth);

  useEffect(() => {
    if (localStorage.getItem('access_token')) dispatch(restoreSession());
  }, [dispatch]);
  const { section, rescheduleTarget, aiPanelOpen } = useSelector(state => state.ui);

  if (restoring) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 font-semibold">Restoring your session…</div>;
  }

  return (
    <>
      {!authed ? (
        <LoginPage />
      ) : (
        <DashboardLayout onAiOpen={() => dispatch(setAiPanelOpen(true))}>
          {section === "dashboard" && <HomeSection onAiOpen={() => dispatch(setAiPanelOpen(true))} />}
          {section === "ongoing" && <OngoingSection />}
          {section === "upcoming" && <UpcomingSection />}
          
          {/* FIX 3: Replaced the 🚧 placeholder with your actual AttendanceSection */}
          {section === "attendance" && <AttendanceSection />}
        </DashboardLayout>
      )}

      {rescheduleTarget && <RescheduleModal cls={rescheduleTarget} />}
      {aiPanelOpen && <AIInsightsPanel onClose={() => dispatch(setAiPanelOpen(false))} />}
      
      <ToastStack />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
