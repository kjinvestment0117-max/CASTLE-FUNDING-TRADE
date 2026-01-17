
import React from 'react';
import { PricingPlan } from '../types';
import { useLanguage } from './LanguageContext';

const plans: PricingPlan[] = [
  {
    id: '1',
    name: 'Pawn',
    accountSize: '$50,000',
    price: '95,000 KRW',
    profitSplit: 'up to 80%',
  },
  {
    id: '2',
    name: 'Knight',
    accountSize: '$100,000',
    price: '180,000 KRW',
    profitSplit: 'up to 85%',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Queen',
    accountSize: '$200,000',
    price: '340,000 KRW',
    profitSplit: 'up to 90%',
  },
  {
    id: '4',
    name: 'King',
    accountSize: '$300,000',
    price: '490,000 KRW',
    profitSplit: 'up to 90%',
  },
];

const Pricing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="purchase" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-castle font-black mb-4">
          {t.pricing.title} <span className="castle-gradient">{t.pricing.highlight}</span>
        </h2>
        <p className="text-gray-400">{t.pricing.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 group ${
              plan.isPopular ? 'glass ring-2 ring-[#b8860b] shadow-[0_0_30px_rgba(184,134,11,0.2)]' : 'glass'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 btn-gold text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                {t.pricing.popular}
              </div>
            )}
            
            <h3 className="text-xl font-castle font-bold text-gray-400 group-hover:text-white mb-2">{plan.name} Challenge</h3>
            <div className="text-3xl font-black mb-6 castle-gradient">{plan.accountSize}</div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm text-gray-300">
                <svg className="w-5 h-5 mr-3 text-[#b8860b]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 14.14L9 15.414l-3.707-3.707a1 1 0 011.414-1.414L9 12.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.pricing.features.split} {plan.profitSplit}
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <svg className="w-5 h-5 mr-3 text-[#b8860b]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 14.14L9 15.414l-3.707-3.707a1 1 0 011.414-1.414L9 12.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.pricing.features.noTime}
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <svg className="w-5 h-5 mr-3 text-[#b8860b]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 14.14L9 15.414l-3.707-3.707a1 1 0 011.414-1.414L9 12.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.pricing.features.drawdown}
              </div>
            </div>

            <div className="mt-auto">
              <div className="text-2xl font-bold mb-4">{plan.price}</div>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.isPopular ? 'btn-gold text-black' : 'bg-white/10 text-white hover:bg-white/20'
              }`}>
                {t.pricing.buy}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
