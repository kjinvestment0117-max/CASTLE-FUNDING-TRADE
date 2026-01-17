
import React from 'react';
import { useLanguage } from './LanguageContext';

const Rules: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl lg:text-6xl font-castle font-black italic uppercase tracking-tighter">Trading <span className="castle-gradient">Objectives</span></h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em]">STRICT RISK COMPLIANCE FRAMEWORK</p>
      </div>

      {/* Objectives Table-style Grid */}
      <div className="glass rounded-[40px] border border-white/5 overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white/5 border-b border-white/5">
          <div className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center border-r border-white/5">Objective</div>
          <div className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center border-r border-white/5">Phase 1</div>
          <div className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center border-r border-white/5">Phase 2</div>
          <div className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Funded</div>
        </div>
        {[
          { label: "Trading Period", p1: "Indefinite", p2: "Indefinite", p3: "Indefinite" },
          { label: "Min Trading Days", p1: "5 Days", p2: "5 Days", p3: "None" },
          { label: "Max Daily Loss", p1: "5%", p2: "5%", p3: "5%" },
          { label: "Max Overall Loss", p1: "10%", p2: "10%", p3: "10%" },
          { label: "Profit Target", p1: "10%", p2: "5%", p3: "None" },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
            <div className="p-6 text-sm font-bold text-gray-400 border-r border-white/5">{row.label}</div>
            <div className="p-6 text-sm font-black text-center border-r border-white/5">{row.p1}</div>
            <div className="p-6 text-sm font-black text-center border-r border-white/5">{row.p2}</div>
            <div className="p-6 text-sm font-black text-center castle-gradient">{row.p3}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[32px] border border-white/5 space-y-6">
          <h4 className="text-xl font-castle font-black uppercase castle-gradient">Max Daily Loss</h4>
          <p className="text-sm text-gray-500 font-bold leading-relaxed">
            The daily loss limit is calculated based on the balance or equity at the start of the day (00:00 UTC). If your equity drops below this threshold at any point, the account is violated.
          </p>
        </div>
        <div className="glass p-10 rounded-[32px] border border-white/5 space-y-6">
          <h4 className="text-xl font-castle font-black uppercase castle-gradient">Trailing Drawdown</h4>
          <p className="text-sm text-gray-500 font-bold leading-relaxed">
            Our drawdown is trailing, meaning the maximum loss limit moves up as your account equity hits new highs. This ensures that you lock in your performance and trade responsibly.
          </p>
        </div>
      </div>

      <div className="glass p-12 rounded-[40px] border border-red-900/20 bg-red-900/5 space-y-8">
        <h3 className="text-2xl font-castle font-black uppercase text-red-500 flex items-center">
          <span className="mr-4 text-3xl">⚠️</span> PROHIBITED STRATEGIES
        </h3>
        <p className="text-sm font-bold leading-relaxed text-gray-400">
          CASTLE FUNDING aims to partner with genuine traders. The following exploitative behaviors will lead to immediate account termination without refund:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {[
            'HFT / Arbitrage', 
            'News Straddling', 
            'Account Sharing', 
            'Hedging (Same Pair)'
          ].map(tag => (
            <div key={tag} className="px-4 py-3 bg-red-900/20 text-red-500 text-[10px] font-black rounded-xl border border-red-500/20 text-center uppercase tracking-widest">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rules;
