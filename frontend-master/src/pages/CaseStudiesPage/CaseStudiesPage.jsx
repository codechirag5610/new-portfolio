import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../client';
import './CaseStudiesPage.scss';

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [filteredStudies, setFilteredStudies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const caseStudiesQuery = '*[_type == "caseStudies"] | order(order desc)';
    
    client.fetch(caseStudiesQuery)
      .then((data) => {
        console.log('Fetched case studies:', data);
        console.log('Case studies count:', data.length);
        
        // Check for duplicates by title
        const titles = data.map(study => study.title);
        const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index);
        if (duplicateTitles.length > 0) {
          console.warn('Duplicate case study titles found:', duplicateTitles);
        }
        
        // Check for duplicates by _id
        const ids = data.map(study => study._id);
        const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
        if (duplicateIds.length > 0) {
          console.warn('Duplicate case study IDs found:', duplicateIds);
        }
        
        // Remove duplicates based on _id
        const uniqueCaseStudies = data.filter((study, index, self) => 
          index === self.findIndex(s => s._id === study._id)
        );
        
        console.log('After deduplication:', uniqueCaseStudies.length, 'case studies');
        
        setCaseStudies(uniqueCaseStudies);
        setFilteredStudies(uniqueCaseStudies);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(study => study.category).filter(Boolean))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error('Error fetching case studies:', err));
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredStudies(caseStudies);
    } else {
      setFilteredStudies(caseStudies.filter(study => study.category === category));
    }
  };

  return (
    <div className="case-studies-page">
      <motion.div
        className="case-studies-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Case Studies</h1>
        <p>Explore my technical solutions, architecture designs, and project implementations</p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        className="category-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Case Studies Grid */}
      <div className="case-studies-grid">
        {filteredStudies.map((caseStudy, index) => (
          <motion.div
            key={caseStudy._id || `case-study-${index}`}
            className="case-study-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Link to={`/case-studies/${caseStudy.slug?.current || caseStudy._id}`} className="card-link">
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
                
                {caseStudy.headline && (
                  <p className="headline">{caseStudy.headline}</p>
                )}
                
                <p className="description">{caseStudy.shortDescription}</p>
                
                {caseStudy.tags && caseStudy.tags.length > 0 && (
                  <div className="tags">
                    {caseStudy.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="read-more">
                  Read More →
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <motion.div
          className="no-case-studies"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            {selectedCategory === 'All' 
              ? 'No case studies available yet. Check back soon!' 
              : `No case studies found in the "${selectedCategory}" category.`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CaseStudiesPage;

