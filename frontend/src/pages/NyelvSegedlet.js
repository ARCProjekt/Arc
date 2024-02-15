import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('hu');

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};