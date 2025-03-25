import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null,
    token: null,
    userId: null,
    userName: null,
  },
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   setUser(state, action) {
      state.user = action.payload;
    },
    setUserName(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuthState(state) {
      state.user = {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        role: null,
        token: null,
        userId: null,
        userName: null
      };
      state.token = null;
      state.isAuthenticated = false;
    },
    authenticateUser(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setToken, clearAuthState, authenticateUser, setUserName } = authSlice.actions;
export default authSlice.reducer;
