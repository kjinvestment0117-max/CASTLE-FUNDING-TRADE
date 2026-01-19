
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { PricingPlan } from '../types';

declare global {
  interface Window {
    TossPayments: any;
    ethereum: any;
  }
}

// Fixed missing closing braces and default export for Payment component
const Payment: React.FC<{ plan: PricingPlan | null }> = ({ plan }) => {
  const { t } = useLanguage();
  const [method, setMethod] = useState<'toss' | 'metamask' | 'bank'>('toss');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!plan) return null;

  const TOSS_CLIENT_KEY = 'test_ck_D5PzymXGRV9Bnj4M2zBa3ak9GW0B'; 
  const BANK_ACCOUNT = "1002-845-132604";
  const BANK_NAME = "우리은행 (Woori Bank)";
  const RECIPIENT = "정이태";

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_ACCOUNT.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTossPayment = async () => {
    if (typeof window.TossPayments === 'undefined') {
      alert("결제 시스템을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    
    try {
      setIsProcessing(true);
      const tossPayments = window.TossPayments(TOSS_CLIENT_KEY);
      await tossPayments.requestPayment('카드', {
        amount: parseInt(plan.price.replace(/[^0-9]/g, '')),
        orderId: `CASTLE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        orderName: `${plan.name} ${plan.accountSize} Challenge`,
        customerName: 'Castle Trader',
        successUrl: window.location.origin + '#success?method=card',
        failUrl: window.location.origin + '#payment',
      });
    } catch (err: any) {
      if (err.code !== 'USER_CANCEL') {
        alert("결제 중 오류가 발생했습니다. 고객센터로 문의 바랍니다.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsProcessing(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        alert("지갑 연결이 거부되었습니다.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert("메타마스크 지갑이 필요합니다.");
    }
  };

  const handleFinalPayment = () => {
    if (method === 'toss') handleTossPayment();
    else if (method === 'metamask') {
      if (!walletAddress) connectWallet();
      else {
        setIsProcessing(true);
        setTimeout(() => {
          window.location.hash = '#success?method=crypto';
          setIsProcessing(false);
        }, 2000);
      }
    }
    else if (method === 'bank') {
      setIsProcessing(true);
      setTimeout(() => {
        window.location.hash = '#success?method=bank';
        setIsProcessing(false);
      }, 1000);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-1 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/20 text-[10px] font-black text-[#b8860b] uppercase tracking-[0.2em] mb-2 animate-pulse">
          Secure Payment Gateway
        </div>
        <h2 className="text-3xl font-castle font-black uppercase italic tracking-tighter">Secure <span className="castle-gradient">Checkout</span></h2>
        <div className="glass p-8 rounded-[32px] border border-white/5 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8860b]/5 blur-[60px] rounded-full transition-all group-hover:bg-[#b8860b]/10"></div>
          <div className="relative z-10 space-y-2">
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">{t.checkout.fee}</div>
            <div className="text-5xl font-castle font-black castle-gradient">{plan.price}</div>
            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{plan.name} · {plan.accountSize}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">{t.checkout.method}</h3>
        <div className="grid grid-cols-1 gap-3">
          {/* Toss */}
          <button 
            onClick={() => setMethod('toss')}
            className={`p-6 rounded-3xl border flex items-center justify-between transition-all duration-300 ${
              method === 'toss' ? 'border-[#b8860b] bg-[#b8860b]/10 shadow-lg shadow-[#b8860b]/5' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${method === 'toss' ? 'btn-gold text-black scale-105 shadow-xl' : 'bg-white/10 text-white'}`}>
                <span className="font-black text-lg">T</span>
              </div>
              <div className="text-left">
                <span className="block font-black text-sm uppercase tracking-widest">Toss / Card</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">신용카드, 간편결제, 토스페이</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'toss' ? 'border-[#b8860b]' : 'border-white/10'}`}>
              {method === 'toss' && <div className="w-2.5 h-2.5 bg-[#b8860b] rounded-full" />}
            </div>
          </button>

          {/* Web3 / MetaMask */}
          <button 
            onClick={() => setMethod('metamask')}
            className={`p-6 rounded-3xl border flex items-center justify-between transition-all duration-300 ${
              method === 'metamask' ? 'border-[#b8860b] bg-[#b8860b]/10 shadow-lg shadow-[#b8860b]/5' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${method === 'metamask' ? 'btn-gold text-black scale-105 shadow-xl' : 'bg-white/10 text-white'}`}>
                <span className="font-black text-lg">W</span>
              </div>
              <div className="text-left">
                <span className="block font-black text-sm uppercase tracking-widest">Crypto Wallet</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">MetaMask, WalletConnect (USDT/ETH)</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'metamask' ? 'border-[#b8860b]' : 'border-white/10'}`}>
              {method === 'metamask' && <div className="w-2.5 h-2.5 bg-[#b8860b] rounded-full" />}
            </div>
          </button>

          {/* Bank */}
          <button 
            onClick={() => setMethod('bank')}
            className={`p-6 rounded-3xl border flex items-center justify-between transition-all duration-300 ${
              method === 'bank' ? 'border-[#b8860b] bg-[#b8860b]/10 shadow-lg shadow-[#b8860b]/5' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${method === 'bank' ? 'btn-gold text-black scale-105 shadow-xl' : 'bg-white/10 text-white'}`}>
                <span className="font-black text-lg">B</span>
              </div>
              <div className="text-left">
                <span className="block font-black text-sm uppercase tracking-widest">Bank Transfer</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">무통장 입금 (KRW)</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'bank' ? 'border-[#b8860b]' : 'border-white/10'}`}>
              {method === 'bank' && <div className="w-2.5 h-2.5 bg-[#b8860b] rounded-full" />}
            </div>
          </button>
        </div>
      </div>

      {method === 'bank' && (
        <div className="glass p-8 rounded-[32px] border border-white/5 space-y-6 animate-in slide-in-from-top duration-300">
          <h4 className="text-[10px] font-black text-[#b8860b] uppercase tracking-[0.2em]">{t.checkout.bank_info}</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase font-bold">{t.checkout.bank_name}</span>
              <span className="text-sm font-black">{BANK_NAME}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase font-bold">{t.checkout.account_number}</span>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-black">{BANK_ACCOUNT}</span>
                <button onClick={handleCopy} className="text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors uppercase font-black tracking-widest">
                  {copied ? 'COPIED!' : t.checkout.copy}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase font-bold">{t.checkout.depositor}</span>
              <span className="text-sm font-black">{RECIPIENT}</span>
            </div>
          </div>
          <p className="text-[9px] text-gray-500 font-bold uppercase text-center pt-4">입금 시 반드시 가입하신 성함으로 입금해 주세요.</p>
        </div>
      )}

      {method === 'metamask' && walletAddress && (
        <div className="glass p-6 rounded-[24px] border border-[#b8860b]/20 text-center space-y-2 animate-in fade-in">
          <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Connected Wallet</div>
          <div className="text-xs font-mono text-[#b8860b] truncate">{walletAddress}</div>
        </div>
      )}

      <div className="pt-6">
        <button 
          onClick={handleFinalPayment}
          disabled={isProcessing}
          className="w-full btn-gold text-black py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(184,134,11,0.2)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing Transaction...' : t.checkout.confirm}
        </button>
        <button 
          onClick={() => window.location.hash = '#apply'}
          className="w-full mt-4 text-gray-600 hover:text-white transition-colors py-2 text-[10px] font-black uppercase tracking-widest"
        >
          {t.checkout.back}
        </button>
      </div>
    </div>
  );
};

export default Payment;
