import React, { createContext, useContext, useState } from 'react';

const CsapatAzonContext = createContext();

export const CsapatAzonProvider = ({ children }) => {
  const [csapatAzon, setCsapatAzon] = useState(null);

  const setCsapatAzonValue = (cs_azon) => {
    setCsapatAzon(cs_azon);
  };

  return (
    <CsapatAzonContext.Provider value={{ csapatAzon, setCsapatAzonValue }}>
      {children}
    </CsapatAzonContext.Provider>
  );
};

export const useCsapatAzon = () => {
  const context = useContext(CsapatAzonContext);
  if (!context) {
    throw new Error('useCsapatAzon must be used within a CsapatAzonProvider');
  }
  return context;
};
