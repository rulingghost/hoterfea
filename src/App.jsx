import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import MainHub from './components/MainHub';
import PresentationMode from './components/PresentationMode';
import { HotelProvider } from './context/HotelContext';
import GlobalGuideWidget from './components/ui/GlobalGuideWidget';


function App() {
  // 'landing' | 'login' | 'app' | 'presentation'
  const [page, setPage] = useState('landing');
  const [userContext, setUserContext] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#060a13', color: '#818cf8', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center'
      }}>
        <h2>Lütfen masaüstü üzerinden giriniz.</h2>
      </div>
    );
  }


  const handleOpenDemo = () => {
    setPage('login');
  };

  const handleOpenPresentation = () => {
    setPage('presentation');
  };

  const handleLogin = (data) => {
    setUserContext(data);
    setPage('app');
  };

  const handleLogout = () => {
    setPage('landing');
    setUserContext(null);
  };

  const renderPage = () => {
    if (page === 'presentation') {
      return <PresentationMode onBack={() => setPage('landing')} />;
    }
    if (page === 'landing') {
      return <LandingPage onOpenDemo={handleOpenDemo} onOpenPresentation={handleOpenPresentation} />;
    }
    if (page === 'login') {
      return <Login onLogin={handleLogin} />;
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

export default App;
