
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { PricingPlan } from '../types';

declare global {
  interface Window {
    TossPayments: any;
    ethereum: any;
  }
}

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

          {/* Bank */}
          <button 
            onClick={() => setMethod('bank')}
            className={`p-6 rounded-3xl border flex items-center justify-between transition-all duration-300 ${
              method === 'bank' ? 'border-[#b8860b] bg-[#b8860b]/10 shadow-lg shadow-[#b8860b]/5' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${