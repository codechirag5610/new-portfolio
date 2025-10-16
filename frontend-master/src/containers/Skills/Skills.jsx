import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper/index';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query)
      .then((data) => setExperience(data))
      .catch((err) => console.error('Error fetching experience:', err));

    client.fetch(skillsQuery)
      .then((data) => setSkills(data))
      .catch((err) => console.error('Error fetching skills:', err));
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & <span>Experience</span></h2>
      
      <div className="app__skills-container">
        <motion.div 
          className='app__skills-list'
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {skills?.map((skill, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className='app__skills-exp'
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {experience?.map((exp, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              className='app__skills-exp-item' 
              key={exp.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{exp.year}</p>
              </div>
              <div className='app__skills-exp-works'>
                {exp?.works?.map((work) => (
                  <div key={work.name}>
                    <div 
                      className="app__skills-exp-work" 
                      data-tip 
                      data-for={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </div>
                    <ReactTooltip 
                      id={work.name} 
                      effect="solid"
                      arrowColor="var(--border-color)"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'), 
  'skills', 
  'app__whitebg'
);
