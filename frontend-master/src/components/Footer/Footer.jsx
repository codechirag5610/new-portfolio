import React from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail } from 'react-icons/hi';
import { BsCalendar3 } from 'react-icons/bs';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: <FaGithub />, 
      url: 'https://github.com/codechirag5610', 
      label: 'GitHub' 
    },
    { 
      icon: <FaLinkedin />, 
      url: 'https://www.linkedin.com/in/chirag-sharma-631099192/', 
      label: 'LinkedIn' 
    },
    { 
      icon: <FaXTwitter />, 
      url: 'https://x.com/ll__chirag__ll', 
      label: 'X (Twitter)' 
    },
    { 
      icon: <FaStackOverflow />, 
      url: 'https://stackoverflow.com/users/21302780/chirag-sharma', 
      label: 'Stack Overflow' 
    },
    { 
      icon: <HiMail />, 
      url: 'mailto:sharmachirag347@gmail.com', 
      label: 'Email' 
    },
    { 
      icon: <BsCalendar3 />, 
      url: 'https://calendly.com/sharmachirag347/30min', 
      label: 'Schedule a Call' 
    }
  ];

  return (
    <footer className="app__footer">
      <div className="footer__container">
        <div className="footer__left">
          <h3 className="footer__name">Chirag Sharma</h3>
          <p className="footer__title">DevOps Lead | Solutions Architect Associate</p>
          <p className="footer__copyright">© {currentYear} All rights reserved</p>
        </div>

        <div className="footer__right">
          <div className="footer__social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel={link.url.startsWith('mailto:') ? '' : 'noreferrer'}
                className="footer__social-icon"
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

