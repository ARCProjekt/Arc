import { useState } from 'react';

const useStyleToggle = () => {
  const [style, setStyle] = useState('Kozos.css');

  const handleStyleToggle = () => {
    setStyle((prevStyle) => (prevStyle === 'Kozos.css' ? 'Kozos2.css' : 'Kozos.css'));
  };

  const selectedLanguage = 'hu'; 

  return { handleStyleToggle, selectedLanguage };
};

export default useStyleToggle;
