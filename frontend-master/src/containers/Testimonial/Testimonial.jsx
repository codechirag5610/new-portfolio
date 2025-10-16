import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AppWrap, MotionWrap } from '../../wrapper/index';
import { urlFor, client } from '../../client';
import './Testimonial.scss';

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query)
      .then((data) => setTestimonials(data))
      .catch((err) => console.error('Error fetching testimonials:', err));

    client.fetch(brandsQuery)
      .then((data) => setBrands(data))
      .catch((err) => console.error('Error fetching brands:', err));
  }, []);

  const test = testimonials[currentIndex];

  return (
    <>
      <h2 className="head-text">Client <span>Testimonials</span></h2>
      
      {testimonials.length > 0 ? (
        <>
          <AnimatePresence mode="wait">
            {test && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className='app__testimonials-item app__flex'
              >
                <img src={urlFor(test.imgUrl)} alt={test.name} />
                <div className="app__testimonial-content">
                  <p className="p-text">"{test.feedback}"</p>
                  <div>
                    <h4 className="bold-text">{test.name}</h4>
                    <h5 className="p-text">{test.company}</h5>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="app__testimonial-btns app__flex">
            <motion.div
              className="app__flex"
              onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiChevronLeft />
            </motion.div>
            <motion.div
              className="app__flex"
              onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiChevronRight />
            </motion.div>
          </div>
        </>
      ) : (
        <h4 className='head-text'>
          Let's work together to show yourself here as a <span>testimony</span>
        </h4>
      )}

      {brands.length > 0 && (
        <div className="app__testimonial-brands app__flex">
          {brands.map((brand, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              key={brand._id}
            >
              <img src={urlFor(brand.imgUrl)} alt={brand.name} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonials'), 
  'testimonials', 
  'app__tertiary'
);
