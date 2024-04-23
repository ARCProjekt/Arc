/* // StyleToggleButton.js

import React from 'react';
import { Button } from 'react-bootstrap';
import { useStyleContext } from './contexts/StyleContext';

const StyleToggleButton = () => {
  const { toggleStyle, currentStyle } = useStyleContext();

  const styles = {
    backgroundImage: currentStyle === 'Kozos2.css' 
      ? 'url(../../public/kepek/hatter.png)' 
      : 'url(https://4kwallpapers.com/images/walls/thumbs_3t/5661.jpg)',
    backgroundColor: currentStyle === 'Kozos2.css' ? 'blue' : 'white',
    color: currentStyle === 'Kozos2.css' ? 'white' : 'black',
    textAlign: 'center',
    border: '1px gainsboro solid',
    borderRadius: '5px',
  };

  if (currentStyle === 'Kozos2.css') {
    styles['width'] = '115%';
  }

  return (
    <Button onClick={toggleStyle} style={styles}>
      Toggle Style
    </Button>
  );
};

export default StyleToggleButton;
 */