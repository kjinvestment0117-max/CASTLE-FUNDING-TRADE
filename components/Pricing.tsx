
import React from 'react';
import { PricingPlan } from '../types';
import { useLanguage } from './LanguageContext';

const plans: PricingPlan[] = [
  { id: '50k', name: 'Squire', accountSize: '$50,000', price: '120,000 KRW', profitSplit: 'Target: 10%' },
  { id: '100k', name: 'Knight', accountSize: '$100,000', price: '220,000 KRW', profitSplit: 'Target: 10%', isPopular: true },
  { id: '150k', name: 'Commander', accountSize: '$150,000', price: '320,000 KRW', profitSplit: 'Target: 10%' },
  { id: '200k', name: 'Duke', accountSize: '$200,000', price: '420,000 KRW', profitSplit: 'Target: 10%' },
  { id: '300k', name: 'Monarch', accountSize: '$300,000', price: '620,000 KRW', profitSplit: 'Target: 10%' },
];

interface PricingProps {
  onSelectPlan?: (plan: PricingPlan) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const { t } = useLanguage();

  return (
    <section id="challenges" className="py-24 px-6 max-w-[1400px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-castle font-black mb-4 uppercase">
          {t.plans.title}
        </h2>
        <div className="h-1 w-24 btn-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative p-8 rounded-3xl border transition-all duration-300 group flex flex-col glass ${
              plan.isPopular ? 'border-[#b8860b] ring-1 ring-[#b8860b]/20 shadow-2xl shadow-[#b8860b]/5' : 'border-white/5'
            } hover:scale-[1.02]`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-gold text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                BEST VALUE
              </div>
            )}
            
            <h3 className="text-sm font-castle font-bold text-gray-500 uppercase tracking-widest mb-2">{plan.name}</h3>
            <div className={`text-4xl font-castle font-black mb-8 ${plan.isPopular ? 'castle-gradient' : ''}`}>{plan.accountSize}</div>
            
            <div className="space-y-4 mb-10 text-xs font-semibold text-gray-400">
              <div className="flex justify-between"><span>{t.plans.target}</span><span className="text-white">10%</span></div>
              <div className="flex justify-between"><span>{t.plans.drawdown}</span><span className="text-white">10%</span></div>
              <div className="flex justify-between"><span>{t.plans.days}</span><span className="text-white">5 Days</span></div>
            </div>

            <div className="mt-auto">
              <div className="text-xl font-castle font-black mb-6 text-white/90">{plan.price}</div>
              <button 
                onClick={() => onSelectPlan?.(plan)}
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                plan.isPopular ? 'btn-gold text-black' : 'bg-white/5 text-white hover:bg-white/10'
              }`}>
                {t.plans.start}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
