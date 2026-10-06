import { createSlice } from '@reduxjs/toolkit';

const ONGOING = [
  {
    id: 1,
    name: "Mathematics",
    grade: "Grade 10A",
    time: "10:00 – 11:30 AM",
    room: "Room 204",
    studentCount: 10,
    accentColor: "#E8621A",
    icon: "📐",
    startedAt: Date.now() - 18 * 60000,
  },
  {
    id: 2,
    name: "Physics",
    grade: "Grade 11B",
    time: "11:45 AM – 1:15 PM",
    room: "Lab 3",
    studentCount: 10,
    accentColor: "#7C3AED",
    icon: "⚡",
    startedAt: Date.now() - 5 * 60000,
  },
];

const INIT_UPCOMING = [
  { id: 3, name: "Mathematics", grade: "Grade 10B", date: "Apr 7, 2026", rawDate: "2026-04-07", time: "09:00", status: "scheduled", icon: "📐" },
  { id: 4, name: "Chemistry", grade: "Grade 12A", date: "Apr 7, 2026", rawDate: "2026-04-07", time: "14:00", status: "missed", icon: "🧪" },
  { id: 5, name: "Physics", grade: "Grade 10A", date: "Apr 8, 2026", rawDate: "2026-04-08", time: "10:00", status: "scheduled", icon: "⚡" },
  { id: 6, name: "Mathematics", grade: "Grade 11A", date: "Apr 9, 2026", rawDate: "2026-04-09", time: "11:00", status: "scheduled", icon: "📐" },
  { id: 7, name: "Biology", grade: "Grade 9B", date: "Apr 10, 2026", rawDate: "2026-04-10", time: "09:30", status: "missed", icon: "🌿" },
  { id: 8, name: "Chemistry", grade: "Grade 11B", date: "Apr 11, 2026", rawDate: "2026-04-11", time: "14:30", status: "scheduled", icon: "🧪" },
];

const initialState = {
  ongoing: ONGOING,
  upcoming: INIT_UPCOMING,
  activeClass: null,
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setActiveClass: (state, action) => {
      state.activeClass = action.payload;
    },
    rescheduleClass: (state, action) => {
      const { id, date, rawDate, time } = action.payload;
      const index = state.upcoming.findIndex(c => c.id === id);
      if (index !== -1) {
        state.upcoming[index] = {
          ...state.upcoming[index],
          date,
          rawDate,
          time,
          status: 'scheduled',
          rescheduled: true,
        };
      }
    }
  },
});

export const { setActiveClass, rescheduleClass } = classesSlice.actions;
export default classesSlice.reducer;
