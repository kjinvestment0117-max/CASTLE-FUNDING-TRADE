
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

  if (!plan) return null;

  // Toss Payments Client Key (Test)
  const TOSS_CLIENT_KEY = 'test_ck_D5PzymXGRV9Bnj4M2zBa3ak9GW0B'; 
  
  const handleTossPayment = async () => {
    // Check if SDK is loaded
    if (typeof window.TossPayments === 'undefined') {
      alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 클릭해주세요.");
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
        successUrl: window.location.origin + '#success',
        failUrl: window.location.origin + '#payment',
      });
    } catch (err: any) {
      console.error("Toss Payment Error:", err);
      // Only alert if it's not a user cancellation
      if (err.code !== 'USER_CANCEL') {
        alert("결제 중 오류가 발생했습니다: " + (err.message || "알 수 없는 오류"));
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
        console.error("Wallet Connection Error:", err);
        alert("지갑 연결에 실패했습니다.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert("MetaMask가 설치되어 있지 않습니다. 브라우저 확장을 설치해주세요.");
    }
  };

  const handleMetaMaskPayment = async () => {
    if (!walletAddress) {
      await connectWallet();
      return;
    }

    try {
      setIsProcessing(true);
      // Simulate transaction request for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.hash = '#success';
    } catch (err) {
      console.error("MetaMask Payment Error:", err);
      alert("트랜잭션이 거부되었거나 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBankTransfer = () => {
    setIsProcessing(true);
    // Move to success page which handles the post-deposit verification notice
    setTimeout(() => {
      window.location.hash = '#success';
      setIsProcessing(false);
    }, 1000);
  };

  const handleFinalPayment = () => {
    if (method === 'toss') handleTossPayment();
    else if (method === 'metamask') handleMetaMaskPayment();
    else if (method === 'bank') handleBankTransfer();
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-castle font-black uppercase italic tracking-tighter">Secure <span className="castle-gradient">Checkout</span></h2>
        <div className="glass p-8 rounded-[32px] border border-white/5 space-y-2">
          <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">{t.checkout.fee}</div>
          <div className="text-4xl font-castle font-black castle-gradient">{plan.price}</div>
          <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{plan.name} {plan.accountSize}</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">{t.checkout.method}</h3>
        <div className="grid grid-cols-1 gap-4">
          {/* Toss Pay */}
          <button 
            onClick={() => setMethod('toss')}
            className={`p-6 rounded-3xl border flex items-center justify-between transition-all duration-300 ${
              method === 'toss' ? 'border-[#b8860b] bg-[#b8860b]/5 shadow-2xl' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${method === 'toss' ? 'btn-gold text-black scale-110' : 'bg-white/10 text-white'}`}>
                T
              </div>
              <div className="text-left">
                <span className="block font-black text-sm uppercase tracking-widest">Toss / Card</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">토스페이, 신용카드, 간편결제</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'toss' ? 'border-[#b8860b]' : 'border-white/10'}`}>
              {method === 'toss' && <div className="w-3 h-3 bg-[#b8860b] rounded-full" />}
            </div>
          </button>

          {/* Bank Transfer */}
          <button 
            onClick={() => setMethod('bank')}
            className={`p-6 rounded-3xl border flex items-center justify-between transition-all duration-300 ${
              method === 'bank' ? 'border-[#b8860b] bg-[#b8860b]/5 shadow-2xl' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${method === 'bank' ? 'btn-gold text-black scale-110' : 'bg-white/10 text-white'}`}>
                🏦
              </div>
              <div className="text-left">
                <span className="block font-black text-sm uppercase tracking-widest">{t.checkout.bank}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">우리은행, 직접 송금</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'bank' ? 'border-[#b8860b]' : 'border-white/10'}`}>
              {method === 'bank' && <div className="w-3 h-3 bg-[#b8860b] rounded-full" />}
            </div>
          </button>

          {/* MetaMask */}
          <button 
            onClick={() => setMethod('metamask')}
            className={`p-6 rounded-3xl border flex items-center justify-between transition-all duration-300 ${
              method === 'metamask' ? 'border-[#b8860b] bg-[#b8860b]/5 shadow-2xl' : 'border-white/5 glass hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${method === 'metamask' ? 'bg-[#f6851b] text-white scale-110' : 'bg-white/10 text-white'}`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Mirror_Logo.svg" className="w-6 h-6" alt="MetaMask" />
              </div>
              <div className="text-left">
                <span className="block font-black text-sm uppercase tracking-widest">MetaMask Wallet</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">
                  {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` : 'USDT / ETH / POLYGON'}
                </span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${method === 'metamask' ? 'border-[#b8860b]' : 'border-white/10'}`}>
              {method === 'metamask' && <div className="w-3 h-3 bg-[#b8860b] rounded-full" />}
            </div>
          </button>
        </div>
      </div>

      {/* Conditional Info Blocks */}
      {method === 'bank' && (
        <div className="glass p-8 rounded-3xl border border-[#b8860b]/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <h4 className="text-xs font-black text-[#b8860b] uppercase tracking-widest">{t.checkout.bank_info}</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold">{t.checkout.bank_name}</span>
              <span className="text-white font-black">우리은행 (Woori Bank)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold">{t.checkout.account_number}</span>
              <span className="text-white font-mono font-black">1002-845-132604</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold">{t.checkout.depositor}</span>
              <span className="text-white font-black">정이태</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 font-bold italic pt-2 leading-relaxed">
            * 입금 시 반드시 신청인 성함으로 입금해주세요. 입금 확인 후 10분 내로 계정이 활성화됩니다.
          </p>
        </div>
      )}

      {method === 'metamask' && !walletAddress && (
        <button 
          onClick={connectWallet}
          className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center space-x-3"
        >
          Connect MetaMask Wallet
        </button>
      )}

      <button 
        onClick={handleFinalPayment}
        disabled={isProcessing}
        className={`w-full py-6 rounded-[24px] font-black text-sm shadow-2xl transition-all active:scale-95 uppercase tracking-[0.3em] flex items-center justify-center ${
          isProcessing ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'btn-gold text-black'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Processing...
          </span>
        ) : (
          t.checkout.confirm
        )}
      </button>
      
      <div className="flex flex-col items-center space-y-4 pt-4">
        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] italic flex items-center">
          <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
          Bank-Grade SSL 256-Bit Encrypted Secure Checkout
        </p>
      </div>
    </div>
  );
};

export default Payment;
