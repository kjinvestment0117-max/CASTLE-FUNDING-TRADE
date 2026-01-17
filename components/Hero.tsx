
import React from 'react';
import { useLanguage } from './LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[#b8860b]/5 blur-[180px] rounded-full opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <div className="max-w-6xl w-full text-center space-y-10 relative z-10">
        <div className="inline-flex items-center space-x-3 glass border border-[#b8860b]/20 px-8 py-3 rounded-full shadow-2xl backdrop-blur-3xl animate-in slide-in-from-bottom duration-700">
          <span className="w-2.5 h-2.5 bg-[#b8860b] rounded-full shadow-[0_0_15px_#b8860b] animate-pulse"></span>
          <span className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.4em] text-[#b8860b]">INSTITUTIONAL EVALUATION ACTIVE</span>
        </div>
        
        <div className="flex flex-col items-center select-none animate-in fade-in duration-1000">
          <h1 className="text-[14vw] lg:text-[11rem] font-castle font-black leading-[0.8] tracking-tighter uppercase flex flex-col items-center">
            <span className="text-white/95">CASTLE</span>
            <span className="castle-gradient opacity-90 drop-shadow-[0_0_30px_rgba(184,134,11,0.2)]">FUNDING</span>
          </h1>
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-[#b8860b] blur-[60px] opacity-20"></div>
            <span className="relative bg-[#b8860b] text-black px-16 py-4 inline-block text-2xl lg:text-5xl font-castle font-black tracking-widest shadow-2xl transform hover:rotate-0 transition-transform cursor-default">
              PRO-PROP
            </span>
          </div>
        </div>
        
        <p className="text-lg lg:text-3xl text-gray-400 max-w-4xl mx-auto font-medium leading-relaxed tracking-tight italic pt-6 opacity-80">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center pt-10">
          <a 
            href="#challenges" 
            className="group relative px-24 py-7 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#f3d47a] to-[#b8860b] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
        </div>
      </div>

      {/* Subtle floor divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </section>
  );
};

export default Hero;
