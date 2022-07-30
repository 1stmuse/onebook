import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import bookReducer from "./books/index"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
