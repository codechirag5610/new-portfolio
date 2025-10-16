import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import { images } from '../../constants';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Case Studies', path: '/case-studies' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <Link to="/">
          <img src={images.logo} alt="logo" />
        </Link>
      </div>
      
      <ul className='app__navbar-links'>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path}
              className={isActive(item.path) ? 'active' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <ThemeToggle />

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        <AnimatePresence>
          {toggle && (
            <>
              <motion.div
                className="menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setToggle(false)}
              />
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <HiX onClick={() => setToggle(false)} />
                <ul>
                  {navItems.map((item) => (
                    <li key={`mobile-${item.path}`}>
                      <Link 
                        to={item.path}
                        onClick={() => setToggle(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
