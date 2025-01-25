import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userState } from '../store/atoms';
import * as authAPI from '../lib/api/auth';

export function useAuth() {
  const setUser = useSetRecoilState(userState);
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authAPI.getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authAPI.login(credentials.email, credentials.password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      queryClient.setQueryData(['user'], data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      queryClient.setQueryData(['user'], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      localStorage.removeItem('token');
      setUser(null);
      queryClient.clear();
    },
  });

  return {
    user,
    isLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  };
}