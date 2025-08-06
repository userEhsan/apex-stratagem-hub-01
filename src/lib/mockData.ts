// Mock data for the trading system dashboard
export interface Symbol {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  allocation: number;
  strategy: string;
  position: number;
  pnl: number;
  health: 'active' | 'warning' | 'error' | 'inactive';
  lastSignal: Date;
  signalCount: number;
}

export interface TradingSignal {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  confidence: number;
  price: number;
  timestamp: Date;
  status: 'pending' | 'executed' | 'rejected';
  reason: string;
}

export interface Trade {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  amount: number;
  price: number;
  pnl: number;
  timestamp: Date;
  status: 'filled' | 'partial' | 'pending' | 'cancelled';
}

export interface PortfolioData {
  totalEquity: number;
  availableBalance: number;
  allocatedBalance: number;
  unrealizedPnL: number;
  realizedPnL: number;
  dailyPnL: number;
  totalReturn: number;
}

export interface SystemHealth {
  component: string;
  status: 'active' | 'warning' | 'error' | 'inactive';
  uptime: number;
  lastCheck: Date;
  details: string;
}

// Mock portfolio data
export const mockPortfolio: PortfolioData = {
  totalEquity: 125847.32,
  availableBalance: 23456.78,
  allocatedBalance: 102390.54,
  unrealizedPnL: 3247.89,
  realizedPnL: 8532.45,
  dailyPnL: 1847.23,
  totalReturn: 12.34
};

// Mock symbols data
export const mockSymbols: Symbol[] = [
  {
    symbol: 'BTCUSDT',
    name: 'Bitcoin',
    price: 67234.56,
    change24h: 2.34,
    volume24h: 28000000000,
    allocation: 35,
    strategy: 'Enhanced MACD',
    position: 0.45,
    pnl: 2456.78,
    health: 'active',
    lastSignal: new Date(Date.now() - 300000),
    signalCount: 24
  },
  {
    symbol: 'ETHUSDT',
    name: 'Ethereum',
    price: 3456.78,
    change24h: -1.23,
    volume24h: 15000000000,
    allocation: 25,
    strategy: 'BTC Aware',
    position: 2.34,
    pnl: -234.56,
    health: 'active',
    lastSignal: new Date(Date.now() - 600000),
    signalCount: 18
  },
  {
    symbol: 'ADAUSDT',
    name: 'Cardano',
    price: 0.4523,
    change24h: 4.56,
    volume24h: 800000000,
    allocation: 15,
    strategy: 'Multi-timeframe',
    position: 1500,
    pnl: 567.89,
    health: 'warning',
    lastSignal: new Date(Date.now() - 900000),
    signalCount: 12
  },
  {
    symbol: 'BNBUSDT',
    name: 'BNB',
    price: 589.23,
    change24h: 1.78,
    volume24h: 2000000000,
    allocation: 12,
    strategy: 'Basic MACD',
    position: 8.45,
    pnl: 123.45,
    health: 'active',
    lastSignal: new Date(Date.now() - 1200000),
    signalCount: 15
  },
  {
    symbol: 'SOLUSDT',
    name: 'Solana',
    price: 145.67,
    change24h: -2.45,
    volume24h: 3500000000,
    allocation: 8,
    strategy: 'Enhanced MACD',
    position: 12.34,
    pnl: -89.34,
    health: 'error',
    lastSignal: new Date(Date.now() - 1800000),
    signalCount: 8
  },
  {
    symbol: 'DOGEUSDT',
    name: 'Dogecoin',
    price: 0.1234,
    change24h: 8.90,
    volume24h: 1200000000,
    allocation: 5,
    strategy: 'Basic MACD',
    position: 2500,
    pnl: 234.67,
    health: 'active',
    lastSignal: new Date(Date.now() - 450000),
    signalCount: 9
  }
];

// Mock trading signals
export const mockSignals: TradingSignal[] = [
  {
    id: '1',
    symbol: 'BTCUSDT',
    type: 'BUY',
    confidence: 0.85,
    price: 67234.56,
    timestamp: new Date(Date.now() - 120000),
    status: 'executed',
    reason: 'MACD bullish crossover, RSI oversold'
  },
  {
    id: '2',
    symbol: 'ETHUSDT',
    type: 'SELL',
    confidence: 0.72,
    price: 3456.78,
    timestamp: new Date(Date.now() - 300000),
    status: 'executed',
    reason: 'Resistance level reached, volume declining'
  },
  {
    id: '3',
    symbol: 'ADAUSDT',
    type: 'BUY',
    confidence: 0.91,
    price: 0.4523,
    timestamp: new Date(Date.now() - 180000),
    status: 'pending',
    reason: 'Strong momentum, BTC correlation positive'
  },
  {
    id: '4',
    symbol: 'BNBUSDT',
    type: 'SELL',
    confidence: 0.68,
    price: 589.23,
    timestamp: new Date(Date.now() - 240000),
    status: 'rejected',
    reason: 'Risk limit exceeded'
  },
  {
    id: '5',
    symbol: 'SOLUSDT',
    type: 'BUY',
    confidence: 0.79,
    price: 145.67,
    timestamp: new Date(Date.now() - 60000),
    status: 'executed',
    reason: 'Support level bounce, volume spike'
  }
];

// Mock trades
export const mockTrades: Trade[] = [
  {
    id: 'T001',
    symbol: 'BTCUSDT',
    side: 'BUY',
    amount: 0.15,
    price: 67100.00,
    pnl: 201.84,
    timestamp: new Date(Date.now() - 3600000),
    status: 'filled'
  },
  {
    id: 'T002',
    symbol: 'ETHUSDT',
    side: 'SELL',
    amount: 1.5,
    price: 3480.00,
    pnl: -34.80,
    timestamp: new Date(Date.now() - 7200000),
    status: 'filled'
  },
  {
    id: 'T003',
    symbol: 'ADAUSDT',
    side: 'BUY',
    amount: 1000,
    price: 0.4450,
    pnl: 73.00,
    timestamp: new Date(Date.now() - 10800000),
    status: 'filled'
  },
  {
    id: 'T004',
    symbol: 'BNBUSDT',
    side: 'SELL',
    amount: 2.5,
    price: 590.00,
    pnl: -1.93,
    timestamp: new Date(Date.now() - 14400000),
    status: 'partial'
  }
];

// Mock system health data
export const mockSystemHealth: SystemHealth[] = [
  {
    component: 'Data Feed',
    status: 'active',
    uptime: 99.98,
    lastCheck: new Date(Date.now() - 30000),
    details: 'WebSocket connections stable'
  },
  {
    component: 'Strategy Engine',
    status: 'active',
    uptime: 99.95,
    lastCheck: new Date(Date.now() - 30000),
    details: 'All strategies operational'
  },
  {
    component: 'Risk Manager',
    status: 'warning',
    uptime: 99.87,
    lastCheck: new Date(Date.now() - 30000),
    details: 'High exposure on SOLUSDT'
  },
  {
    component: 'Order Executor',
    status: 'active',
    uptime: 99.92,
    lastCheck: new Date(Date.now() - 30000),
    details: 'Order latency: 45ms avg'
  },
  {
    component: 'Database',
    status: 'active',
    uptime: 100.0,
    lastCheck: new Date(Date.now() - 30000),
    details: 'All queries responding normally'
  },
  {
    component: 'Portfolio Manager',
    status: 'active',
    uptime: 99.99,
    lastCheck: new Date(Date.now() - 30000),
    details: 'P&L calculations current'
  }
];

// Mock candlestick data for charts
export const generateMockCandleData = (days: number = 30) => {
  const data = [];
  let price = 67000;
  const now = new Date();
  
  for (let i = days * 24; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const change = (Math.random() - 0.5) * 1000;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 200;
    const low = Math.min(open, close) - Math.random() * 200;
    const volume = Math.random() * 1000000 + 500000;
    
    data.push({
      timestamp,
      open,
      high,
      low,
      close,
      volume
    });
    
    price = close;
  }
  
  return data;
};

// Strategy configurations
export const mockStrategies = [
  {
    id: 'basic-macd',
    name: 'Basic MACD',
    description: 'Simple MACD crossover strategy',
    parameters: {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    },
    features: ['Technical Analysis'],
    performance: {
      winRate: 68.5,
      avgProfit: 2.3,
      maxDrawdown: 8.2
    }
  },
  {
    id: 'enhanced-macd',
    name: 'Enhanced MACD',
    description: 'MACD with RSI and volume confirmation',
    parameters: {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      rsiPeriod: 14,
      volumeConfirmation: true
    },
    features: ['Technical Analysis', 'Volume Analysis'],
    performance: {
      winRate: 74.2,
      avgProfit: 3.1,
      maxDrawdown: 6.8
    }
  },
  {
    id: 'btc-aware',
    name: 'BTC Aware',
    description: 'Strategy that considers BTC correlation',
    parameters: {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      btcCorrelationThreshold: 0.7
    },
    features: ['Technical Analysis', 'Correlation Analysis'],
    performance: {
      winRate: 71.8,
      avgProfit: 2.8,
      maxDrawdown: 7.5
    }
  },
  {
    id: 'multi-timeframe',
    name: 'Multi-timeframe',
    description: 'Analyzes multiple timeframes for confirmation',
    parameters: {
      primaryTimeframe: '5m',
      confirmationTimeframes: ['15m', '1h'],
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9
    },
    features: ['Technical Analysis', 'Multi-timeframe Analysis'],
    performance: {
      winRate: 76.9,
      avgProfit: 3.5,
      maxDrawdown: 5.9
    }
  }
];

// Mock log entries
export const mockLogs = [
  {
    timestamp: new Date(Date.now() - 60000),
    level: 'INFO',
    component: 'StrategyEngine',
    message: 'BTCUSDT: Generated BUY signal with confidence 0.85'
  },
  {
    timestamp: new Date(Date.now() - 120000),
    level: 'SUCCESS',
    component: 'OrderExecutor',
    message: 'ETHUSDT: Order filled - SELL 1.5 ETH at 3456.78'
  },
  {
    timestamp: new Date(Date.now() - 180000),
    level: 'WARNING',
    component: 'RiskManager',
    message: 'SOLUSDT: High exposure detected - 85% of allocation used'
  },
  {
    timestamp: new Date(Date.now() - 240000),
    level: 'ERROR',
    component: 'DataFeed',
    message: 'WebSocket reconnection attempt 3/5 for ADAUSDT'
  },
  {
    timestamp: new Date(Date.now() - 300000),
    level: 'INFO',
    component: 'PortfolioManager',
    message: 'Daily P&L updated: +$1,847.23 (+1.48%)'
  }
];

// Utility functions
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};