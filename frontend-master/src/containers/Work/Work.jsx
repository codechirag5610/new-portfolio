import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper/index';
import './Work.scss';
import { urlFor, client } from '../../client';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works"]';
  
    client.fetch(query)
      .then((data) => {
        setWorks(data);
        setFilterWork(data);
      })
      .catch((err) => console.error('Error fetching works:', err));
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);

    if (item === 'All') {
      setFilterWork(works);
    } else {
      setFilterWork(works.filter((work) => work.tags.includes(item)));
    }
  };

  return (
    <>
      <h2 className="head-text">
        My Creative <span>Work</span> Section
      </h2>

      <div className="app__work-filter">
        {['All', 'Web App', 'React JS', 'Workflows', 'Terraform', 'Helm Charts', 'Automations'].map((item, index) => (
          <div 
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            key={index} 
            onClick={() => handleWorkFilter(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="app__work-portfolio">
        {filterWork?.map((work, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="app__work-item app__flex"
            key={work.title + index}
          >
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.title} />
              <div className="app__work-hover app__flex">
                <a href={work.projectLink} target="_blank" rel='noreferrer'>
                  <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    transition={{ type: "spring", stiffness: 400, damping: 10 }} 
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel='noreferrer'>
                  <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    transition={{ type: "spring", stiffness: 400, damping: 10 }} 
                    className='app__flex'
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className='bold-text'>{work.title}</h4>
              <p className="p-text">{work.description}</p>
              <div className="app__flex">
                {work.tags.map((tag, tagIndex) => (
                  <div className="app__work-tag app__flex" key={tagIndex}>
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'), 
  'work', 
  'app__tertiary'
);
