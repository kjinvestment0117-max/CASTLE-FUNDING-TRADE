
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from './LanguageContext';

const data = [
  { name: 'Day 1', balance: 300000, equity: 300000 },
  { name: 'Day 2', balance: 305000, equity: 302000 },
  { name: 'Day 3', balance: 303000, equity: 304000 },
  { name: 'Day 4', balance: 312000, equity: 310000 },
  { name: 'Day 5', balance: 318000, equity: 319000 },
  { name: 'Day 6', balance: 315000, equity: 314000 },
  { name: 'Day 7', balance: 325000, equity: 328000 },
];

const trades = [
  { id: '1', pair: 'EURUSD', type: 'BUY', profit: 4200, status: 'CLOSED', date: '2024-05-20' },
  { id: '2', pair: 'BTCUSD', type: 'SELL', profit: -1200, status: 'CLOSED', date: '2024-05-21' },
  { id: '3', pair: 'NAS100', type: 'BUY', profit: 8500, status: 'OPEN', date: '2024-05-22' },
  { id: '4', pair: 'XAUUSD', type: 'BUY', profit: 2100, status: 'CLOSED', date: '2024-05-22' },
];

const MyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-12 px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-castle font-black">{t.mypage.title}</h1>
          <p className="text-gray-400">Account #774921 - $300,000 King Challenge</p>
        </div>
        <div className="flex space-x-2">
          <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg text-sm font-bold border border-green-500/20">{t.mypage.status}</div>
          <div className="px-4 py-2 glass text-gray-400 rounded-lg text-sm font-bold">{t.mypage.verified}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-2xl">
          <div className="text-gray-500 text-sm uppercase mb-1">{t.mypage.stats.balance}</div>
          <div className="text-2xl font-bold">$325,000.00</div>
          <div className="text-green-500 text-xs mt-2">+8.3% Total</div>
        </div>
        <div className="glass p-6 rounded-2xl">
          <div className="text-gray-500 text-sm uppercase mb-1">{t.mypage.stats.dailyLoss}</div>
          <div className="text-2xl font-bold">$1,200.00</div>
          <div className="text-gray-500 text-xs mt-2">{t.mypage.stats.allowed}: $15,000</div>
        </div>
        <div className="glass p-6 rounded-2xl">
          <div className="text-gray-500 text-sm uppercase mb-1">{t.mypage.stats.maxDrawdown}</div>
          <div className="text-2xl font-bold">$12,000.00</div>
          <div className="text-red-500 text-xs mt-2">{t.mypage.stats.critical}: $30,000</div>
        </div>
        <div className="glass p-6 rounded-2xl">
          <div className="text-gray-500 text-sm uppercase mb-1">{t.mypage.stats.profitShare}</div>
          <div className="text-2xl font-bold">$22,500.00</div>
          <div className="text-yellow-500 text-xs mt-2">{t.mypage.stats.estimated}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-6 rounded-2xl h-[400px]">
          <h3 className="font-castle font-bold mb-6">{t.mypage.charts.equity}</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <defs>
                {/* Fixed duplicate x2 attribute and added missing y1 */}
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#b8860b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                itemStyle={{ color: '#b8860b' }}
              />
              <Area type="monotone" dataKey="equity" stroke="#b8860b" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6 rounded-2xl">
          <h3 className="font-castle font-bold mb-6">{t.mypage.charts.recent}</h3>
          <div className="space-y-4">
            {trades.map(trade => (
              <div key={trade.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <div className="font-bold flex items-center">
                    {trade.pair}
                    <span className={`ml-2 text-[10px] px-2 py-0.5 rounded ${trade.type === 'BUY' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {trade.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{trade.date}</div>
                </div>
                <div className={`font-bold ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {trade.profit >= 0 ? '+' : ''}{trade.profit.toLocaleString()}$
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold transition-colors">
            {t.mypage.charts.viewAll}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
