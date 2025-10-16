import React from 'react';
import { AppWrap } from '../../wrapper/index';
import './Header.scss';
import { motion } from 'framer-motion';
import { images } from '../../constants';

const Header = () => {
  return (
    <div className='app__header app__flex'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className='app__header-info'
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              👋
            </motion.span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Chirag</h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="tag-cmp"
          >
            <p>AWS Certified Solutions Architect</p>
            <p>Kubernetes Developer</p>
            <p>Web Developer</p>
            <p>ML Enthusiast</p>
            <p>Freelancer</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className='app__header-img'
      >
        <img src={images.cover} alt="profile" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="app__header-circles"
      >
        {[images.node, images.react, images.sass].map((circle, index) => (
          <motion.div
            key={`circle-${index}`}
            className="circle-cmp app__flex"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src={circle} alt="tech" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="scroll-indicator"
      >
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
