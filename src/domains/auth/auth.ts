import client from "@/services/api/client";
import { User } from "@/domains/common/types"; 

export const login = async (email: string, password: string) => {
  const { data } = await client.post<{ token: string; user: User }>('/auth/login', {
    email,
    password,
  });
  return data;
};

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
  favoriteInstruments: string[];
}) => {
  const { data } = await client.post<{ token: string; user: User }>('/auth/register', userData);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await client.get<User>('/auth/me');
  return data;
};

export const logout = async () => {
  await client.post('/auth/logout');
};