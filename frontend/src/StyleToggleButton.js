import React from 'react';
import { Button } from 'react-bootstrap';
import useStyleToggle from './useStyleToggle'; // Itt importáljuk be a hook-függvényt

const StyleToggleButton = () => {
  const { handleStyleToggle, selectedLanguage } = useStyleToggle(); // Itt használjuk a hook-függvényt

  return (
    <Button onClick={handleStyleToggle}>
      {selectedLanguage === 'hu' ? 'Stílus váltás' : 'Switch design'}
    </Button>
  );
};

export default StyleToggleButton;
