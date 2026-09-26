import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, ArrowRight, Layers, FileDown, Eye, Check } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite, isInCompare, addToCompare, openModal } = useProperty();

  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  return (
    <div className="property-card" style={{ position: 'relative' }}>
      
      {/* Top Image Section */}
      <div className="card-img-wrapper">
        <Link to={`/property/${property.id}`}>
          <img
            src={property.heroImage}
            alt={property.name}
            className="card-img"
            loading="lazy"
          />
        </Link>

        {/* Floating Status Pill (Top-Left) matching Screenshot */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            zIndex: 2
          }}
        >
          <span className="badge-status">
            {property.statusBadge || property.status}
          </span>
        </div>

        {/* Action icons (Top-Right): Favorite & Compare */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 2,
            display: 'flex',
            gap: '8px'
          }}
        >
          {/* Compare Toggle */}
          <button
            onClick={() => addToCompare(property.id)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: compared ? '#110e2e' : 'rgba(255, 255, 255, 0.92)',
              color: compared ? '#ffffff' : '#334155',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            title={compared ? 'Remove from compare' : 'Add to compare'}
          >
            {compared ? <Check size={16} color="#10b981" /> : <Layers size={16} />}
          </button>

          {/* Favorite Heart */}
          <button
            onClick={() => toggleFavorite(property.id)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            aria-label="Save property"
          >
            <Heart
              size={18}
              color={favorited ? '#f15a24' : '#475569'}
              fill={favorited ? '#f15a24' : 'none'}
            />
          </button>
        </div>
      </div>

      {/* Card Content matching Screenshots */}
      <div style={{ padding: '20px 22px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Category Eyebrow in Coral Uppercase */}
        <div style={{ marginBottom: '6px' }}>
          <span className="badge-category">
            {property.category || property.type.toUpperCase()}
          </span>
        </div>

        {/* Property Title in Editorial Serif */}
        <Link to={`/property/${property.id}`} style={{ textDecoration: 'none' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#110e2e',
              marginBottom: '6px',
              lineHeight: 1.25,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#f15a24'}
            onMouseLeave={e => e.currentTarget.style.color = '#110e2e'}
          >
            {property.name}
          </h3>
        </Link>

        {/* Location with Map Pin */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#64748b',
            fontSize: '0.875rem',
            marginBottom: '18px'
          }}
        >
          <MapPin size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
          <span>{property.location.area}, {property.location.city}</span>
        </div>

        {/* Bottom Specifications Bar matching Screenshots */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '14px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          {/* Configurations */}
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>
            {property.bhkDisplay || property.configurations.join(' & ')}
          </div>

          {/* Pricing */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#110e2e'
            }}
          >
            {property.priceDisplay}
          </div>
        </div>

        {/* Quick Action Hover Bar */}
        <div
          style={{
            marginTop: '14px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}
        >
          <button
            onClick={() => openModal('brochure', property)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 10px',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#334155',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#fff7ed';
              e.currentTarget.style.borderColor = '#fdba74';
              e.currentTarget.style.color = '#c2410c';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#334155';
            }}
          >
            <FileDown size={14} />
            <span>Brochure</span>
          </button>

          <Link
            to={`/property/${property.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 10px',
              borderRadius: '10px',
              backgroundColor: '#110e2e',
              border: 'none',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#ffffff',
              transition: 'all 0.2s',
              textDecoration: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f15a24'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#110e2e'}
          >
            <span>Explore</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>

    </div>
  );
}
