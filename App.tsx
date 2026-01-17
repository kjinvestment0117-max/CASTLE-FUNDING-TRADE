
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import MyPage from './components/MyPage';
import Payout from './components/Payout';
import Footer from './components/Footer';
import { LanguageProvider } from './components/LanguageContext';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPath) {
      case '#mypage':
        return <MyPage />;
      case '#payout':
        return <Payout />;
      case '#purchase':
        return (
          <div className="pt-20">
            <Pricing />
          </div>
        );
      default:
        return (
          <div className="space-y-24 pb-24">
            <Hero />
            <Pricing />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar currentPath={currentPath} />
      <main>
        {renderContent()}
      </main>
      <Footer />
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
