
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
import { LanguageProvider } from './components/LanguageContext';
import { PricingPlan } from './types';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#home');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentPath(hash);
      // Ensure we always start at the top of a new view
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    window.location.hash = '#apply';
  };

  const renderContent = () => {
    // Navigation routing logic
    switch (currentPath) {
      case '#apply':
        return <ChallengeApply plan={selectedPlan} />;
      case '#payment':
        return <Payment plan={selectedPlan} />;
      case '#success':
        return <Success plan={selectedPlan} />;
      case '#register':
        return <Register />;
      case '#dashboard':
      case '#mypage':
        return <Dashboard plan={selectedPlan} />;
      case '#terminal':
        return <Terminal />;
      case '#intro':
        return <PayoutInfo />;
      case '#rules':
        return <Rules />;
      case '#payout':
        return <Payout />;
      case '#support':
        return <Support />;
      case '#challenges':
      case '#purchase':
        return <div className="pt-20"><Pricing onSelectPlan={handleSelectPlan} /></div>;
      case '#home':
      default:
        return (
          <div className="flex flex-col">
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
