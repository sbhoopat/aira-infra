import React from 'react';
import {
  Waves,
  Building2,
  Dumbbell,
  Zap,
  Trophy,
  Activity,
  ShieldCheck,
  Smile,
  Trees,
  HeartHandshake,
  Power
} from 'lucide-react';
import { AMENITIES_CATALOG } from '../../data/amenitiesData';

export default function AmenitiesShowcase() {
  const iconMap = {
    Waves: <Waves size={24} color="#f15a24" />,
    Building2: <Building2 size={24} color="#f15a24" />,
    Dumbbell: <Dumbbell size={24} color="#f15a24" />,
    Zap: <Zap size={24} color="#f15a24" />,
    Trophy: <Trophy size={24} color="#f15a24" />,
    Activity: <Activity size={24} color="#f15a24" />,
    ShieldCheck: <ShieldCheck size={24} color="#f15a24" />,
    Smile: <Smile size={24} color="#f15a24" />,
    Trees: <Trees size={24} color="#f15a24" />,
    HeartHandshake: <HeartHandshake size={24} color="#f15a24" />,
    Power: <Power size={24} color="#f15a24" />
  };

  return (
    <section style={{ padding: '72px 0', backgroundColor: '#fcfcfb' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <span className="badge-category" style={{ display: 'block', marginBottom: '8px' }}>
            RESORT-GRADE LIVING
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)',
              fontWeight: 700,
              color: '#110e2e',
              lineHeight: 1.25,
              marginBottom: '12px'
            }}
          >
            Curated Amenities for Every Generation
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
            Over 40+ lifestyle amenities designed to elevate health, recreation, wellness, and community bonding.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px'
          }}
        >
          {AMENITIES_CATALOG.slice(0, 8).map(amenity => (
            <div
              key={amenity.id}
              style={{
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #edf0f3',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#fdba74';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#edf0f3';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#fff7ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {iconMap[amenity.icon] || <Waves size={24} color="#f15a24" />}
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#110e2e', marginBottom: '4px' }}>
                  {amenity.name}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.4, margin: 0 }}>
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
