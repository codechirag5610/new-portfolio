import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingNav.scss';

const FloatingNav = ({ activeSection, onNavigate }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { id: 'experience', label: 'Work Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Technical Skills', icon: '⚡' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'education', label: 'Education', icon: '🎓' }
  ];

  return (
    <motion.div
      className="floating-nav"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {navItems.map((item, index) => (
        <motion.div
          key={item.id}
          className={`floating-nav-item ${activeSection === item.id ? 'active' : ''}`}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => onNavigate(item.id)}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="nav-dot" />
          
          <AnimatePresence>
            {hoveredItem === item.id && (
              <motion.div
                className="nav-label"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="icon">{item.icon}</span>
                <span className="text">{item.label}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FloatingNav;

