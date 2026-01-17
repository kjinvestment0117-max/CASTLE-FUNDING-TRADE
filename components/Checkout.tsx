
import React, { useState } from 'react';
import { PricingPlan } from '../types';
import { useLanguage } from './LanguageContext';

interface CheckoutProps {
  plan: PricingPlan | null;
}

const Checkout: React.FC<CheckoutProps> = ({ plan }) => {
  const { t } = useLanguage();
  const [method, setMethod] = useState<'crypto' | 'card' | 'bank'>('crypto');

  if (!plan) {
    return (
      <div className="pt-32 text-center h-screen">
        <p className="text-gray-400 mb-4">No plan selected.</p>
        <a href="#purchase" className="text-[#b8860b] underline">Return to Pricing</a>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-castle font-black mb-4">
          {t.checkout.title} <span className="castle-gradient">{t.checkout.highlight}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Summary */}
        <div className="glass p-8 rounded-3xl h-fit">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-[#b8860b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {t.checkout.summary}
          </h3>
          <div className="space-y-4 border-b border-white/10 pb-6 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">{t.checkout.account}</span>
              <span className="font-bold text-white">{plan.accountSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.checkout.platform}</span>
              <span className="font-bold text-white">MetaTrader 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.checkout.fee}</span>
              <span className="font-bold text-white">{plan.price}</span>
            </div>
          </div>
          <div className="flex justify-between text-xl font-black">
            <span>Total</span>
            <span className="castle-gradient">{plan.price}</span>
          </div>
        </div>

        {/* Right: Payment Method */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold mb-4">{t.checkout.method}</h3>
          
          <button 
            onClick={() => setMethod('crypto')}
            className={`w-full flex items-center p-6 rounded-2xl border transition-all ${
              method === 'crypto' ? 'border-[#b8860b] bg-[#b8860b]/10' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mr-4">
              <span className="text-orange-500 font-bold">₿</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-white">{t.checkout.crypto}</div>
              <div className="text-xs text-gray-500">BTC, ETH, USDT (Instant)</div>
            </div>
          </button>

          <button 
            onClick={() => setMethod('card')}
            className={`w-full flex items-center p-6 rounded-2xl border transition-all ${
              method === 'card' ? 'border-[#b8860b] bg-[#b8860b]/10' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
              <span className="text-blue-500 font-bold">💳</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-white">{t.checkout.card}</div>
              <div className="text-xs text-gray-500">Visa, Mastercard, Amex</div>
            </div>
          </button>

          <button 
            onClick={() => setMethod('bank')}
            className={`w-full flex items-center p-6 rounded-2xl border transition-all ${
              method === 'bank' ? 'border-[#b8860b] bg-[#b8860b]/10' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
              <span className="text-green-500 font-bold">🏦</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-white">{t.checkout.bank}</div>
              <div className="text-xs text-gray-500">Direct wire transfer</div>
            </div>
          </button>

          <div className="pt-6 space-y-4">
            <button 
              onClick={() => window.location.hash = '#success'}
              className="w-full btn-gold text-black py-4 rounded-xl font-bold text-lg"
            >
              {t.checkout.confirm}
            </button>
            <button 
              onClick={() => window.location.hash = '#purchase'}
              className="w-full text-gray-500 hover:text-white transition-colors py-2"
            >
              {t.checkout.back}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
