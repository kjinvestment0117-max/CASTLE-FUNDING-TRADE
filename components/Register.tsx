
import React from 'react';
import { useLanguage } from './LanguageContext';

const Register: React.FC = () => {
  const { t } = useLanguage();

  const countries = [
    "South Korea", "United States", "United Kingdom", "Singapore", "Japan", "Germany", "France", "Canada", "Australia"
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-castle font-black mb-4 uppercase tracking-tighter">
          {t.register.title}
        </h1>
        <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">
          {t.register.subtitle}
        </p>
      </div>

      <form className="glass p-8 lg:p-12 rounded-[40px] border border-white/5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.register.firstName}</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" 
              placeholder="John"
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.register.lastName}</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" 
              placeholder="Doe"
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.register.email}</label>
          <input 
            type="email" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" 
            placeholder="john@example.com"
            required 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.register.country}</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all appearance-none cursor-pointer">
              {countries.map(country => (
                <option key={country} value={country} className="bg-[#050505]">{country}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.register.phone}</label>
            <input 
              type="tel" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" 
              placeholder="+82 10-0000-0000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.register.password}</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" 
              placeholder="••••••••"
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.register.confirmPassword}</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" 
              placeholder="••••••••"
              required 
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input type="checkbox" className="mt-1 accent-[#b8860b] w-4 h-4" required />
            <span className="text-[11px] font-bold text-gray-500 uppercase leading-relaxed group-hover:text-gray-300 transition-colors">
              {t.register.agreeTerms}
            </span>
          </label>
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input type="checkbox" className="mt-1 accent-[#b8860b] w-4 h-4" />
            <span className="text-[11px] font-bold text-gray-500 uppercase leading-relaxed group-hover:text-gray-300 transition-colors">
              {t.register.marketing}
            </span>
          </label>
        </div>

        <button 
          type="button"
          onClick={() => window.location.hash = '#challenges'}
          className="w-full btn-gold text-black py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95"
        >
          {t.register.submit}
        </button>

        <p className="text-center text-xs font-bold text-gray-600 uppercase tracking-widest pt-4">
          {t.register.hasAccount} <a href="#login" className="text-[#b8860b] hover:underline">{t.register.login}</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
