import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../../api/AuthenticationService/AuthSlice';
import blogReducer from '../../api/BlogApiService/BlogSlice';
import { TypedUseSelectorHook, useSelector  } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    blog: blogReducer,
  },
});

// Define RootState as the return type of store.getState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
