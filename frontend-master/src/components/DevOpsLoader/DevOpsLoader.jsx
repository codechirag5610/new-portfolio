import React from 'react';
import { motion } from 'framer-motion';
import './DevOpsLoader.scss';

const DevOpsLoader = () => {
  return (
    <div className="devops-loader">
      <div className="devops-loader__content">
        <motion.div
          className="infinity-loop"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Simple Infinity Symbol */}
          <svg width="200" height="100" viewBox="0 0 200 100" className="infinity-svg">
            {/* Single infinity path */}
            <motion.path
              d="M 30,50 C 30,30 40,20 55,20 C 70,20 75,35 85,50 C 95,65 100,80 115,80 C 130,80 140,70 140,50 C 140,30 130,20 115,20 C 100,20 95,35 85,50 C 75,65 70,80 55,80 C 40,80 30,70 30,50 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default DevOpsLoader;

