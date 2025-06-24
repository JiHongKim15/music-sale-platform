export interface User {
  is_seller: boolean;
  id: string;
  name: string;
  email: string;
  image?: string;
  favoriteInstruments: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}