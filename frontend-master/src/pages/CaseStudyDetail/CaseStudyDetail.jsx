import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../../client';
import { PortableText } from '@portabletext/react';
import './CaseStudyDetail.scss';

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedStudies, setRelatedStudies] = useState([]);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        
        // Fetch the specific case study
        const caseStudyQuery = `*[_type == "caseStudies" && slug.current == "${slug}"][0]`;
        const caseStudyData = await client.fetch(caseStudyQuery);
        
        if (!caseStudyData) {
          console.error('Case study not found');
          navigate('/case-studies');
          return;
        }
        
        setCaseStudy(caseStudyData);

        // Fetch related case studies (same category, exclude current)
        if (caseStudyData.category) {
          const relatedQuery = `*[_type == "caseStudies" && category == "${caseStudyData.category}" && slug.current != "${slug}"] | order(order desc)[0...3]`;
          const relatedData = await client.fetch(relatedQuery);
          setRelatedStudies(relatedData);
        }
      } catch (err) {
        console.error('Error fetching case study:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="case-study-detail loading">
        <div className="loading-spinner">
          <div className="spinner" />
          <p>Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return null;
  }

  return (
    <div className="case-study-detail">
      {/* Back Button */}
      <motion.div
        className="back-button-container"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/case-studies" className="back-button">
          ← Back to Case Studies
        </Link>
      </motion.div>

      {/* Header Section */}
      <motion.div
        className="case-study-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {caseStudy.category && (
          <span className="category">{caseStudy.category}</span>
        )}
        
        <h1>{caseStudy.title}</h1>
        
        {caseStudy.headline && (
          <p className="headline">{caseStudy.headline}</p>
        )}

        {caseStudy.tags && caseStudy.tags.length > 0 && (
          <div className="tags">
            {caseStudy.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Profile Picture / Hero Image */}
      {caseStudy.profilePicture && (
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={urlFor(caseStudy.profilePicture)} alt={caseStudy.title} />
        </motion.div>
      )}

      {/* Short Description */}
      {caseStudy.shortDescription && (
        <motion.div
          className="short-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>{caseStudy.shortDescription}</p>
        </motion.div>
      )}

      {/* Full Description */}
      {caseStudy.fullDescription && (
        <motion.div
          className="full-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PortableText value={caseStudy.fullDescription} />
        </motion.div>
      )}

      {/* Case Study Diagram */}
      {caseStudy.caseStudyDiagram && (
        <motion.div
          className="case-study-diagram"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2>Architecture & Design</h2>
          <div className="diagram-container">
            <img src={urlFor(caseStudy.caseStudyDiagram)} alt={`${caseStudy.title} Architecture Diagram`} />
          </div>
        </motion.div>
      )}

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <motion.div
          className="related-studies"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2>Related Case Studies</h2>
          <div className="related-grid">
            {relatedStudies.map((study) => (
              <Link
                key={study._id}
                to={`/case-studies/${study.slug?.current || study._id}`}
                className="related-card"
              >
                {study.profilePicture && (
                  <div className="related-image">
                    <img src={urlFor(study.profilePicture)} alt={study.title} />
                  </div>
                )}
                <div className="related-content">
                  {study.category && <span className="category">{study.category}</span>}
                  <h3>{study.title}</h3>
                  {study.shortDescription && (
                    <p>{study.shortDescription}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.div
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="cta-content">
          <h2>Interested in working together?</h2>
          <p>Let's discuss how I can help with your next project</p>
          <a href="https://calendly.com/your-scheduling-link" target="_blank" rel="noreferrer" className="btn btn-primary">
            Schedule a Call
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default CaseStudyDetail;

