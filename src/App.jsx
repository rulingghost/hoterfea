import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import MainHub from './components/MainHub';
import PresentationMode from './components/PresentationMode';
import { HotelProvider } from './context/HotelContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import GlobalGuideWidget from './components/ui/GlobalGuideWidget';

// Derive page state from URL hash
const getPageFromHash = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#app')) return 'app';
  if (hash === '#login') return 'login';
  if (hash === '#presentation') return 'presentation';
  return 'landing';
};

function AppInner() {
  const { t } = useLanguage();
  const [userContext, setUserContext] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [page, setPage] = useState(() => getPageFromHash());

  // Sync initial hash
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', '#landing');
    }
  }, []);

  // Listen to hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setPage(newPage);
      // Clear session if navigating back to login or landing
      if (newPage === 'login' || newPage === 'landing') {
        setUserContext(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#060a13', color: '#818cf8', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center'
      }}>
        <h2>{t('mobileWarning')}</h2>
      </div>
    );
  }

  const handleOpenDemo = () => {
    window.location.hash = '#login';
  };

  const handleOpenPresentation = () => {
    window.location.hash = '#presentation';
  };

  const handleLogin = (data) => {
    setUserContext(data);
    window.location.hash = '#app';
  };

  const handleLogout = () => {
    setUserContext(null);
    window.location.hash = '#landing';
  };

  const renderPage = () => {
    if (page === 'presentation') {
      return <PresentationMode onBack={() => { window.location.hash = '#landing'; }} />;
    }
    if (page === 'landing') {
      return <LandingPage onOpenDemo={handleOpenDemo} onOpenPresentation={handleOpenPresentation} />;
    }
    if (page === 'login') {
      return <Login onLogin={handleLogin} />;
    }
    // page === 'app'
    if (!userContext) {
      // Not logged in — redirect to login
      window.location.hash = '#login';
      return null;
    }
    return (
      <HotelProvider>
        <MainHub user={userContext} onLogout={handleLogout} />
      </HotelProvider>
    );
  };

  return (
    <>
      {renderPage()}
      <GlobalGuideWidget />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;
