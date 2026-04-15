import React, { useState, useEffect, Suspense } from 'react';
import { modulesConfig } from '../data/moduleList';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import ModuleGrid from './layout/ModuleGrid';
import { useLanguage } from '../context/LanguageContext';

const getModuleFromHash = () => {
  const hash = window.location.hash;
  const match = hash.match(/^#app\/(.+)$/);
  return match ? match[1] : null;
};

const MainHub = ({ user, onLogout }) => {
  const { t } = useLanguage();
  const [activeModuleId, setActiveModuleId] = useState(() => getModuleFromHash());

  // Sync hash → state (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#app')) {
        setActiveModuleId(getModuleFromHash());
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectModule = (id) => {
    window.location.hash = `#app/${id}`;
  };

  const handleBack = () => {
    window.location.hash = '#app';
  };

  const activeModule = modulesConfig.find(m => m.id === activeModuleId);

  return (
    <div className="app-layout">
      <Sidebar
        activeModule={activeModuleId}
        onSelectModule={handleSelectModule}
        modules={modulesConfig}
      />

      <main className="main-viewport">
        <Header
          user={user}
          activeModuleName={activeModule?.name}
          onLogout={onLogout}
          onBack={activeModuleId ? handleBack : null}
          onSelectModule={handleSelectModule}
        />

        <div className="content-area">
          {activeModuleId ? (
            <Suspense fallback={<div className="loading-screen">{t('loadingModule')}</div>}>
              <div className="module-render-container">
                {activeModule?.component
                  ? React.createElement(activeModule.component)
                  : <div className="loading-screen">{t('moduleNotFound')}</div>}
              </div>
            </Suspense>
          ) : (
            <ModuleGrid
              modules={modulesConfig}
              onSelectModule={handleSelectModule}
            />
          )}
        </div>
      </main>

      <style>{`
        .app-layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: #f8fafc;
          font-family: 'Inter', sans-serif;
        }

        .main-viewport {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .content-area {
          flex: 1;
          overflow-y: auto;
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .module-render-container {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-screen {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default MainHub;
