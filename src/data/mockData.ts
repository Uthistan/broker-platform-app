// Centralized mock data for the app

export interface OrderbookEntry {
  symbol: string;
  side: "Buy" | "Sell";
  qty: number;
  price: number;
  pnl: number;
}

export const orderbookData: OrderbookEntry[] = [
  { symbol: "HDFC", side: "Buy", qty: 10, price: 1500, pnl: 100 },
  { symbol: "TCS", side: "Sell", qty: 5, price: 3000, pnl: -50 },
  { symbol: "INFY", side: "Buy", qty: 8, price: 1300, pnl: 64 },
  { symbol: "RELIANCE", side: "Sell", qty: 12, price: 2400, pnl: 120 },
];

export interface PositionEntry {
  symbol: string;
  qty: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
}

export const positionsData: PositionEntry[] = [
  { symbol: "HDFC", qty: 10, avgPrice: 1500, currentPrice: 1600, pnl: 1000 },
  { symbol: "TCS", qty: 5, avgPrice: 3000, currentPrice: 2950, pnl: -250 },
  { symbol: "INFY", qty: 8, avgPrice: 1300, currentPrice: 1380, pnl: 640 },
  { symbol: "RELIANCE", qty: 12, avgPrice: 2400, currentPrice: 2500, pnl: 1200 },
]; 