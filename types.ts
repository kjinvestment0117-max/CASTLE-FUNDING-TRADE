
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  accountSize: string;
  profitSplit: string;
  isPopular?: boolean;
}

export interface Trade {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  profit: number;
  status: 'OPEN' | 'CLOSED';
  date: string;
}

export interface AccountStats {
  balance: number;
  equity: number;
  dailyLoss: number;
  maxDrawdown: number;
  totalProfit: number;
}
