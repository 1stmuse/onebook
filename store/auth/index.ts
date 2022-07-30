import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface User {
  email: string;
  password: string;
}

export interface Auth {
  user?: User | null;
  access_token?: string | null;
  isLoading?: boolean;
}

const initialState: Auth = { isLoading: true } as Auth;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential(
      state,
      { payload: { user, access_token } }: PayloadAction<Auth>
    ) {
      AsyncStorage.setItem(
        '@user',
        JSON.stringify({ user, access_token })
      );
      state.user = user;
      state.access_token = access_token;
      state.isLoading = false;
    },
    logout: (state) => {
      state.access_token = null
    }
  }
});

export const { setCredential, logout} = authSlice.actions;
export default authSlice.reducer;
export const useSelectUser = (
  state: RootState
): User | null | undefined => state.auth.user;
export const useSelectToken = (
  state: RootState
): string | null | undefined => state.auth.access_token;

export const useIsLoading = (state: RootState): boolean | undefined =>
  state.auth.isLoading;
