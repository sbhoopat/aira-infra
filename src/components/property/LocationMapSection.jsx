import React, { useState } from 'react';
import { MapPin, Building, GraduationCap, Cross, ShoppingBag, Plane, Car, Clock } from 'lucide-react';

export default function LocationMapSection({ property }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const landmarks = property.nearbyLandmarks || [];
  const categories = ['All', 'Offices & IT Hubs', 'Schools', 'Hospitals', 'Shopping', 'Transit'];

  const filteredLandmarks = selectedCategory === 'All'
    ? landmarks
    : landmarks.filter(l => l.category === selectedCategory);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Offices & IT Hubs':
        return <Building size={16} color="#f15a24" />;
      case 'Schools':
        return <GraduationCap size={16} color="#f15a24" />;
      case 'Hospitals':
        return <Cross size={16} color="#f15a24" />;
      case 'Shopping':
        return <ShoppingBag size={16} color="#f15a24" />;
      case 'Transit':
        return <Plane size={16} color="#f15a24" />;
      default:
        return <MapPin size={16} color="#f15a24" />;
    }
  };

  const lat = property.location?.coordinates?.lat || 17.4125;
  const lng = property.location?.coordinates?.lng || 78.3276;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.04}%2C${lat - 0.03}%2C${lng + 0.04}%2C${lat + 0.03}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #edf0f3',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <span className="badge-category" style={{ display: 'block', marginBottom: '4px' }}>
          STRATEGIC CONNECTIVITY
        </span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#110e2e', margin: '0 0 6px' }}>
          Location Advantages & Nearby Hubs
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.9375rem', margin: 0 }}>
          {property.location.fullAddress}
        </p>
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px'
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              backgroundColor: selectedCategory === cat ? '#110e2e' : '#f8fafc',
              color: selectedCategory === cat ? '#ffffff' : '#475569',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map & Landmark Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Map Frame */}
        <div style={{ height: '340px', borderRadius: '18px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <iframe
            title={`${property.name} Location Map`}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={mapUrl}
            style={{ border: 0 }}
          />
        </div>

        {/* Landmarks List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: '340px',
            overflowY: 'auto',
            paddingRight: '6px'
          }}
        >
          {filteredLandmarks.map((landmark, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: '#fbfbfa',
                border: '1px solid #edf0f3'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#fff7ed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getCategoryIcon(landmark.category)}
                </div>
                <div>
                  <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
                    {landmark.name}
                  </h5>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {landmark.category}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#f15a24' }}>
                  {landmark.time}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {landmark.distance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
