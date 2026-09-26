import React from 'react';
import PropertyGrid from '../property/PropertyGrid';
import { useProperty } from '../../context/PropertyContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedProjects({ sectionRef }) {
  const { filteredProperties } = useProperty();

  return (
    <section
      ref={sectionRef}
      id="featured-projects"
      style={{
        paddingTop: '20px',
        paddingBottom: '60px'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '32px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-category">FLAGSHIP DEVELOPMENTS</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
                fontWeight: 700,
                color: '#110e2e',
                lineHeight: 1.2
              }}
            >
              Curated Living Spaces in Hyderabad
            </h2>
          </div>

          <Link
            to="/properties"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: '#f15a24',
              textDecoration: 'none'
            }}
          >
            <span>View all projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <PropertyGrid properties={filteredProperties} />

      </div>
    </section>
  );
}
