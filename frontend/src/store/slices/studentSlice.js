import { createSlice } from '@reduxjs/toolkit';

const STUDENTS = [
  { id: 1, name: "Arjun Mehta", roll: "01", initials: "AM", total: 20, attended: 18 },
  { id: 2, name: "Priya Nair", roll: "02", initials: "PN", total: 20, attended: 20 },
  { id: 3, name: "Rohan Gupta", roll: "03", initials: "RG", total: 20, attended: 15 },
  { id: 4, name: "Sneha Iyer", roll: "04", initials: "SI", total: 20, attended: 19 },
  { id: 5, name: "Karthik Kumar", roll: "05", initials: "KK", total: 20, attended: 12 },
  { id: 6, name: "Ananya Singh", roll: "06", initials: "AS", total: 20, attended: 20 },
  { id: 7, name: "Vikram Rao", roll: "07", initials: "VR", total: 20, attended: 17 },
  { id: 8, name: "Meera Patel", roll: "08", initials: "MP", total: 20, attended: 16 },
  { id: 9, name: "Aditya Joshi", roll: "09", initials: "AJ", total: 20, attended: 14 },
  { id: 10, name: "Divya Reddy", roll: "10", initials: "DR", total: 20, attended: 20 },
];

const initialState = {
  students: STUDENTS,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
});

export default studentSlice.reducer;
