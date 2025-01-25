import client from './client';
import type { Instrument } from '../../types';

export const getInstruments = async (params?: {
  type?: string;
  subtype?: string;
  brand?: string;
  condition?: 'new' | 'used';
  grade?: 'S' | 'A' | 'B' | 'C';
  minPrice?: number;
  maxPrice?: number;
  region?: string;
  search?: string;
}) => {
  const { data } = await client.get<Instrument[]>('/instruments', { params });
  return data;
};

export const getInstrument = async (id: string) => {
  const { data } = await client.get<Instrument>(`/instruments/${id}`);
  return data;
};

export const createInstrument = async (instrumentData: FormData) => {
  const { data } = await client.post<Instrument>('/instruments', instrumentData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const updateInstrument = async (id: string, instrumentData: FormData) => {
  const { data } = await client.put<Instrument>(`/instruments/${id}`, instrumentData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteInstrument = async (id: string) => {
  await client.delete(`/instruments/${id}`);
};