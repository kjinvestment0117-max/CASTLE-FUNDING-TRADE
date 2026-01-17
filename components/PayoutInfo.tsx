
import React from 'react';
import { useLanguage } from './LanguageContext';

const PayoutInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto space-y-20">
      <div className="text-center space-y-6">
        <h2 className="text-4xl lg:text-6xl font-castle font-black italic uppercase tracking-tighter">
          The <span className="castle-gradient">Evaluation</span> Process
        </h2>
        <p className="text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed text-xs uppercase tracking-[0.3em]">
          YOUR JOURNEY TO BECOMING A FUNDED CASTLE TRADER
        </p>
      </div>

      {/* 3-Step Process Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Connection Lines (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#b8860b]/30 to-transparent -z-10"></div>
        
        {[
          {
            step: "01",
            title: "The Challenge",
            desc: "Demonstrate your skills. Reach a 10% profit target while respecting drawdown limits. Minimum 5 trading days.",
            icon: "⚔️",
            badge: "PHASE 1"
          },
          {
            step: "02",
            title: "Verification",
            desc: "Consistency is key. Prove your performance over another evaluation period with a reduced profit target of 5%.",
            icon: "🛡️",
            badge: "PHASE 2"
          },
          {
            step: "03",
            title: "Funded Trader",
            desc: "Trade our capital. Earn up to 90% of the profits. No profit targets, just maintain risk management.",
            icon: "👑",
            badge: "CASTLE TRADER"
          }
        ].map((item, idx) => (
          <div key={idx} className="glass p-10 rounded-[40px] border border-white/5 space-y-6 flex flex-col items-center text-center group hover:border-[#b8860b]/40 transition-all duration-500">
            <div className="w-16 h-16 btn-gold text-black rounded-full flex items-center justify-center text-2xl font-castle font-bold shadow-xl shadow-[#b8860b]/20 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black text-[#b8860b] uppercase tracking-widest">{item.badge}</span>
              <h3 className="text-2xl font-castle font-black uppercase">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-semibold">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="glass p-12 rounded-[50px] border border-[#b8860b]/30 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b8860b]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-castle font-black uppercase tracking-tight italic">WHY CHOOSE CASTLE?</h3>
            <ul className="space-y-4">
              {[
                "Profit split up to 90%",
                "No minimum time limit to pass",
                "Bi-weekly payouts available",
                "Advanced trading dashboard & analytics",
                "24/7 Professional support"
              ].map(feat => (
                <li key={feat} className="flex items-center space-x-3 text-sm font-bold text-gray-400">
                  <span className="text-[#b8860b]">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#b8860b]/5 p-8 rounded-3xl border border-[#b8860b]/20 text-center">
            <p className="text-lg font-bold leading-relaxed castle-gradient italic mb-8">
              “We don't just provide capital; we provide the ecosystem for professional growth.”
            </p>
            <a href="#challenges" className="btn-gold text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-xs inline-block">
              Start Evaluation Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutInfo;
