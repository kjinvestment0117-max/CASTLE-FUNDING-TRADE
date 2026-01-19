
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from './LanguageContext';
import { PricingPlan } from '../types';

const data = [
  { name: 'Day 1', equity: 100000 },
  { name: 'Day 2', equity: 102000 },
  { name: 'Day 3', equity: 101000 },
  { name: 'Day 4', equity: 105000 },
  { name: 'Day 5', equity: 108500 },
  { name: 'Day 6', equity: 107000 },
  { name: 'Day 7', equity: 112000 },
];

const ProgressBar: React.FC<{ 
  label: string; 
  current: number; 
  target: number; 
  type: 'profit' | 'risk';
  prefix?: string;
}> = ({ label, current, target, type, prefix = "$" }) => {
  const percentage = Math.max(0, Math.min(100, (current / target) * 100));
  const isWarning = type === 'risk' && percentage > 70;

  return (
    <div className="glass p-8 rounded-[32px] border border-white/5 space-y-6 transition-all hover:border-white/10 group">
      <div className="flex justify-between items-center">
        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</div>
        <div className={`text-[10px] font-bold uppercase tracking-tight ${type === 'profit' ? 'text-[#b8860b]' : isWarning ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
          {percentage.toFixed(1)}%
        </div>
      </div>
      <div className="space-y-3">
        <div className="text-2xl font-castle font-black text-white/90">
          {prefix}{current.toLocaleString()}
        </div>
        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              type === 'profit' 
                ? 'btn-gold shadow-[0_0_15px_rgba(184,134,11,0.4)]' 
                : isWarning ? 'bg-red-600' : 'bg-orange-500/50'
            }`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex justify-between">
          <span>Current</span>
          <span>Target: {prefix}{target.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ plan: PricingPlan | null }> = ({ plan }) => {
  const { t } = useLanguage();
  
  const accountSizeStr = plan ? plan.accountSize : '$100,000';
  const startBalance = parseInt(accountSizeStr.replace(/[^0-9]/g, ''));
  
  const rules = {
    profitTarget: 0.10, 
    maxDrawdown: 0.10,   
    dailyLoss: 0.05,    
    minDays: 5
  };

  // Mock Active Data
  const currentEquity = 112000;
  const peakEquity = 112000;
  const dayStartEquity = 107000;
  
  const profitEarned = currentEquity - startBalance;
  const targetProfit = startBalance * rules.profitTarget;

  const drawdownUsedAmount = peakEquity - currentEquity;
  const maxDrawdownLimit = peakEquity * rules.maxDrawdown;

  const dailyLossAmount = dayStartEquity - currentEquity;
  const dailyLossLimit = dayStartEquity * rules.dailyLoss;

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Sidebar */}
      <aside className="w-80 bg-[#050505] border-r border-white/5 hidden lg:flex flex-col p-8 space-y-12 shrink-0">
        <a href="#home" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 btn-gold rounded-xl flex items-center justify-center font-black text-black shadow-lg group-hover:scale-110 transition-transform">C</div>
          <div className="font-castle font-black text-xl tracking-tighter uppercase leading-none">CASTLE <br/><span className="castle-gradient">FUNDING</span></div>
        </a>
        
        <nav className="flex-1 space-y-1">
          {[
            { name: t.dashboard.sidebar.home, icon: '🏠', hash: '#dashboard', active: true },
            { name: t.dashboard.sidebar.challenges, icon: '⚔️', hash: '#dashboard' },
            { name: t.dashboard.sidebar.progress, icon: '📈', hash: '#dashboard' },
            { name: t.dashboard.sidebar.rules, icon: '📜', hash: '#rules' },
            { name: t.dashboard.sidebar.settings, icon: '⚙️', hash: '#dashboard' },
          ].map((item) => (
            <a 
              key={item.name} 
              href={item.hash} 
              className={`flex items-center space-x-4 p-4 rounded-2xl transition-all text-sm font-bold ${
                item.active ? 'bg-[#b8860b]/10 text-white border border-[#b8860b]/20 shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={item.active ? 'text-[#b8860b]' : 'opacity-60'}>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        
        <div className="glass p-8 rounded-[40px] border border-[#b8860b]/20 text-center space-y-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#b8860b]/10 blur-[40px] rounded-full"></div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">TRADER STATUS</div>
          <div className="text-2xl font-castle font-black castle-gradient uppercase italic tracking-widest">EVALUATION</div>
          <div className="h-px bg-white/5 w-full"></div>
          <button className="w-full py-3 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-[#b8860b] hover:text-black transition-all">Phase 1 Objective</button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 lg:p-12 space-y-12 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-castle font-black uppercase tracking-tighter italic">Evaluation <span className="castle-gradient">Workstation</span></h1>
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Account #9921: <span className="text-[#b8860b]">{accountSizeStr} KING CHALLENGE</span></span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-4 glass border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Rules Summary</button>
            <button 
              onClick={() => window.location.hash = '#terminal'}
              className="px-10 py-4 btn-gold text-black rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(184,134,11,0.3)] transition-all flex items-center hover:scale-105 active:scale-95"
            >
              <span className="mr-3">⚡</span> Open Terminal
            </button>
          </div>
        </div>

        {/* Evaluation Progress Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressBar 
            label="Profit Target" 
            current={profitEarned} 
            target={targetProfit} 
            type="profit" 
          />
          <ProgressBar 
            label="Trailing Drawdown" 
            current={drawdownUsedAmount} 
            target={maxDrawdownLimit} 
            type="risk" 
          />
          <ProgressBar 
            label="Daily Loss Limit" 
            current={dailyLossAmount} 
            target={dailyLossLimit} 
            type="risk" 
          />
          <div className="glass p-8 rounded-[32px] border border-white/5 space-y-6">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Trading Days</div>
            <div className="space-y-3">
              <div className="text-2xl font-castle font-black text-white/90">7 / 5 Days</div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
              </div>
              <div className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Objective Complete</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 glass p-10 rounded-[48px] border border-white/5 h-[500px] relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#b8860b]/5 blur-[100px] rounded-full"></div>
            <div className="flex justify-between items-center mb-12 relative z-10">
              <h3 className="text-2xl font-castle font-black uppercase italic castle-gradient tracking-tighter">Equity Performance</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-[10px] font-black text-gray-500 tracking-widest">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b8860b] shadow-[0_0_10px_#b8860b]"></span>
                  <span>Live Account Status</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b8860b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#b8860b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="name" hide />
                <YAxis stroke="#444" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#b8860b' }}
                />
                <Area type="monotone" dataKey="equity" stroke="#b8860b" fill="url(#colGold)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-8">
            <div className="glass p-10 rounded-[48px] border border-white/5 space-y-8 relative overflow-hidden h-full">
              <h3 className="text-xl font-castle font-black uppercase italic tracking-tight">Technical Spec</h3>
              <div className="space-y-5">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-[#b8860b]/30 transition-all">
                  <div className="text-[9px] font-black text-gray-500 uppercase mb-2 tracking-widest">Server Time (KST)</div>
                  <div className="font-mono text-[#b8860b] text-xl font-black">
                    {new Date().toLocaleTimeString('ko-KR', { hour12: false })}
                  </div>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-[#b8860b]/30 transition-all">
                  <div className="text-[9px] font-black text-gray-500 uppercase mb-2 tracking-widest">Data Source</div>
                  <div className="font-bold text-white uppercase text-xl tracking-tight">Binance Futures</div>
                </div>
                <div className="p-6 bg-[#b8860b]/5 rounded-[32px] border border-[#b8860b]/10 text-center">
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest italic mb-2">Evaluation Phase</div>
                  <div className="text-3xl font-black castle-gradient">Phase 1: Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
