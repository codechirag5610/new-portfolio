import React from 'react';
import { motion } from 'framer-motion';

const NavigationDots = ({ active }) => {
  const sections = ['home', 'about', 'work', 'skills', 'testimonials', 'contact'];

  return (
    <div className='app__navigation'>
      {sections.map((item, index) => (
        <motion.a
          key={item + index}
          href={`#${item}`}
          className={`app__navigation-dot ${active === item ? 'active' : ''}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Navigate to ${item}`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;
