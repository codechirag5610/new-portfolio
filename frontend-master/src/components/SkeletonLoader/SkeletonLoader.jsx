import React from 'react';
import { motion } from 'framer-motion';
import './SkeletonLoader.scss';

// Generic skeleton box
export const SkeletonBox = ({ width = '100%', height = '20px', borderRadius = '8px', className = '' }) => (
  <motion.div
    className={`skeleton-box ${className}`}
    style={{ width, height, borderRadius }}
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
);

// Skeleton for work experience items
export const WorkExperienceSkeleton = () => (
  <div className="skeleton-work">
    {[1, 2, 3].map((item) => (
      <div key={item} className="skeleton-work-item">
        <div className="skeleton-company">
          <SkeletonBox width="200px" height="24px" />
        </div>
        <div className="skeleton-timeline">
          <div className="skeleton-year">
            <SkeletonBox width="80px" height="32px" borderRadius="6px" />
          </div>
          <div className="skeleton-job">
            <SkeletonBox width="100%" height="20px" />
            <SkeletonBox width="150px" height="16px" />
            <SkeletonBox width="100%" height="60px" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Skeleton for skills grid
export const SkillsSkeleton = () => (
  <div className="skeleton-skills">
    <div className="skeleton-filters">
      {[1, 2, 3, 4].map((item) => (
        <SkeletonBox key={item} width="120px" height="36px" borderRadius="12px" />
      ))}
    </div>
    <div className="skeleton-skills-grid">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className="skeleton-skill-card">
          <SkeletonBox width="48px" height="48px" borderRadius="50%" />
          <SkeletonBox width="80px" height="16px" />
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for projects grid
export const ProjectsSkeleton = () => (
  <div className="skeleton-projects">
    <div className="skeleton-filters">
      {[1, 2, 3, 4].map((item) => (
        <SkeletonBox key={item} width="100px" height="36px" borderRadius="12px" />
      ))}
    </div>
    <div className="skeleton-projects-grid">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="skeleton-project-card">
          <SkeletonBox width="100%" height="200px" borderRadius="12px" />
          <div className="skeleton-project-info">
            <SkeletonBox width="100%" height="24px" />
            <SkeletonBox width="100%" height="60px" />
            <div className="skeleton-tags">
              <SkeletonBox width="60px" height="24px" borderRadius="12px" />
              <SkeletonBox width="80px" height="24px" borderRadius="12px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for certifications
export const CertificationsSkeleton = () => (
  <div className="skeleton-certifications">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="skeleton-cert-card">
        <SkeletonBox width="100%" height="180px" borderRadius="12px" />
        <div className="skeleton-cert-info">
          <SkeletonBox width="100%" height="20px" />
          <SkeletonBox width="60px" height="16px" />
        </div>
      </div>
    ))}
  </div>
);

// Skeleton for education
export const EducationSkeleton = () => (
  <div className="skeleton-education">
    {[1, 2].map((item) => (
      <div key={item} className="skeleton-edu-card">
        <SkeletonBox width="100%" height="24px" />
        <SkeletonBox width="80%" height="18px" />
        <SkeletonBox width="60%" height="16px" />
        <SkeletonBox width="100%" height="60px" />
      </div>
    ))}
  </div>
);

// Skeleton for case studies
export const CaseStudiesSkeleton = () => (
  <div className="skeleton-case-studies">
    {[1, 2, 3].map((item) => (
      <div key={item} className="skeleton-case-card">
        <SkeletonBox width="100%" height="250px" borderRadius="12px" />
        <div className="skeleton-case-info">
          <SkeletonBox width="100%" height="28px" />
          <SkeletonBox width="100%" height="60px" />
          <SkeletonBox width="120px" height="40px" borderRadius="8px" />
        </div>
      </div>
    ))}
  </div>
);

const SkeletonLoader = ({ type = 'work' }) => {
  switch (type) {
    case 'work':
      return <WorkExperienceSkeleton />;
    case 'skills':
      return <SkillsSkeleton />;
    case 'projects':
      return <ProjectsSkeleton />;
    case 'certifications':
      return <CertificationsSkeleton />;
    case 'education':
      return <EducationSkeleton />;
    case 'caseStudies':
      return <CaseStudiesSkeleton />;
    default:
      return <WorkExperienceSkeleton />;
  }
};

export default SkeletonLoader;

