export interface User {
  id: string;
  name: string;
  email: string;
  is_seller: boolean;
  image?: string;
  favoriteInstruments: string[];
} 