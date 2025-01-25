export interface Notification {
  id: string;
  type: 'price_change' | 'sold';
  instrumentId: string;
  instrumentName: string;
  message: string;
  read: boolean;
  createdAt: string;
}