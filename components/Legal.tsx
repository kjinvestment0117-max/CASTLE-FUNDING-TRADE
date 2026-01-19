
import React from 'react';
import { useLanguage } from './LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-castle font-black uppercase tracking-tighter italic">Legal <span className="castle-gradient">Compliance</span></h1>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em]">Essential Information for Traders</p>
      </div>

      <div className="space-y-12">
        {/* Risk Disclosure */}
        <section className="glass p-10 rounded-[40px] border border-red-900/20 bg-red-900/5 space-y-6">
          <h2 className="text-2xl font-castle font-black uppercase text-red-500 flex items-center">
            <span className="mr-3">⚠️</span> Risk Disclosure
          </h2>
          <div className="text-sm text-gray-400 leading-relaxed space-y-4 font-medium">
            <p>
              <strong>1. High Risk Warning:</strong> Trading cryptocurrency futures involves substantial risk and is not suitable for every investor. An investor could potentially lose all or more than the initial investment. Risk capital is money that can be lost without jeopardizing ones’ financial security or life style.
            </p>
            <p>
              <strong>2. Simulation Environment:</strong> All accounts provided by CASTLE FUNDING are <strong>Demo Accounts</strong>. Trading occurs in a simulated environment. No actual live market execution is performed. Any "profits" or "balances" shown are virtual and represent simulation performance only.
            </p>
            <p>
              <strong>3. Not a Financial Institution:</strong> CASTLE FUNDING is a technology provider and evaluation firm. We do not provide investment advice, brokerage services, or financial consulting. We are not a bank or a licensed investment firm.
            </p>
          </div>
        </section>

        {/* Terms of Service */}
        <section className="glass p-10 rounded-[40px] border border-white/5 space-y-6">
          <h2 className="text-2xl font-castle font-black uppercase castle-gradient">Terms of Service</h2>
          <div className="text-sm text-gray-500 leading-relaxed space-y-6">
            <div className="space-y-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs">Section A: Evaluation Fees</h3>
              <p>
                The fee paid to CASTLE FUNDING is a <strong>Participation/Evaluation Fee</strong>. This fee covers the operational costs of the simulation environment, data feeds, and dashboard access. <strong>This is not a deposit</strong> and cannot be withdrawn as cash. Evaluation fees are generally non-refundable once trading activity has commenced.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs">Section B: Evaluation Rules</h3>
              <p>
                Traders must adhere to the Daily Loss (5%) and Max Trailing Drawdown (10%) limits. Violation of these rules results in immediate termination of the simulation account. Evaluation passing is subject to verification of trading behavior to ensure no prohibited HFT or arbitrage strategies were used.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-xs">Section C: Profit Split</h3>
              <p>
                Funded traders are eligible for a profit split of up to 90%. This reward is based on the performance demonstrated in the simulated environment. Payouts are processed via cryptocurrency (USDT) or bank transfer according to the schedule defined in the Trader Agreement.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center pt-8">
          <button 
            onClick={() => window.location.hash = '#challenges'}
            className="btn-gold text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Legal;
