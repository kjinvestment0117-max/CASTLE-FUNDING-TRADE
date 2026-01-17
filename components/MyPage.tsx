
import React, { useState } from 'react';
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

const calendarData = [
  { day: 1, pnl: 1200 }, { day: 2, pnl: 4500 }, { day: 3, pnl: -1200 },
  { day: 4, pnl: 0 }, { day: 5, pnl: 8900 }, { day: 6, pnl: -2300 },
  { day: 7, pnl: 5600 }, { day: 8, pnl: 1100 }, { day: 9, pnl: -500 },
  { day: 10, pnl: 4200 }, { day: 11, pnl: 1500 }, { day: 12, pnl: -3000 },
  { day: 13, pnl: 0 }, { day: 14, pnl: 0 }, { day: 15, pnl: 2100 },
  { day: 16, pnl: 3400 }, { day: 17, pnl: -1100 }, { day: 18, pnl: 0 },
  { day: 19, pnl: 5200 }, { day: 20, pnl: 4100 }, { day: 21, pnl: -900 },
  { day: 22, pnl: 2800 }, { day: 23, pnl: 0 }, { day: 24, pnl: 0 },
  { day: 25, pnl: 0 }, { day: 26, pnl: 0 }, { day: 27, pnl: 0 },
  { day: 28, pnl: 0 }, { day: 29, pnl: 0 }, { day: 30, pnl: 0 },
];

const trades = [
  { id: '1', pair: 'EURUSD', type: 'BUY', profit: 4200, status: 'CLOSED', date: '2024-05-20' },
  { id: '2', pair: 'BTCUSD', type: 'SELL', profit: -1200, status: 'CLOSED', date: '2024-05-21' },
  { id: '3', pair: 'NAS100', type: 'BUY', profit: 8500, status: 'OPEN', date: '2024-05-22' },
  { id: '4', pair: 'XAUUSD', type: 'BUY', profit: 2100, status: 'CLOSED', date: '2024-05-22' },
];

const MyPage: React.FC = () => {
  const { t } = useLanguage();
  const accountSize = 300000;
  const currentEquity = 328000;
  const targetProfit = 330000; // Phase 1: 10% target
  const maxLossLimit = 270000; // 10% max drawdown
  const dailyLossLimit = 311600; // 5% daily from start of day

  const targetProgress = ((currentEquity - accountSize) / (targetProfit - accountSize)) * 100;
  const lossRemaining = currentEquity - maxLossLimit;
  const dailyLossRemaining = currentEquity - dailyLossLimit;

  return (
    <div className="pt-28 pb-12 px-6 max-w-7xl mx-auto space-y-8">
      {/* Header & Phase Stepper */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-castle font-black">{t.mypage.title}</h1>
          <p className="text-gray-400">Account #774921 - <span className="text-[#b8860b] font-bold">$300,000 King Challenge</span></p>
        </div>
        
        <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 overflow-x-auto">
          <div className="flex items-center space-x-3 whitespace-nowrap">
            <div className="w-8 h-8 rounded-full bg-[#b8860b] text-black flex items-center justify-center font-bold">1</div>
            <span className="text-sm font-bold text-white">{t.mypage.phase1}</span>
          </div>
          <div className="w-8 h-px bg-white/20"></div>
          <div className="flex items-center space-x-3 opacity-40 whitespace-nowrap">
            <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">2</div>
            <span className="text-sm font-bold">{t.mypage.phase2}</span>
          </div>
          <div className="w-8 h-px bg-white/20"></div>
          <div className="flex items-center space-x-3 opacity-40 whitespace-nowrap">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 text-white flex items-center justify-center font-bold">👑</div>
            <span className="text-sm font-bold">{t.mypage.funded}</span>
          </div>
        </div>
      </div>

      {/* Main Stats Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Target Profit Gauge */}
        <div className="glass p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">{t.mypage.targetRemaining}</span>
            <span className="text-[#b8860b] font-black">${(targetProfit - currentEquity).toLocaleString()}</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full btn-gold transition-all duration-1000 ease-out" 
              style={{ width: `${Math.min(100, targetProgress)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
            <span>START: $300,000</span>
            <span>GOAL: $330,000</span>
          </div>
        </div>

        {/* Max Loss Gauge */}
        <div className="glass p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">{t.mypage.lossRemaining}</span>
            <span className="text-red-500 font-black">${lossRemaining.toLocaleString()}</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 transition-all duration-1000 ease-out" 
              style={{ width: `${(lossRemaining / (currentEquity - maxLossLimit + 10000)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
            <span>LIMIT: $270,000</span>
            <span className="text-red-500/50">CRITICAL</span>
          </div>
        </div>

        {/* Daily Loss Gauge */}
        <div className="glass p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">{t.mypage.dailyLossRemaining}</span>
            <span className="text-orange-500 font-black">${dailyLossRemaining.toLocaleString()}</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-1000 ease-out" 
              style={{ width: `${(dailyLossRemaining / (currentEquity - dailyLossLimit + 5000)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
            <span>RESET: 00:00 UTC</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Equity Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-3xl h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-castle font-bold text-xl">{t.mypage.charts.equity}</h3>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="w-3 h-3 rounded-full bg-[#b8860b]"></span>
                  <span>Equity</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#b8860b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#b8860b' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="equity" 
                  stroke="#b8860b" 
                  fillOpacity={1} 
                  fill="url(#colorEquity)" 
                  strokeWidth={3}
                  isAnimationActive={true} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Calendar View */}
          <div className="glass p-8 rounded-3xl">
            <h3 className="font-castle font-bold text-xl mb-6">{t.mypage.calendarTitle}</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center text-[10px] text-gray-500 font-bold uppercase mb-2">{day}</div>
              ))}
              {calendarData.map((item) => (
                <div 
                  key={item.day} 
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center relative border transition-all hover:scale-105 ${
                    item.pnl > 0 ? 'bg-green-500/10 border-green-500/20' : 
                    item.pnl < 0 ? 'bg-red-500/10 border-red-500/20' : 
                    'bg-white/5 border-white/10'
                  }`}
                >
                  <span className="text-[10px] text-gray-500 absolute top-1 left-1">{item.day}</span>
                  {item.pnl !== 0 && (
                    <span className={`text-[10px] font-bold ${item.pnl > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.pnl > 0 ? '+' : ''}{Math.abs(item.pnl / 100).toFixed(1)}k
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Recent Trades & Stats */}
        <div className="space-y-8">
          <div className="glass p-6 rounded-3xl">
            <h3 className="font-castle font-bold text-lg mb-6">{t.mypage.charts.recent}</h3>
            <div className="space-y-4">
              {trades.map(trade => (
                <div key={trade.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                  <div>
                    <div className="font-bold flex items-center text-sm">
                      {trade.pair}
                      <span className={`ml-2 text-[8px] px-2 py-0.5 rounded-full font-black ${trade.type === 'BUY' ? 'bg-green-500 text-black' : 'bg-red-500 text-black'}`}>
                        {trade.type}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">{trade.date}</div>
                  </div>
                  <div className={`font-black text-sm ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.profit >= 0 ? '+' : ''}{trade.profit.toLocaleString()}$
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-colors">
              {t.mypage.charts.viewAll}
            </button>
          </div>

          <div className="glass p-8 rounded-3xl space-y-6">
            <div className="text-center">
              <div className="text-gray-500 text-xs font-bold uppercase mb-2">Total Profit Share</div>
              <div className="text-4xl font-black castle-gradient">$22,500.00</div>
              <div className="text-gray-500 text-[10px] mt-2 uppercase tracking-widest">{t.mypage.stats.estimated}</div>
            </div>
            <a href="#payout" className="block w-full text-center py-4 btn-gold text-black rounded-2xl font-black text-sm uppercase tracking-widest">
              Request Payout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
