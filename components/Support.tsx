
import React from 'react';
import { useLanguage } from './LanguageContext';

const Support: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-16">
      <div className="text-center">
        <h2 className="text-4xl font-castle font-black mb-4 uppercase">
          {t.support.title} <span className="castle-gradient">{t.support.highlight}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="glass p-10 rounded-[40px] space-y-8 border border-white/5">
          <h3 className="text-2xl font-castle font-bold mb-4 uppercase">Direct Inquiry</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.support.name}</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.support.email}</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.support.message}</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#b8860b] transition-all" />
            </div>
            <button className="w-full btn-gold text-black py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all">
              {t.support.send}
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          <h3 className="text-2xl font-castle font-bold mb-4 uppercase">{t.support.faq}</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <details key={i} className="group glass rounded-[32px] border border-white/5 transition-all">
                <summary className="p-8 cursor-pointer list-none flex justify-between items-center font-bold">
                  <span className="text-sm">How long does verification take?</span>
                  <svg className="w-5 h-5 text-[#b8860b] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-8 pb-8 text-gray-500 text-xs leading-relaxed font-semibold uppercase tracking-wide">
                  Account provisioning is nearly instantaneous. Formal evaluation verification of phase completion takes approximately 24-48 business hours.
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
