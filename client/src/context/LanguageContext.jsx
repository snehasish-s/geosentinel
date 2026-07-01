import { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages, getTranslation } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('geosentinel-lang');
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang);
    }
  }, []);

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setCurrentLang(langCode);
      localStorage.setItem('geosentinel-lang', langCode);
    }
  };

  const t = (path) => getTranslation(currentLang, path);

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};