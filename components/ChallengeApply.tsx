
import React from 'react';
import { useLanguage } from './LanguageContext';
import { PricingPlan } from '../types';

interface ChallengeApplyProps {
  plan: PricingPlan | null;
}

const ChallengeApply: React.FC<ChallengeApplyProps> = ({ plan }) => {
  const { t } = useLanguage();

  if (!plan) {
    window.location.hash = '#challenges';
    return null;
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Plan Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 glass p-8 rounded-3xl border border-white/5 space-y-6">
            <h3 className="text-xl font-castle font-bold border-b border-white/5 pb-4">Selected Challenge</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Plan</span>
                <span className="font-bold">{plan.name} {plan.accountSize}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform</span>
                <span className="font-bold">MetaTrader 5</span>
              </div>
              <div className="flex justify-between text-xl font-castle font-black pt-4 border-t border-white/5">
                <span>Fee</span>
                <span className="castle-gradient">{plan.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-castle font-black uppercase italic">{t.apply.title}</h2>
          <form className="glass p-8 lg:p-12 rounded-3xl border border-white/5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">{t.apply.form.name}</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-[#b8860b] outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">{t.apply.form.email}</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-[#b8860b] outline-none" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">{t.apply.form.country}</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-[#b8860b] outline-none appearance-none">
                  <option>South Korea</option>
                  <option>United States</option>
                  <option>Singapore</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">{t.apply.form.password}</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-[#b8860b] outline-none" required />
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pt-4">
              <input type="checkbox" id="agree" className="mt-1 accent-[#b8860b]" required />
              <label htmlFor="agree" className="text-sm text-gray-500 leading-relaxed cursor-pointer">{t.apply.form.agree}</label>
            </div>

            <button 
              type="button"
              onClick={() => window.location.hash = '#payment'}
              className="w-full btn-gold text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all"
            >
              {t.apply.form.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChallengeApply;
