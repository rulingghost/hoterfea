import React, { useState, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import MainHub from './components/MainHub';
import PresentationMode from './components/PresentationMode';
import { HotelProvider } from './context/HotelContext';
import { useLanguage } from './context/LanguageContext';
import GlobalGuideWidget from './components/ui/GlobalGuideWidget';

// Path-based route parser
const parsePath = (path) => {
  const cleanPath = path || '/';
  const parts = cleanPath.split('/').filter(Boolean);
  return { path: cleanPath, parts };
};

function App() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userContext, setUserContext] = useState(null);

  // Derive state from current path
  const getStateFromPath = () => {
    const path = window.location.pathname || '/';
    const { parts } = parsePath(path);

    if (path === '/' || path === '') return { page: 'landing', module: null };
    if (parts[0] === 'demo') return { page: 'login', module: null };
    if (parts[0] === 'presentation') return { page: 'presentation', module: null };
    if (parts[0] === 'app') {
      const module = parts[1] || null;
      return { page: 'app', module };
    }
    return { page: 'landing', module: null };
  };

  const [routeState, setRouteState] = useState(() => getStateFromPath());
  const deepLinkHistorySeededRef = useRef(false);

  // Tek sekmede doğrudan /app/... açıldığında geri tuşu tarayıcıyı komple terk etmesin:
  // geçmişe bir /app (hub) basamağı eklenir (History API ile "içerde geri").
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!userContext) return;
    const path = window.location.pathname || '/';
    if (!path.startsWith('/app')) return;
    const parts = path.split('/').filter(Boolean);
    if (parts.length < 2) return;
    if (window.history.length > 1) return;
    if (deepLinkHistorySeededRef.current) return;
    deepLinkHistorySeededRef.current = true;
    window.history.replaceState({ hoterfea: 'hub' }, '', '/app');
    window.history.pushState({ hoterfea: 'module' }, '', path);
    setRouteState(getStateFromPath());
  }, [userContext]);

  // Geri/ileri: URL ile state; /app dışına pop olunca oturumu sıfırla (aksi halde URL demo iken hâlâ "giriş yapmış" kalırdı)
  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname || '/';
      setUserContext((prev) => {
        if (!prev) return null;
        return path.startsWith('/app') ? prev : null;
      });
      setRouteState(getStateFromPath());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Mobile check
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
        <h2>{t('landing.mobileWarning')}</h2>
      </div>
    );
  }

  // Tüm uygulama geçişleri pushState: geri tuşu her adımda içeride (landing → demo → app → modüller) kalır
  const navigate = (path) => {
    window.history.pushState({ hoterfea: 1 }, '', path);
    setRouteState(getStateFromPath());
  };

  const handleOpenDemo = () => navigate('/demo');
  const handleOpenPresentation = () => navigate('/presentation');

  const handleLogin = (data) => {
    setUserContext(data);
    navigate('/app');
  };

  const handleLogout = () => {
    setUserContext(null);
    deepLinkHistorySeededRef.current = false;
    navigate('/');
  };

  const handleSelectModule = (moduleId) => {
    if (moduleId) {
      navigate(`/app/${moduleId}`);
    } else {
      navigate('/app');
    }
  };

  const { page, module: activeModuleId } = routeState;

  // Guard: if someone navigates to /app without login
  const effectivePage = (page === 'app' && !userContext) ? 'login' : page;

  const renderPage = () => {
    if (effectivePage === 'presentation') {
      return <PresentationMode onBack={() => navigate('/')} />;
    }
    if (effectivePage === 'landing') {
      return <LandingPage onOpenDemo={handleOpenDemo} onOpenPresentation={handleOpenPresentation} />;
    }
    if (effectivePage === 'login') {
      return <Login onLogin={handleLogin} />;
    }
    // app
    return (
      <HotelProvider>
        <MainHub
          user={userContext}
          onLogout={handleLogout}
          activeModuleId={activeModuleId}
          onSelectModule={handleSelectModule}
        />
      </HotelProvider>
    );
  };

  return (
    <>
      {renderPage()}
      {effectivePage === 'app' && <GlobalGuideWidget />}
    </>
  );
}

export default App;
