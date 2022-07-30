import { useMemo } from 'react';
import { setCredential, useIsLoading, useSelectUser, useSelectToken, logout } from '.';
import { useAppSelector, useAppDispatch } from '../hooks';

export const useAuth = () => {;
  const user = useAppSelector(useSelectUser);
  const token = useAppSelector(useSelectToken)
  const isLoading = useAppSelector(useIsLoading);

  return useMemo(
    () => ({ user: user ? user : null, isLoading, token }),
    [user, isLoading]
  );
};


export const useLogout = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(logout());
};
