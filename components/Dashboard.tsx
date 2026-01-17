
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
];

const Dashboard: React.FC<{ plan: PricingPlan | null }> = ({ plan }) => {
  const { t } = useLanguage();
  const accSize = plan ? plan.accountSize : '$50,000';
  
  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#050505] border-r border-white/5 hidden lg:flex flex-col p-8 space-y-12">
        <a href="#home" className="flex items-center space-x-2">
          <div className="w-9 h-9 btn-gold rounded-lg flex items-center justify-center font-black text-black">C</div>
          <div className="font-castle font-black text-lg tracking-tighter uppercase">CASTLE <span className="castle-gradient">FUNDING</span></div>
        </a>
        
        <nav className="flex-1 space-y-2">
          {[
            { name: t.dashboard.sidebar.home, icon: '🏠', hash: '#dashboard' },
            { name: t.dashboard.sidebar.challenges, icon: '🛡️', hash: '#dashboard' },
            { name: t.dashboard.sidebar.progress, icon: '📊', hash: '#dashboard' },
            { name: t.dashboard.sidebar.rules, icon: '📜', hash: '#rules' },
            { name: t.dashboard.sidebar.settings, icon: '⚙️', hash: '#dashboard' },
          ].map((item) => (
            <a key={item.name} href={item.hash} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-sm font-bold text-gray-500 hover:text-white">
              <span className="opacity-60">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        
        <div className="glass p-6 rounded-[32px] border border-[#b8860b]/20 text-center space-y-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">ACCOUNT STATUS</div>
          <div className="text-xl font-castle font-black castle-gradient uppercase">Evaluation</div>
          <button className="w-full py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">View Full Policy</button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 lg:p-12 space-y-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-castle font-black uppercase tracking-tight">{t.mypage.title}</h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Active Challenge: <span className="text-[#b8860b]">{accSize} KING CHALLENGE</span></p>
          </div>
          <button 
            onClick={() => window.location.hash = '#terminal'}
            className="px-10 py-4 btn-gold text-black rounded-full font-black text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center"
          >
            <span className="mr-3">⚡</span> {t.dashboard.account.start}
          </button>
        </div>

        {/* Progress Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: t.dashboard.gauges.profit, value: '85%', color: 'btn-gold', target: '$5,000' },
            { label: t.dashboard.gauges.drawdown, value: '12%', color: 'bg-red-500/50', target: '$45,000' },
            { label: t.dashboard.gauges.daily, value: '25%', color: 'bg-orange-500/50', target: '$47,500' },
            { label: t.dashboard.gauges.days, value: '60%', color: 'bg-white/20', target: '5/5 Days' },
          ].map((g) => (
            <div key={g.label} className="glass p-6 rounded-3xl border border-white/5 space-y-4 transition-transform hover:scale-[1.03]">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{g.label}</div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${g.color} transition-all duration-1000 ease-out`} style={{ width: g.value }}></div>
              </div>
              <div className="text-xl font-castle font-black text-white/90">{g.target}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass p-8 rounded-[40px] border border-white/5 h-[450px]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-castle font-black uppercase italic castle-gradient">{t.mypage.charts.equity}</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-[10px] font-black text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#b8860b]"></span>
                  <span>EQUITY</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#b8860b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis stroke="#444" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '16px' }} />
                <Area type="monotone" dataKey="equity" stroke="#b8860b" fill="url(#colGold)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
            <h3 className="text-xl font-castle font-black uppercase italic">Account Data</h3>
            <div className="space-y-4">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">{t.dashboard.account.id}</div>
                <div className="font-mono text-[#b8860b] text-lg font-black">CT_9921_SIM</div>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">{t.dashboard.account.platform}</div>
                <div className="font-bold text-white uppercase text-lg">MetaTrader 5</div>
              </div>
              <div className="text-[11px] text-gray-500 font-bold leading-relaxed bg-[#b8860b]/5 p-6 rounded-3xl border border-[#b8860b]/10 italic">
                💡 <span className="text-[#b8860b] uppercase">Evaluation Protocol:</span> Simulation only. All trades are monitored for rule compliance automatically.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
