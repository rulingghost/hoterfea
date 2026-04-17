import React, { createContext, useContext, useState, useEffect } from 'react';
import { tr } from '../locales/tr';
import { en } from '../locales/en';
import { modulesTr, modulesEn } from '../locales/modules';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('hotel_lang');
    return saved || 'tr';
  });

  useEffect(() => {
    localStorage.setItem('hotel_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  const getNestedProp = (obj, path) => {
    return path.split('.').reduce((o, p) => (o && o[p] != null ? o[p] : null), obj);
  };

  // Main translation function (for landing/common/login)
  const t = (key) => {
    const dictionary = language === 'tr' ? tr : en;
    const result = getNestedProp(dictionary, key);
    if (result !== null && result !== undefined) return result;
    return key;
  };

  // Module-specific translation function
  // Usage: mt('frontOffice.title') or mt('common.save')
  const mt = (key) => {
    const dictionary = language === 'tr' ? modulesTr : modulesEn;
    const result = getNestedProp(dictionary, key);
    if (result !== null && result !== undefined) return result;
    // Fallback to Turkish
    const fallback = getNestedProp(modulesTr, key);
    if (fallback !== null && fallback !== undefined) return fallback;
    return key;
  };

  const val = {
    language,
    toggleLanguage,
    t,
    mt,
    currentDictionary: language === 'tr' ? tr : en,
    isEn: language === 'en',
    isTr: language === 'tr',
  };

  return (
    <LanguageContext.Provider value={val}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// Convenience hook for modules
export const useModuleTranslation = () => {
  const { mt, language, toggleLanguage, isEn, isTr } = useContext(LanguageContext);
  return { mt, language, toggleLanguage, isEn, isTr };
};
