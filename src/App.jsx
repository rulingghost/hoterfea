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

const MOBILE_MAX_W = 768;

const mobileDemoBlockedStyle = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#060a13',
  color: '#818cf8',
  fontFamily: 'sans-serif',
  padding: '20px',
  textAlign: 'center',
};

function App() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_MAX_W : false
  );
  const [userContext, setUserContext] = useState(null);
  const [landingMobileDemoNotice, setLandingMobileDemoNotice] = useState(false);

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

  // Mobile check (sadece demo/sunum için; ana sayfa mobilde açılır)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_MAX_W);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (routeState.page !== 'landing') setLandingMobileDemoNotice(false);
  }, [routeState.page]);

  // Tüm uygulama geçişleri pushState: geri tuşu her adımda içeride (landing → demo → app → modüller) kalır
  const navigate = (path) => {
    window.history.pushState({ hoterfea: 1 }, '', path);
    setRouteState(getStateFromPath());
  };

  const handleOpenDemo = () => {
    if (isMobile) {
      setLandingMobileDemoNotice(true);
      return;
    }
    navigate('/demo');
  };
  const handleOpenPresentation = () => {
    if (isMobile) {
      setLandingMobileDemoNotice(true);
      return;
    }
    navigate('/presentation');
  };

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
    if (isMobile && effectivePage === 'presentation') {
      return (
        <div style={mobileDemoBlockedStyle}>
          <h2>{t('landing.mobileWarning')}</h2>
        </div>
      );
    }
    if (effectivePage === 'presentation') {
      return <PresentationMode onBack={() => navigate('/')} />;
    }
    if (effectivePage === 'landing') {
      return <LandingPage onOpenDemo={handleOpenDemo} onOpenPresentation={handleOpenPresentation} />;
    }
    // Sadece /demo (canlı demo) mobilde blok; /app oturumu yokken giriş ekranı mobilde açılabilir
    if (isMobile && effectivePage === 'login' && routeState.page === 'login') {
      return (
        <div style={mobileDemoBlockedStyle}>
          <h2>{t('landing.mobileWarning')}</h2>
        </div>
      );
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
      {routeState.page === 'landing' && landingMobileDemoNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('landing.mobileWarning')}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(6, 10, 19, 0.92)',
            padding: '20px',
          }}
        >
          <div
            style={{
              maxWidth: 400,
              textAlign: 'center',
              background: '#0f1420',
              border: '1px solid rgba(129, 140, 248, 0.25)',
              borderRadius: 16,
              padding: '28px 24px',
            }}
          >
            <h2 style={{ color: '#818cf8', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 20px', lineHeight: 1.5 }}>
              {t('landing.mobileWarning')}
            </h2>
            <button
              type="button"
              onClick={() => setLandingMobileDemoNotice(false)}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '12px 28px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {t('landing.mobileWarningOk')}
            </button>
          </div>
        </div>
      )}
      {effectivePage === 'app' && <GlobalGuideWidget />}
    </>
  );
}

export default App;
