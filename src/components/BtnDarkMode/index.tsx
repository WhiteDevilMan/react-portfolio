import { useEffect, useRef } from 'react';

import { useLocalStorage } from '../../utils/customHooks';
import detectDarkMode from '../../utils/detectDarkMode';
import moon from './moon.svg';
import sun from './sun.svg';

import './styles.css';

export type TDarkMode = 'light' | 'dark';

const BtnDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage<TDarkMode>('darkMode', detectDarkMode());
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggleDarkMode = () => {
    setDarkMode((currentValue) => (currentValue === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (darkMode === 'dark') {
      document.body.classList.add('dark');
      btnRef.current?.classList.add('dark-mode-btn--active');
    } else {
      document.body.classList.remove('dark');
      btnRef.current?.classList.remove('dark-mode-btn--active');
    }
  }, [darkMode]);

  useEffect(() => {
    const systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const changeSiteColorMode = (event: MediaQueryListEvent) => {
      const newColorScheme = event.matches ? 'dark' : 'light';
      setDarkMode(newColorScheme);
    };

    systemColorScheme.addEventListener('change', changeSiteColorMode);
    return () => systemColorScheme.removeEventListener('change', changeSiteColorMode);
  }, [setDarkMode]);

  return (
    <button ref={btnRef} type="button" className="dark-mode-btn" onClick={toggleDarkMode}>
      <img src={sun} alt="Light mode" className="dark-mode-btn__icon" />
      <img src={moon} alt="Dark mode" className="dark-mode-btn__icon" />
    </button>
  );
};

export default BtnDarkMode;
