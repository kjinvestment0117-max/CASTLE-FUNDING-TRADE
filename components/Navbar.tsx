
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface NavbarProps {
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: t.nav.intro, hash: '#intro' },
    { name: t.nav.challenges, hash: '#challenges' },
    { name: t.nav.rules, hash: '#rules' },
    { name: t.nav.payout, hash: '#payout' },
    { name: t.nav.support, hash: '#support' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" onClick={closeMenu} className="flex items-center space-x-3 group">
          <div className="w-11 h-11 btn-gold flex items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-105">
            <span className="text-black font-castle font-black text-2xl">C</span>
          </div>
          <div className="font-castle font-black text-2xl tracking-tighter uppercase leading-none">
            CASTLE <br className="lg:hidden" /> <span className="castle-gradient">FUNDING</span>
          </div>
        </a>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 font-bold text-[11px] uppercase tracking-widest text-gray-400">
          {navLinks.map((link) => (
            <a 
              key={link.hash} 
              href={link.hash} 
              className={`hover:text-white transition-colors relative group py-2 ${currentPath === link.hash ? 'text-[#b8860b]' : ''}`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#b8860b] transition-all duration-300 ${currentPath === link.hash ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
          
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 ml-4">
            <button 
              onClick={() => setLanguage('en')} 
              className={`px-3 py-1 text-[9px] rounded-full transition-all ${language === 'en' ? 'btn-gold text-black' : 'hover:text-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('ko')} 
              className={`px-3 py-1 text-[9px] rounded-full transition-all ${language === 'ko' ? 'btn-gold text-black' : 'hover:text-white'}`}
            >
              KO
            </button>
          </div>

          <div className="flex items-center space-x-6 border-l border-white/10 pl-8">
            <a 
              href="#register" 
              className={`hover:text-white transition-colors ${currentPath === '#register' ? 'text-white' : ''}`}
            >
              {t.nav.signup}
            </a>
            <a 
              href="#dashboard" 
              className="px-8 py-3 btn-gold text-black rounded-full shadow-[0_10px_20px_rgba(184,134,11,0.2)] hover:shadow-[0_15px_30px_rgba(184,134,11,0.3)]"
            >
              {t.nav.mypage}
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2 glass rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#050505] flex flex-col p-8 pt-24 space-y-6 animate-in fade-in duration-300">
          <button className="absolute top-6 right-6 p-2" onClick={closeMenu}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {navLinks.map((link) => (
            <a key={link.hash} href={link.hash} onClick={closeMenu} className="text-3xl font-castle font-black uppercase hover:text-[#b8860b] transition-colors">{link.name}</a>
          ))}
          <div className="h-px bg-white/10 w-full my-4"></div>
          <a href="#register" onClick={closeMenu} className="text-2xl font-bold text-gray-400">{t.nav.signup}</a>
          <a href="#dashboard" onClick={closeMenu} className="text-3xl font-castle font-black castle-gradient">{t.nav.mypage}</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
