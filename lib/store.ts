import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/modules/auth/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  // preloadedState: window.__PRELOADED_STATE__
});

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof store.getState>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;


// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()