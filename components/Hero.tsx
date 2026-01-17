
import React from 'react';
import { useLanguage } from './LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 pt-32 lg:pt-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="w-full lg:w-1/2 z-10 text-center lg:text-left">
        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight font-castle">
          {t.hero.title1}<br />
          <span className="castle-gradient">{t.hero.title2}</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="#purchase" className="btn-gold text-black px-10 py-4 rounded-full font-bold text-lg w-full sm:w-auto">
            {t.hero.cta}
          </a>
          <a href="#payout" className="text-white hover:text-[#b8860b] transition-colors font-semibold flex items-center group">
            {t.hero.payoutMethods} 
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold castle-gradient">90%</div>
            <div className="text-xs uppercase tracking-widest text-gray-500">{t.hero.stats.split}</div>
          </div>
          <div>
            <div className="text-2xl font-bold castle-gradient">$300K</div>
            <div className="text-xs uppercase tracking-widest text-gray-500">{t.hero.stats.max}</div>
          </div>
          <div>
            <div className="text-2xl font-bold castle-gradient">24/7</div>
            <div className="text-xs uppercase tracking-widest text-gray-500">{t.hero.stats.support}</div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] mt-12 lg:mt-0 relative">
        <div className="absolute inset-0 z-0">
          <iframe 
            src='https://my.spline.design/40cryptocoinspackweb3library-BkLH6PhgeRATaBogL1yIqBgx/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="rounded-3xl"
          ></iframe>
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 glass rounded-full opacity-20 hidden lg:block"></div>
        <div className="absolute -top-10 -right-10 w-64 h-64 glass rounded-full opacity-10 hidden lg:block"></div>
      </div>
    </section>
  );
};

export default Hero;
