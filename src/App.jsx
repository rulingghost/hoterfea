import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import MainHub from './components/MainHub';
import PresentationMode from './components/PresentationMode';
import { HotelProvider } from './context/HotelContext';

function App() {
  // 'landing' | 'login' | 'app' | 'presentation'
  const [page, setPage] = useState('landing');
  const [userContext, setUserContext] = useState(null);

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
}

export default App;
