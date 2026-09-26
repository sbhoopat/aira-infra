import React from 'react';
import { LOCATIONS_DATA } from '../../data/locationsData';
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import { useNavigate } from 'react-router-dom';

export default function LocationHighlights() {
  const { setFilter } = useProperty();
  const navigate = useNavigate();

  const handleSelectArea = (areaName) => {
    setFilter('area', areaName);
    navigate(`/properties?area=${encodeURIComponent(areaName)}`);
  };

  return (
    <section style={{ padding: '72px 0' }}>
      <div className="container">
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          <div>
            <span className="badge-category" style={{ display: 'block', marginBottom: '8px' }}>
              HIGH GROWTH DESTINATIONS
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)',
                fontWeight: 700,
                color: '#110e2e'
              }}
            >
              Hyderabad's Prime Residential Corridors
            </h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', maxWidth: '420px', margin: 0 }}>
            Strategically situated along the Outer Ring Road (ORR) and Financial District with proven high capital appreciation.
          </p>
        </div>

        {/* Location Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px'
          }}
        >
          {LOCATIONS_DATA.map((loc) => (
            <div
              key={loc.id}
              onClick={() => handleSelectArea(loc.name)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid #edf0f3',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
              }}
            >
              <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                <img
                  src={loc.image}
                  alt={loc.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17,14,46,0.85) 0%, rgba(17,14,46,0) 60%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '16px',
                    right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#ffffff'
                  }}
                >
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                      {loc.name}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#fed7aa' }}>
                      {loc.activeProjects} Aira Communities
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'rgba(16, 185, 129, 0.25)',
                      backdropFilter: 'blur(4px)',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#6ee7b7'
                    }}
                  >
                    <TrendingUp size={13} />
                    <span>{loc.growthRate}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '14px', flex: 1 }}>
                  {loc.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#110e2e'
                  }}
                >
                  <span style={{ color: '#64748b' }}>Avg. Benchmark:</span>
                  <span style={{ color: '#f15a24', fontWeight: 700 }}>{loc.averagePrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
