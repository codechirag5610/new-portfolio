import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { images } from '../../constants';
import { client, urlFor } from '../../client';
import ResumePDF from '../../assets/DevOps_Lead_Chirag_Sharma.pdf';
import './HomePage.scss';

const calendlyLink = process.env.REACT_APP_CALENDLY_LINK || "https://calendly.com/sharmachirag347/30min";

const HomePage = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [displayedName, setDisplayedName] = useState('');
  const fullName = 'Chirag Sharma';

  const skills = [
    'Full Stack Development',
    'DevOps & Cloud',
    'Kubernetes',
    'System Design',
    'AWS Solutions Architecture',
    'CI/CD Automation',
    'Terraform & IaC',
    'Microservices'
  ];

  useEffect(() => {
    const caseStudiesQuery = '*[_type == "caseStudies"] | order(order desc)[0...3]';
    
    client.fetch(caseStudiesQuery)
      .then((data) => setCaseStudies(data))
      .catch((err) => console.error('Error fetching case studies:', err));
  }, []);

  // Typewriter effect for name
  useEffect(() => {
    let index = 0;
    const typingDelay = 100; // milliseconds per character
    const startDelay = 800; // delay before typing starts

    const startTyping = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (index < fullName.length) {
          setDisplayedName(fullName.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          // Keep cursor blinking after typing completes
        }
      }, typingDelay);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(startTyping);
  }, []);

  const scrollToCaseStudies = () => {
    const caseStudiesSection = document.querySelector('.homepage__case-studies');
    if (caseStudiesSection) {
      caseStudiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="homepage">
      <div className="homepage__hero">
        <div className="homepage__content">
        <motion.div
          className="homepage__profile"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="profile-image">
            <img src={images.cover} alt="Chirag Sharma" />
            <div className="profile-glow" />
          </div>
        </motion.div>

        <motion.div
          className="homepage__info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="wave">👋</span>
            <span>Hello, I'm</span>
          </motion.div>

          <h1 className="name">
            <span className="prompt">$</span>
            {displayedName}
            <span className="cursor"></span>
          </h1>

          <motion.div
            className="designation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="title">DevOps Lead</span>
            <span className="separator">·</span>
            <span className="subtitle">AWS Certified Solutions Architect</span>
          </motion.div>

          <motion.p
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Transforming ideas into scalable cloud solutions. Specializing in building robust infrastructure, 
            optimizing DevOps pipelines, and architecting modern applications that drive business growth.
          </motion.p>

          <motion.div
            className="skills-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3>Core Expertise</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <a href={ResumePDF} download="Chirag_Sharma_Resume.pdf" className="btn btn-primary">
              View Resume
            </a>
            <a href={calendlyLink} target="_blank" rel="noreferrer" className="btn btn-secondary">
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          onClick={scrollToCaseStudies}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </motion.div>
      </div>

      {/* Case Studies Section */}
      <motion.div
        className="homepage__case-studies"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="case-studies-header">
          <h2>Featured Case Studies</h2>
          <p>Explore my latest projects and technical solutions</p>
        </div>

        <div className="case-studies-grid">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy._id || index}
              className="case-study-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
            >
              {caseStudy.profilePicture && (
                <div className="case-study-image">
                  <img src={urlFor(caseStudy.profilePicture)} alt={caseStudy.title} />
                  <div className="image-overlay" />
                </div>
              )}
              
              <div className="case-study-content">
                {caseStudy.category && (
                  <span className="category">{caseStudy.category}</span>
                )}
                <h3>{caseStudy.title}</h3>
                <p className="description">{caseStudy.shortDescription}</p>
                
                {caseStudy.tags && caseStudy.tags.length > 0 && (
                  <div className="tags">
                    {caseStudy.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                )}

                <Link 
                  to={`/case-studies/${caseStudy.slug?.current || caseStudy._id}`} 
                  className="read-more-btn"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {caseStudies.length === 0 && (
          <p className="no-case-studies">No case studies available yet. Check back soon!</p>
        )}

        <motion.div
          className="view-all-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/case-studies" className="btn btn-primary view-all-btn">
            View All Case Studies
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;

