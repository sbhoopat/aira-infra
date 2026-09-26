import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Building2, GraduationCap, Hospital, ShoppingBag, Plane } from 'lucide-react';

export default function LocationSection({ location = {}, landmarks = [], propertyName = '' }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Offices & IT Hubs', 'Schools', 'Hospitals', 'Shopping', 'Transit'];

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Offices & IT Hubs': return <Building2 size={16} color="#f15a24" />;
      case 'Schools': return <GraduationCap size={16} color="#f15a24" />;
      case 'Hospitals': return <Hospital size={16} color="#f15a24" />;
      case 'Shopping': return <ShoppingBag size={16} color="#f15a24" />;
      case 'Transit': return <Plane size={16} color="#f15a24" />;
      default: return <MapPin size={16} color="#f15a24" />;
    }
  };

  const filteredLandmarks = activeCategory === 'All'
    ? landmarks
    : landmarks.filter(l => l.category === activeCategory);

  return (
    <div
      id="location-section"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #edf0f3',
        padding: 'clamp(20px, 4vw, 36px)',
        margin: '32px 0',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <span className="badge-category" style={{ display: 'block', marginBottom: '6px' }}>
          STRATEGIC CONNECTIVITY
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#110e2e',
            margin: 0
          }}
        >
          Location & Neighborhood Advantage
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.9375rem', marginTop: '4px', marginBottom: 0 }}>
          {location.fullAddress || `${location.area}, Hyderabad, Telangana`}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}
      >
        {/* Interactive Map Visual */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '340px',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid #cbd5e1',
              backgroundColor: '#e2e8f0'
            }}
          >
            {/* Map Frame iframe mockup centered on Hyderabad */}
            <iframe
              title="Property Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(location.fullAddress || location.area + ' Hyderabad')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
            />

            {/* Floating Location Overlay Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                left: '14px',
                backgroundColor: 'rgba(17, 14, 46, 0.9)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <MapPin size={16} color="#f15a24" />
              <span>{propertyName || 'Aira Property'} · {location.area}</span>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.fullAddress || location.area + ' Hyderabad')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem' }}
          >
            <Navigation size={16} color="#f15a24" />
            <span>Open in Google Maps for Turn-by-Turn Navigation</span>
          </a>
        </div>

        {/* Nearby Landmarks Categorized List */}
        <div>
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
              marginBottom: '18px'
            }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  border: activeCategory === cat ? '1px solid #f15a24' : '1px solid #e2e8f0',
                  backgroundColor: activeCategory === cat ? '#fff6f2' : '#ffffff',
                  color: activeCategory === cat ? '#f15a24' : '#475569',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Landmarks List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '330px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredLandmarks.map((lm, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #eef2f6',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#fdba74';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#eef2f6';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#fff7ed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getCategoryIcon(lm.category)}
                  </div>
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600, color: '#110e2e', margin: 0 }}>
                      {lm.name}
                    </h5>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{lm.category}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#110e2e' }}>
                    {lm.distance}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                    <Clock size={11} />
                    <span>{lm.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
