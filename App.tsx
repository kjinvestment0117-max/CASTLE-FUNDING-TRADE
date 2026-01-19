
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import ChallengeApply from './components/ChallengeApply';
import Payment from './components/Payment';
import Success from './components/Success';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Rules from './components/Rules';
import PayoutInfo from './components/PayoutInfo';
import Payout from './components/Payout';
import Support from './components/Support';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Legal from './components/Legal';
import { LanguageProvider } from './components/LanguageContext';
import { PricingPlan } from './types';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#home');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentPath(hash);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    window.location.hash = '#apply';
  };

  const renderContent = () => {
    switch (currentPath) {
      case '#apply':
        return (
          <>
            <SEO title="Apply Challenge | Castle Funding" description="Select your evaluation plan and start your journey to becoming a funded trader." />
            <ChallengeApply plan={selectedPlan} />
          </>
        );
      case '#payment':
        return (
          <>
            <SEO title="Secure Checkout | Castle Funding" description="Safe and secure payment for your crypto prop trading challenge." />
            <Payment plan={selectedPlan} />
          </>
        );
      case '#success':
        return (
          <>
            <SEO title="Payment Success | Castle Funding" />
            <Success plan={selectedPlan} />
          </>
        );
      case '#register':
        return (
          <>
            <SEO title="Join Castle Funding | Create Account" description="Join the elite league of crypto prop traders and manage institutional capital." />
            <Register />
          </>
        );
      case '#dashboard':
      case '#mypage':
        return (
          <>
            <SEO title="Trader Dashboard | Castle Funding" description="Monitor your evaluation progress, equity growth, and trading rules." />
            <Dashboard plan={selectedPlan} />
          </>
        );
      case '#terminal':
        return (
          <>
            <SEO title="Live Trading Terminal | Castle Funding" description="Real-time Binance Futures feed for simulation-based trading." />
            <Terminal />
          </>
        );
      case '#intro':
        return (
          <>
            <SEO title="Program Introduction | Castle Funding" description="Learn how our professional trading evaluation works." />
            <PayoutInfo />
          </>
        );
      case '#rules':
        return (
          <>
            <SEO title="Trading Rules & Risk | Castle Funding" description="Understand our drawdown limits, profit targets, and compliance framework." />
            <Rules />
          </>
        );
      case '#payout':
        return (
          <>
            <SEO title="Payout Policy | Castle Funding" description="Flexible withdrawal methods and up to 90% profit sharing information." />
            <Payout />
          </>
        );
      case '#support':
        return (
          <>
            <SEO title="Support Center | Castle Funding" description="Need help? Contact our professional support team for assistance." />
            <Support />
          </>
        );
      case '#legal':
      case '#terms':
        return (
          <>
            <SEO title="Legal & Risk Disclosure | Castle Funding" description="Important legal terms, risk warnings, and simulation environment disclosures." />
            <Legal />
          </>
        );
      case '#challenges':
      case '#purchase':
        return (
          <>
            <SEO title="Choose Challenge Plan | Castle Funding" description="From $50k to $300k challenges. Pick the plan that fits your trading style." />
            <div className="pt-20"><Pricing onSelectPlan={handleSelectPlan} /></div>
          </>
        );
      case '#home':
      default:
        return (
          <div className="flex flex-col">
            <SEO 
              title="Castle Funding | Elite Crypto Prop Trading & Evaluation" 
              description="Master the markets with our Professional Funding Program. Up to $300k Challenge with zero time limits and high-speed execution." 
            />
            <Hero />
            <Pricing onSelectPlan={handleSelectPlan} />
          </div>
        );
    }
  };

  const isDashboardOrTerminal = currentPath === '#dashboard' || currentPath === '#terminal' || currentPath === '#mypage';

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-[#b8860b] selection:text-black font-sans antialiased`}>
      {!isDashboardOrTerminal && <Navbar currentPath={currentPath} />}
      <main className={`${isDashboardOrTerminal ? '' : 'pt-0'}`}>
        {renderContent()}
      </main>
      {!isDashboardOrTerminal && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
