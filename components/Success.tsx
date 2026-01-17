
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { PricingPlan } from '../types';

const Success: React.FC<{ plan: PricingPlan | null }> = ({ plan }) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'creating' | 'ready'>('creating');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('ready'), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#050505]">
      <div className="max-w-md w-full glass p-10 rounded-[40px] border border-white/5 text-center space-y-8">
        {status === 'creating' ? (
          <>
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-[#b8860b] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-castle font-black uppercase tracking-tight">System Initialization</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                Generating Simulation Credentials...<br/>Estimated time: 5-30 seconds
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-[#b8860b]/20 text-[#b8860b] rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce shadow-2xl shadow-[#b8860b]/10 border border-[#b8860b]/20">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-castle font-black uppercase tracking-tight castle-gradient">Provisioned!</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                Evaluation account created.<br/>You may commence trading immediately.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-3 text-left">
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-black tracking-widest">
                <span>ACCOUNT ID</span>
                <span className="text-white">CT_774921_SIM</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-black tracking-widest">
                <span>EXCHANGE</span>
                <span className="text-white">MetaTrader 5</span>
              </div>
            </div>
            <button 
              onClick={() => window.location.hash = '#dashboard'}
              className="w-full btn-gold text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Success;
