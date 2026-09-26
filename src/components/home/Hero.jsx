import React from 'react';
import { Search, MapPin, ArrowDown } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import {
  HYDERABAD_AREAS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES
} from '../../data/propertiesData';

export default function Hero({ onExploreClick }) {
  const { filters, setFilter, filteredProperties, properties } = useProperty();

  return (
    <section
      className="hero-ambient-bg"
      style={{
        paddingTop: '48px',
        paddingBottom: '48px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        
        {/* Eyebrow Tag matching Screenshot */}
        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#f15a24'
            }}
          >
            HYDERABAD · SINCE DAY ONE
          </span>
        </div>

        {/* Hero Headline matching Screenshot typography */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#110e2e',
            letterSpacing: '-0.03em',
            marginBottom: '24px',
            maxWidth: '900px'
          }}
        >
          Homes built with{' '}
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontWeight: 700,
              color: '#f15a24',
              letterSpacing: '0.01em'
            }}
          >
            room
          </span>
          <br />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontWeight: 700,
              color: '#f15a24',
              letterSpacing: '0.01em'
            }}
          >
            to breathe.
          </span>
        </h1>

        {/* Hero Subtitle matching Screenshot */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.1875rem)',
            lineHeight: 1.6,
            color: '#475569',
            maxWidth: '560px',
            marginBottom: '36px'
          }}
        >
          Explore our apartments and villas — filter by area, walk through photos and videos, and download detailed brochures.
        </p>

        {/* Search & Area Controls Row matching Screenshot */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '20px',
            maxWidth: '680px'
          }}
        >
          {/* Search Input Box */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 300px',
              minWidth: '260px'
            }}
          >
            <input
              type="text"
              placeholder="Search by name or area"
              value={filters.searchQuery}
              onChange={(e) => setFilter('searchQuery', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px 12px 42px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                fontSize: '0.9375rem',
                color: '#1e293b',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#f15a24'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <Search
              size={18}
              color="#94a3b8"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </div>

          {/* Area Selector Dropdown */}
          <div
            style={{
              position: 'relative',
              flex: '0 1 180px',
              minWidth: '150px'
            }}
          >
            <select
              value={filters.area}
              onChange={(e) => setFilter('area', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 34px 12px 38px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                fontSize: '0.9375rem',
                color: '#334155',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                appearance: 'none',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: 500
              }}
            >
              {HYDERABAD_AREAS.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <MapPin
              size={17}
              color="#94a3b8"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: '0.75rem',
                color: '#94a3b8'
              }}
            >
              ▼
            </span>
          </div>
        </div>

        {/* Filter Pills Row matching Screenshot */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px'
          }}
        >
          {/* Status Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PROPERTY_STATUSES.map(status => (
              <button
                key={status}
                onClick={() => setFilter('status', status)}
                className={`filter-pill ${filters.status === status ? 'active' : ''}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '22px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />

          {/* Type Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PROPERTY_TYPES.slice(0, 3).map(type => (
              <button
                key={type}
                onClick={() => setFilter('type', type)}
                className={`filter-pill ${filters.type === type ? 'active' : ''}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter and Explore Button matching Screenshot */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <span style={{ fontSize: '0.9375rem', color: '#475569', fontWeight: 500 }}>
            Showing <strong>{filteredProperties.length}</strong> of {properties.length} projects
          </span>

          <button
            onClick={onExploreClick}
            className="btn-primary"
            style={{
              padding: '10px 22px',
              fontSize: '0.9375rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span>Explore projects</span>
            <ArrowDown size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
