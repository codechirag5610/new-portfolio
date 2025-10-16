import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';
import './ThemeToggle.scss';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="theme-toggle-icon"
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? <HiSun /> : <HiMoon />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

