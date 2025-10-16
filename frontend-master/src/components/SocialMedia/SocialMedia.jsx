import React from 'react';
import { motion } from 'framer-motion';
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';

const SocialMedia = () => {
  const socials = [
    { icon: <BsTwitter />, url: 'https://twitter.com/ll__chirag__ll', label: 'Twitter' },
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/chirag-sharma-631099192/', label: 'LinkedIn' },
    { icon: <BsInstagram />, url: 'https://www.instagram.com/thechiragsharmaa/', label: 'Instagram' }
  ];

  return (
    <div className='app__social'>
      {socials.map((social, index) => (
        <motion.div
          key={social.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
            {social.icon}
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialMedia;
