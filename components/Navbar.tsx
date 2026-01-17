
import React from 'react';
import { useLanguage } from './LanguageContext';

interface NavbarProps {
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center space-x-2">
          <div className="w-10 h-10 btn-gold flex items-center justify-center rounded-lg">
            <span className="text-black font-castle font-black text-xl">C</span>
          </div>
          <div className="font-castle font-black text-2xl tracking-tighter">
            CASTLE <span className="castle-gradient">FUNDING</span>
          </div>
        </a>
        
        <div className="hidden md:flex items-center space-x-8 font-medium">
          <a href="#purchase" className={`hover:text-[#b8860b] transition-colors ${currentPath === '#purchase' ? 'castle-gradient' : ''}`}>
            {t.nav.purchase}
          </a>
          <a href="#payout" className={`hover:text-[#b8860b] transition-colors ${currentPath === '#payout' ? 'castle-gradient' : ''}`}>
            {t.nav.payout}
          </a>
          
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs rounded-full transition-all ${language === 'en' ? 'btn-gold text-black font-bold' : 'text-gray-500'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('ko')}
              className={`px-3 py-1 text-xs rounded-full transition-all ${language === 'ko' ? 'btn-gold text-black font-bold' : 'text-gray-500'}`}
            >
              KO
            </button>
          </div>

          <a 
            href="#mypage" 
            className="px-6 py-2 border border-[#b8860b] text-[#b8860b] rounded-full hover:bg-[#b8860b] hover:text-black transition-all duration-300 font-bold"
          >
            {t.nav.mypage}
          </a>
        </div>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
