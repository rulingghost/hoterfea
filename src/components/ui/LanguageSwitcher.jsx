import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ style, dark = false }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className={`lang-switcher ${language}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: dark ? 'rgba(255, 255, 255, 0.08)' : '#f8fafc',
        border: `1.5px solid ${dark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'}`,
        borderRadius: '12px',
        cursor: 'pointer',
        color: dark ? '#fff' : '#475569',
        fontSize: '12px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        zIndex: 99,
        ...style
      }}
      title={language === 'tr' ? "Switch to English" : "Türkçeye Geç"}
    >
      <Globe size={16} color={dark ? "#a5b4fc" : "#3b82f6"} />
      <span style={{ textTransform: 'uppercase' }}>
        {language === 'tr' ? 'TÜRKÇE' : 'ENGLISH'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
