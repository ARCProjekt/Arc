import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './NyelvSegedlet';
import '../css/Kozos.css';

const NyelvValtas = () => {
  const { selectedLanguage, handleLanguageChange } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChangeLanguage = (newLanguage) => {
    handleLanguageChange(newLanguage);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="lang-select">
      <button className={`btn-select ${isOpen ? 'open' : ''}`} value="" onClick={toggleDropdown}>
        {selectedLanguage === 'hu' && <img src={process.env.PUBLIC_URL+"/kepek/magyar.png"} alt="Magyar Flag" className="flag-icon" />}
        {selectedLanguage === 'en' && <img src={process.env.PUBLIC_URL+"/kepek/angol.png"} alt="English Flag" className="flag-icon" />}
      </button>
      <div ref={dropdownRef} className={`dropdown-list ${isOpen ? 'open' : ''}`}>
        <button onClick={() => handleChangeLanguage('hu')}>
          <img src={process.env.PUBLIC_URL+"/kepek/magyar.png"} alt="Magyar Flag" className="flag-icon" />
          <span>Magyar</span>
        </button>
        <button onClick={() => handleChangeLanguage('en')}>
          <img src={process.env.PUBLIC_URL+"/kepek/angol.png"} alt="English Flag" className="flag-icon" />
          <span>English</span>
        </button>
        {/* További nyelvek ikonjai és nevei */}
      </div>
    </div>
  );
};

export default NyelvValtas;