
import React from 'react';
import { useLanguage } from './LanguageContext';

const Payout: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-12 px-6 max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-castle font-black mb-4">
          {t.payout.title} <span className="castle-gradient">{t.payout.highlight}</span>
        </h1>
        <p className="text-gray-400">{t.payout.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl border-l-4 border-yellow-600">
          <h3 className="text-xl font-bold mb-4">{t.payout.splitTitle}</h3>
          <p className="text-gray-400 leading-relaxed">
            {t.payout.splitDesc}
          </p>
        </div>
        <div className="glass p-8 rounded-2xl border-l-4 border-yellow-600">
          <h3 className="text-xl font-bold mb-4">{t.payout.timeTitle}</h3>
          <p className="text-gray-400 leading-relaxed">
            {t.payout.timeDesc}
          </p>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl space-y-8">
        <h3 className="text-2xl font-castle font-bold text-center">{t.payout.methods}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center space-y-2 p-4 glass rounded-xl">
            <div className="w-12 h-12 bg-blue-500/20 flex items-center justify-center rounded-full text-blue-400 font-bold">Bank</div>
            <span className="text-sm">Wire Transfer</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 glass rounded-xl">
            <div className="w-12 h-12 bg-green-500/20 flex items-center justify-center rounded-full text-green-400 font-bold">USDT</div>
            <span className="text-sm">Tether (TRC20)</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 glass rounded-xl">
            <div className="w-12 h-12 bg-orange-500/20 flex items-center justify-center rounded-full text-orange-400 font-bold">BTC</div>
            <span className="text-sm">Bitcoin</span>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 glass rounded-xl">
            <div className="w-12 h-12 bg-purple-500/20 flex items-center justify-center rounded-full text-purple-400 font-bold">Cards</div>
            <span className="text-sm">Visa / Master</span>
          </div>
        </div>
      </div>

      <div className="text-center p-12 glass rounded-3xl bg-gradient-to-br from-[#111] to-[#050505]">
        <h3 className="text-2xl font-bold mb-4">{t.payout.ready}</h3>
        <p className="text-gray-400 mb-8">{t.payout.readyDesc}</p>
        <a href="#purchase" className="btn-gold text-black px-12 py-4 rounded-full font-bold">
          {t.payout.cta}
        </a>
      </div>
    </div>
  );
};

export default Payout;
