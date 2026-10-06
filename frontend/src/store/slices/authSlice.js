import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginTeacher, getCurrentTeacher, logoutTeacher } from '../../services/authService';

export const login = createAsyncThunk(
  'auth/login',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      return await loginTeacher(phone, password);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const teacher = await getCurrentTeacher();
      return { teacher };
    } catch (error) {
      logoutTeacher();
      return rejectWithValue(error.message);
    }
  }
);

const storedTeacher = localStorage.getItem('teacher');
const initialState = {
  authed: Boolean(localStorage.getItem('access_token') && storedTeacher),
  teacher: storedTeacher ? JSON.parse(storedTeacher) : null,
  loading: false,
  restoring: Boolean(localStorage.getItem('access_token')),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      logoutTeacher();
      state.authed = false;
      state.teacher = null;
      state.error = null;
    },
    clearAuthError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authed = true;
        state.teacher = action.payload.teacher;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authed = false;
        state.error = action.payload || 'Unable to sign in';
      })
      .addCase(restoreSession.pending, (state) => { state.restoring = true; })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.restoring = false;
        state.authed = true;
        state.teacher = action.payload.teacher;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.restoring = false;
        state.authed = false;
        state.teacher = null;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
