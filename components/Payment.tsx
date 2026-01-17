
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { PricingPlan } from '../types';

const Payment: React.FC<{ plan: PricingPlan | null }> = ({ plan }) => {
  const { t } = useLanguage();
  const [method, setMethod] = useState('toss');

  if (!plan) return null;

  return (
    <div className="pt-32 pb-24 px-6 max-w-xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-castle font-black uppercase italic">Checkout</h2>
        <div className="glass p-6 rounded-3xl border border-white/5">
          <div className="text-xs text-gray-500 font-bold uppercase mb-2 tracking-widest">Total to Pay</div>
          <div className="text-3xl font-castle font-black castle-gradient">{plan.price}</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest ml-4">Select Payment Method</h3>
        <div className="grid grid-cols-1 gap-3">
          {['Toss Pay', 'Kakao Pay', 'Credit Card', 'USDT (TRC20)'].map((m) => (
            <button 
              key={m}
              onClick={() => setMethod(m.toLowerCase())}
              className={`p-6 rounded-2xl border flex items-center justify-between transition-all ${
                method === m.toLowerCase() ? 'border-[#b8860b] bg-[#b8860b]/5 shadow-2xl' : 'border-white/5 glass hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${method === m.toLowerCase() ? 'btn-gold text-black' : 'bg-white/10 text-white'}`}>
                  {m[0]}
                </div>
                <span className="font-bold">{m}</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === m.toLowerCase() ? 'border-[#b8860b]' : 'border-white/10'}`}>
                {method === m.toLowerCase() && <div className="w-3 h-3 bg-[#b8860b] rounded-full" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => window.location.hash = '#success'}
        className="w-full btn-gold text-black py-5 rounded-2xl font-black text-lg shadow-2xl transition-all active:scale-95 uppercase tracking-widest"
      >
        Complete Purchase
      </button>
      
      <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest italic">
        🔒 SECURE SSL 256-BIT ENCRYPTED TRANSACTION
      </p>
    </div>
  );
};

export default Payment;
