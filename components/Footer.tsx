
import React from 'react';
import { useLanguage } from './LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const links = [
    { label: t.nav.intro, hash: '#intro' },
    { label: t.nav.challenges, hash: '#challenges' },
    { label: t.nav.rules, hash: '#rules' },
    { label: t.nav.payout, hash: '#payout' },
    { label: t.nav.support, hash: '#support' },
  ];

  return (
    <footer className="relative bg-[#050505] pt-32 pb-16 px-6 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#b8860b]/5 blur-[150px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
        <div className="col-span-1 lg:col-span-2 space-y-10">
          <div className="font-castle font-black text-3xl tracking-tighter uppercase flex items-center group cursor-default">
            <div className="w-11 h-11 btn-gold flex items-center justify-center rounded-xl mr-4 shadow-lg">C</div>
            CASTLE <span className="castle-gradient ml-2">FUNDING</span>
          </div>
          <p className="text-gray-500 max-w-md leading-relaxed text-sm font-medium italic opacity-80">
            {t.footer.desc}
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-[#b8860b] transition-all transform hover:scale-110"><span className="sr-only">X</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" className="text-gray-500 hover:text-[#b8860b] transition-all transform hover:scale-110"><span className="sr-only">Instagram</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>
        </div>

        <div>
          <h4 className="font-castle font-black text-lg uppercase tracking-wider mb-8 text-white">{t.footer.quickLinks}</h4>
          <ul className="space-y-5">
            {links.map(link => (
              <li key={link.hash}><a href={link.hash} className="text-gray-500 hover:text-[#b8860b] transition-all font-bold text-xs uppercase tracking-[0.2em]">{link.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-castle font-black text-lg uppercase tracking-wider mb-8 text-white">{t.footer.support}</h4>
          <ul className="space-y-5">
            <li><a href="#support" className="text-gray-500 hover:text-[#b8860b] transition-all font-bold text-xs uppercase tracking-[0.2em]">Help Center</a></li>
            <li><a href="#rules" className="text-gray-500 hover:text-[#b8860b] transition-all font-bold text-xs uppercase tracking-[0.2em]">Terms & Risk</a></li>
            <li><a href="#register" className="text-[#b8860b] hover:text-white transition-all font-bold text-xs uppercase tracking-[0.2em] animate-pulse">Join the Elite</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="text-[9px] text-gray-600 font-bold leading-relaxed uppercase tracking-widest text-left">
            {t.footer.disclaimer}
          </div>
          <div className="flex flex-col lg:items-end space-y-2 text-[9px] text-gray-500 font-black uppercase tracking-widest">
            <div>주식회사 캐슬펀딩코리아 | 대표자: 정이태</div>
            <div>사업자등록번호: 251-86-02741 | 통신판매업신고: 제2024-서울강남-1204호</div>
            <div>서울특별시 강남구 테헤란로 427, 14층 (삼성동, 현대타워)</div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-[9px] font-black uppercase tracking-[0.3em]">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
