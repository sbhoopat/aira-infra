import React, { useState } from 'react';
import { Search, MapPin, ArrowDown } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import {
  HYDERABAD_AREAS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES
} from '../../data/propertiesData';

export default function Hero({ onExploreClick }) {
  const { filters, setFilter, filteredProperties, properties } = useProperty();
  
  // YouTube Video State
  const YOUTUBE_VIDEO_ID = 'Pa6bW6Xgr6g';
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section
      className="hero-section-wrapper"
      style={{
        paddingTop: '56px',
        paddingBottom: '56px',
        position: 'relative',
        minHeight: '620px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0a0915'
      }}
    >
      {/* 1. Background Video Layer - 100% Clear & Vivid */}
      <div className="hero-video-container" aria-hidden="true">
        {/* Poster Fallback Image before video starts */}
        <img
          src="https://img.youtube.com/vi/Pa6bW6Xgr6g/maxresdefault.jpg"
          alt="Luxury modern architecture home"
          className="hero-video-poster"
          style={{
            opacity: isVideoLoaded ? 0 : 0.9,
            pointerEvents: 'none',
            display: isVideoLoaded ? 'none' : 'block'
          }}
        />

        {/* Scaled YouTube Iframe Background */}
        <div
          className="hero-video-iframe-wrapper"
          style={{ opacity: isVideoLoaded ? 1 : 0 }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1`}
            title="Homes Built With Room to Breathe Background Video"
            allow="autoplay; encrypted-media"
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
      </div>

      {/* 2. Ultra-Light Scrim for Clean Video Visibility */}
      <div className="hero-video-scrim scrim-clear" />

      {/* 3. Hero Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        
        {/* Eyebrow Tag */}
        <div style={{ marginBottom: '18px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#f15a24',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              display: 'inline-block'
            }}
          >
            HYDERABAD · SINCE DAY ONE
          </span>
        </div>

        {/* Hero Headline: "Homes built with room to breathe." */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#0f172a',
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            maxWidth: '920px',
            textShadow: '0 2px 16px rgba(255, 255, 255, 0.95), 0 0 30px rgba(255, 255, 255, 0.8), 0 4px 8px rgba(0, 0, 0, 0.25)'
          }}
        >
          Homes built with{' '}
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontWeight: 800,
              color: '#f15a24',
              letterSpacing: '0.01em',
              textShadow: '0 2px 20px rgba(241, 90, 36, 0.35), 0 2px 10px rgba(255, 255, 255, 0.9)'
            }}
          >
            room
          </span>
          <br />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontWeight: 800,
              color: '#f15a24',
              letterSpacing: '0.01em',
              textShadow: '0 2px 20px rgba(241, 90, 36, 0.35), 0 2px 10px rgba(255, 255, 255, 0.9)'
            }}
          >
            to breathe.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <div
          style={{
            maxWidth: '580px',
            marginBottom: '32px'
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.1875rem)',
              lineHeight: 1.6,
              color: '#0f172a',
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(12px)',
              padding: '12px 18px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              margin: 0
            }}
          >
            Explore our apartments and villas — filter by area, walk through photos and videos, and download detailed brochures.
          </p>
        </div>

        {/* Search & Area Controls Row */}
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
                padding: '14px 18px 14px 44px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(14px)',
                fontSize: '0.9375rem',
                color: '#1e293b',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                outline: 'none',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f15a24';
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.boxShadow = '0 8px 24px rgba(241, 90, 36, 0.25)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.12)';
              }}
            />
            <Search
              size={18}
              color="#f15a24"
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
              flex: '0 1 190px',
              minWidth: '160px'
            }}
          >
            <select
              value={filters.area}
              onChange={(e) => setFilter('area', e.target.value)}
              style={{
                width: '100%',
                padding: '14px 36px 14px 40px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(14px)',
                fontSize: '0.9375rem',
                color: '#1e293b',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                appearance: 'none',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: 600
              }}
            >
              {HYDERABAD_AREAS.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <MapPin
              size={17}
              color="#f15a24"
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
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: '0.75rem',
                color: '#64748b'
              }}
            >
              ▼
            </span>
          </div>
        </div>

        {/* Filter Pills Row */}
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
                style={{
                  backgroundColor: filters.status === status ? 'var(--primary)' : 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontWeight: 600
                }}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '22px', backgroundColor: 'rgba(255,255,255,0.4)', margin: '0 4px' }} />

          {/* Type Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PROPERTY_TYPES.slice(0, 3).map(type => (
              <button
                key={type}
                onClick={() => setFilter('type', type)}
                className={`filter-pill ${filters.type === type ? 'active' : ''}`}
                style={{
                  backgroundColor: filters.type === type ? 'var(--primary)' : 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontWeight: 600
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter and Explore Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(10px)',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}
          >
            <span style={{ fontSize: '0.9375rem', color: '#1e293b', fontWeight: 600 }}>
              Showing <strong style={{ color: '#f15a24' }}>{filteredProperties.length}</strong> of {properties.length} projects
            </span>
          </div>

          <button
            onClick={onExploreClick}
            className="btn-primary"
            style={{
              padding: '12px 26px',
              fontSize: '0.9375rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 8px 24px rgba(241, 90, 36, 0.4)'
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
