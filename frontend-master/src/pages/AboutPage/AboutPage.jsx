import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import FloatingNav from '../../components/FloatingNav/FloatingNav';
import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail } from 'react-icons/hi';
import { BsCalendar3 } from 'react-icons/bs';
import { images } from '../../constants';
import { client, urlFor } from '../../client';
import './AboutPage.scss';

const calendlyLink = process.env.REACT_APP_CALENDLY_LINK || "https://calendly.com/sharmachirag347/30min";

// Helper function to format category names for display
const formatCategoryName = (category) => {
  if (category === 'All') return 'All';
  if (category === 'CICD') return 'CI/CD and Automations';
  
  // Replace hyphens with spaces
  return category.replace(/-/g, ' ');
};

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('experience');
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [education, setEducation] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');
  const [expandedWork, setExpandedWork] = useState(null);

  // Dynamically extract unique skill categories from the skills data
  const skillCategories = useMemo(() => {
    const categories = skills
      .map(skill => skill.category)
      .filter(Boolean) // Remove null/undefined values
      .filter((value, index, self) => self.indexOf(value) === index); // Get unique values
    return ['All', ...categories];
  }, [skills]);

  useEffect(() => {
    const experienceQuery = '*[_type == "experiences"] | order(year desc)';
    const skillsQuery = '*[_type == "skills"]';
    const projectsQuery = '*[_type == "works"]';
    const certificationsQuery = '*[_type == "certifications"] | order(year desc)';
    const educationQuery = '*[_type == "education"] | order(startYear desc)';

    client.fetch(experienceQuery)
      .then((data) => setExperiences(data))
      .catch((err) => console.error('Error fetching experiences:', err));

    client.fetch(skillsQuery)
      .then((data) => setSkills(data))
      .catch((err) => console.error('Error fetching skills:', err));

    client.fetch(projectsQuery)
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error fetching projects:', err));

    client.fetch(certificationsQuery)
      .then((data) => setCertifications(data))
      .catch((err) => console.error('Error fetching certifications:', err));

    client.fetch(educationQuery)
      .then((data) => setEducation(data))
      .catch((err) => console.error('Error fetching education:', err));
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = [
      'experience',
      'projects',
      'skills',
      'certifications',
      'education'
    ];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="about-page">
      <FloatingNav activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="about-page__header">
        <motion.div
          className="header__profile"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={images.cover} alt="Chirag Sharma" />
        </motion.div>

        <motion.div
          className="header__info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1>Chirag Sharma</h1>
          <p className="designation">DevOps Lead | Solutions Architect Associate</p>
          
          <div className="get-in-touch">
            <h2 className="get-in-touch__title">Get in Touch</h2>
            <div className="get-in-touch__buttons">
              <a 
                href="mailto:sharmachirag347@gmail.com" 
                className="connect-btn"
              >
                <HiMail className="btn-icon" />
                <span>Send Mail</span>
              </a>
              
              <a 
                href={calendlyLink} 
                target="_blank" 
                rel="noreferrer"
                className="connect-btn"
              >
                <BsCalendar3 className="btn-icon" />
                <span>Schedule a Call</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/chirag-sharma-631099192/" 
                target="_blank" 
                rel="noreferrer"
                className="connect-btn"
              >
                <FaLinkedin className="btn-icon" />
                <span>Connect on LinkedIn</span>
              </a>
              
              <a 
                href="https://x.com/ll__chirag__ll" 
                target="_blank" 
                rel="noreferrer"
                className="connect-btn"
              >
                <FaXTwitter className="btn-icon" />
                <span>Connect on X (Twitter)</span>
              </a>
              
              <a 
                href="https://github.com/codechirag5610" 
                target="_blank" 
                rel="noreferrer"
                className="connect-btn"
              >
                <FaGithub className="btn-icon" />
                <span>View GitHub</span>
              </a>
              
              <a 
                href="https://stackoverflow.com/users/21302780/chirag-sharma" 
                target="_blank" 
                rel="noreferrer"
                className="connect-btn"
              >
                <FaStackOverflow className="btn-icon" />
                <span>Stack Overflow</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="about-page__content">
        {/* Work Experience Section */}
        <section id="experience" className="resume-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="icon">💼</span>
              Work Experience
            </h2>
            
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-marker" />
                  <div className="timeline-content">
                    <span className="year">{exp.year}</span>
                    {exp.works?.map((work, workIndex) => {
                      const workId = `${index}-${workIndex}`;
                      const isExpanded = expandedWork === workId;
                      
                      return (
                        <div key={workIndex} className="work-item">
                          <div className="work-header">
                            <div className="work-main">
                              <h3>{work.name}</h3>
                              <p className="company">{work.company}</p>
                              {(work.startDate || work.endDate) && (
                                <p className="duration">
                                  {work.startDate}
                                  {work.startDate && work.endDate && ' - '}
                                  {work.endDate}
                                </p>
                              )}
                              <p className="description">{work.desc}</p>
                            </div>
                            {work.longDescription && (
                              <button
                                className="expand-btn"
                                onClick={() => setExpandedWork(isExpanded ? null : workId)}
                                title={isExpanded ? "Hide details" : "Show details"}
                              >
                                <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
                              </button>
                            )}
                          </div>
                          
                          {work.longDescription && (
                            <motion.div
                              className="work-details"
                              initial={false}
                              animate={{
                                height: isExpanded ? 'auto' : 0,
                                opacity: isExpanded ? 1 : 0,
                              }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <div className="details-content">
                                <p>{work.longDescription}</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="resume-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="icon">🚀</span>
              Projects Portfolio
            </h2>
            
            {/* Project Filters */}
            <div className="project-filters">
              {['All', 'Workflows', 'Web App', 'Terraform', 'React JS', 'Helm Charts', 'Automations'].map((tag) => (
                <button
                  key={tag}
                  className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {projects
                .filter(project => selectedTag === 'All' || project.tags?.includes(selectedTag))
                .map((project, index) => (
                  <motion.div
                    key={project.title + index}
                    className="project-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="project-image">
                      <img src={urlFor(project.imgUrl)} alt={project.title} />
                      <div className="project-overlay">
                        <a 
                          href={project.projectLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="project-link"
                        >
                          View Project
                        </a>
                        {project.codeLink && (
                          <a 
                            href={project.codeLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="project-link"
                          >
                            View Code
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tags">
                        {project.tags?.map((tag, tagIndex) => (
                          <span key={tagIndex} className="project-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {projects.filter(project => selectedTag === 'All' || project.tags?.includes(selectedTag)).length === 0 && (
              <p className="no-projects">No projects found for this category.</p>
            )}
          </motion.div>
        </section>

        {/* Technical Skills Section */}
        <section id="skills" className="resume-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="icon">⚡</span>
              Technical Skills
            </h2>
            
            {/* Skill Category Filters */}
            <div className="skill-filters">
              {skillCategories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedSkillCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedSkillCategory(category)}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>

            <div className="skills-grid">
              {skills
                .filter(skill => selectedSkillCategory === 'All' || skill.category === selectedSkillCategory)
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="skill-icon">
                      <img src={urlFor(skill.icon)} alt={skill.name} />
                    </div>
                    <p>{skill.name}</p>
                  </motion.div>
                ))}
            </div>

            {skills.filter(skill => selectedSkillCategory === 'All' || skill.category === selectedSkillCategory).length === 0 && (
              <p className="no-data">No skills found for this category.</p>
            )}
          </motion.div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="resume-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="icon">🏆</span>
              Certifications
            </h2>
            
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id || index}
                  className="cert-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="cert-image">
                    <img src={urlFor(cert.certificateImage)} alt={cert.name} />
                  </div>
                  <div className="cert-content">
                    <h3>{cert.name}</h3>
                    {cert.issuer && <p className="issuer">{cert.issuer}</p>}
                    <div className="cert-meta">
                      <span className="year">{cert.year}</span>
                      {cert.credentialId && <span className="credential">ID: {cert.credentialId}</span>}
                    </div>
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="verify-link">
                        Verify Certificate
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {certifications.length === 0 && (
              <p className="no-data">No certifications added yet. Add them in Sanity Studio.</p>
            )}
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="resume-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="icon">🎓</span>
              Education
            </h2>
            
            <div className="education-list">
              {education.map((edu, index) => (
                <motion.div
                  key={edu._id || index}
                  className="edu-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>{edu.degree}</h3>
                  {edu.field && <p className="field">{edu.field}</p>}
                  <p className="institution">{edu.institution}</p>
                  {edu.location && <p className="location">{edu.location}</p>}
                  <div className="edu-meta">
                    <span className="duration">
                      {edu.startYear}{edu.endYear && ` - ${edu.endYear}`}
                    </span>
                    {edu.grade && <span className="grade">{edu.grade}</span>}
                  </div>
                  {edu.description && <p className="description">{edu.description}</p>}
                </motion.div>
              ))}
            </div>
            
            {education.length === 0 && (
              <p className="no-data">No education records added yet. Add them in Sanity Studio.</p>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

