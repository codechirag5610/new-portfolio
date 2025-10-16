import React, { useState, useEffect } from 'react';
import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { motion } from 'framer-motion';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
  
    client.fetch(query)
      .then((data) => setAbouts(data))
      .catch((err) => console.error('Error fetching abouts:', err));
  }, []);

  return (
    <>
      <h2 className="head-text">
        You <span>work</span> on your business, <br />
        I'll <span>help</span> you <span>grow</span> it.
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text">{about.title}</h2>
            <p className="p-text">{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'), 
  'about', 
  'app__whitebg'
);
