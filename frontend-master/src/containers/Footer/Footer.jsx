import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper/index';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => {
        console.error('Error submitting form:', err);
        setLoading(false);
      });
  };

  return (
    <>
      <h2 className="head-text">
        Let's <span>Connect</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="app__footer-cards"
      >
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:sharmachirag347@gmail.com" className='p-text'>
            sharmachirag347@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.github} alt="github" />
          <a href="https://github.com/codechirag5610" target="_blank" rel="noreferrer" className='p-text'>
            My Github
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.download} alt="resume" />
          <a href='/files/chirag_resume_finall.pdf' className='p-text' download>
            Download Resume
          </a>
        </div>
      </motion.div>

      {!isFormSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="app__footer-form app__flex"
        >
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              name='name'
              placeholder='Your Name'
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="app__flex">
            <input
              type="email"
              className="p-text"
              name='email'
              placeholder='Your Email'
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <textarea
              className='p-text'
              name='message'
              value={message}
              placeholder='Your Message'
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className='p-text'
            onClick={handleSubmit}
            disabled={loading || !name || !email || !message}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <h3 className='head-text'>
            Thank you for <span>getting in touch!</span>
          </h3>
        </motion.div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'), 
  'contact', 
  'app__whitebg'
);
