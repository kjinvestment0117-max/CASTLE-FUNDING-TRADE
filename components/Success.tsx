
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { PricingPlan } from '../types';

const Success: React.FC<{ plan: PricingPlan | null }> = ({ plan }) => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'creating' | 'ready'>('creating');
  const [method, setMethod] = useState<string | null>(null);

  useEffect(() => {
    // Parse method from hash or query
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    setMethod(params.get('method') || 'card');

    const timer = setTimeout(() => setStatus('ready'), 3500);
    return () => clearTimeout(timer);
  }, []);

  const isBank = method === 'bank';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#050505]">
      <div className="max-w-md w-full glass p-10 rounded-[40px] border border-white/5 text-center space-y-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#b8860b]/10 blur-[80px] rounded-full"></div>
        
        {status === 'creating' ? (
          <>
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-[#b8860b] border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-[#b8860b]/10 rounded-full flex items-center justify-center">
                <span className="text-xl">⚔️</span>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-castle font-black uppercase tracking-tight">
                {isBank ? "Waiting for Deposit" : "System Initialization"}
              </h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                {isBank ? "입금 확인 절차가 진행 중입니다." : "Generating Simulation Credentials..."}<br/>
                평균 소요 시간: {isBank ? "5~10분" : "15초 내외"}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-24 h-24 bg-[#b8860b]/20 text-[#b8860b] rounded-full flex items-center justify-center mx-auto text-4xl shadow-[0_0_50px_rgba(184,134,11,0.2)] border border-[#b8860b]/30 animate-in zoom-in duration-500">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-castle font-black uppercase tracking-tight castle-gradient">Provisioned!</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                {isBank ? "입금이 확인되었습니다. 챌린지가 활성화되었습니다." : "Evaluation account created. Trade immediately."}
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/5 space-y-4 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-4xl">👑</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">ACCOUNT ID</span>
                <span className="text-white font-mono font-bold">CT_774921_SIM</span>
              </div>
              <div className="h-px bg-white/5"></div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">PLATFORM</span>
                <span className="text-white font-bold">MetaTrader 5</span>
              </div>
              <div className="h-px bg-white/5"></div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">ENVIRONMENT</span>
                <span className="text-[#b8860b] font-bold italic uppercase">Castle-Futures-PRO</span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => window.location.hash = '#dashboard'}
                className="w-full btn-gold text-black py-6 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
              >
                Go to Dashboard
              </button>
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                상세 정보는 가입하신 이메일로도 발송되었습니다.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Success;
