/* // StyleContext.js

import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const useStyleContext = () => {
  return useContext(StyleContext);
};

export const StyleProvider = ({ children }) => {
  const [currentStyle, setCurrentStyle] = useState('Kozos.css');

  const toggleStyle = () => {
    setCurrentStyle((prevStyle) => (prevStyle === 'Kozos.css' ? 'Kozos2.css' : 'Kozos.css'));
  };

  return (
    <StyleContext.Provider value={{ currentStyle, toggleStyle }}>
      {children}
    </StyleContext.Provider>
  );
};
 */