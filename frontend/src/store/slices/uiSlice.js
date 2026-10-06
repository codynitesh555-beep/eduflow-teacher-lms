import { createSlice } from '@reduxjs/toolkit';

const INIT_NOTIFS = [
  { id: 1, text: "Karthik Kumar attendance below 60%", type: "alert", time: "10 min ago", read: false },
  { id: 2, text: "Chemistry class rescheduled confirmed", type: "info", time: "1 hr ago", read: false },
  { id: 3, text: "Grade 10A attendance saved", type: "success", time: "2 hrs ago", read: false },
  { id: 4, text: "New student added to Physics 11B", type: "info", time: "Yesterday", read: true },
];

const initialState = {
  section: 'dashboard',
  sidebarOpen: true,
  search: '',
  notifications: INIT_NOTIFS,
  showNotifs: false,
  aiPanelOpen: false,
  rescheduleTarget: null,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
      state.search = ''; 
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleNotifs: (state) => {
      state.showNotifs = !state.showNotifs;
      if (!state.showNotifs) {
        // Mark all as read when opening notifications
        state.notifications.forEach(n => n.read = true);
      }
    },
    setShowNotifs: (state, action) => {
      state.showNotifs = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
        read: false,
      });
    },
    setAiPanelOpen: (state, action) => {
      state.aiPanelOpen = action.payload;
    },
    setRescheduleTarget: (state, action) => {
      state.rescheduleTarget = action.payload;
    },
    addToast: (state, action) => {
      state.toasts.push({
        id: Date.now() + Math.random(),
        ...action.payload
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    }
  },
});

export const {
  setSection, toggleSidebar, setSidebarOpen, setSearch, toggleNotifs, setShowNotifs,
  addNotification, setAiPanelOpen, setRescheduleTarget, addToast, removeToast
} = uiSlice.actions;

export default uiSlice.reducer;
