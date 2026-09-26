import React, { useState } from 'react';
import {
  Sparkles,
  Waves,
  Dumbbell,
  Shield,
  Trees,
  Car,
  Tv,
  Users,
  Compass,
  Zap,
  Flame,
  BookOpen,
  Coffee,
  Check
} from 'lucide-react';
import { ALL_AMENITIES } from '../../data/amenitiesData';

export default function AmenitiesSection({ propertyAmenities = [] }) {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Clubhouse & Leisure', 'Sports & Fitness', 'Wellness & Nature', 'Safety & Green Tech'];

  // Map icon
  const getAmenityIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('pool')) return <Waves size={22} color="#f15a24" />;
    if (n.includes('gym') || n.includes('fitness')) return <Dumbbell size={22} color="#f15a24" />;
    if (n.includes('security') || n.includes('cctv')) return <Shield size={22} color="#f15a24" />;
    if (n.includes('ev charging')) return <Car size={22} color="#f15a24" />;
    if (n.includes('garden') || n.includes('trees') || n.includes('farm')) return <Trees size={22} color="#f15a24" />;
    if (n.includes('power') || n.includes('backup')) return <Zap size={22} color="#f15a24" />;
    if (n.includes('theatre')) return <Tv size={22} color="#f15a24" />;
    if (n.includes('yoga') || n.includes('spa')) return <Sparkles size={22} color="#f15a24" />;
    if (n.includes('library')) return <BookOpen size={22} color="#f15a24" />;
    return <Users size={22} color="#f15a24" />;
  };

  const amenitiesList = propertyAmenities.length > 0
    ? ALL_AMENITIES.filter(a => propertyAmenities.includes(a.name))
    : ALL_AMENITIES;

  const filtered = activeTab === 'All'
    ? amenitiesList
    : amenitiesList.filter(a => a.category === activeTab);

  return (
    <div
      id="amenities-section"
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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <span className="badge-category" style={{ display: 'block', marginBottom: '6px' }}>
            WORLD-CLASS EXPERIENCES
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
            Exclusive Lifestyle Amenities
          </h3>
        </div>

        {/* Categories Tab */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: activeTab === cat ? '1px solid #f15a24' : '1px solid #e2e8f0',
                backgroundColor: activeTab === cat ? '#fff6f2' : '#ffffff',
                color: activeTab === cat ? '#f15a24' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {filtered.map((amenity, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px 18px',
              borderRadius: '16px',
              backgroundColor: '#fbfbfa',
              border: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#fdba74';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(241, 90, 36, 0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#fbfbfa';
              e.currentTarget.style.borderColor = '#f1f5f9';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#fff7ed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {getAmenityIcon(amenity.name)}
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
                {amenity.name}
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {amenity.category}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
