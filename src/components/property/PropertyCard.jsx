import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, ArrowRight, Layers, FileDown, Eye, Check, Phone, MessageCircle } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite, isInCompare, addToCompare, openModal, deleteProperty } = useProperty();
  const { isAdmin } = useAuth();


  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  return (
    <div className="property-card" style={{ position: 'relative' }}>
      
      {/* Top Image Section */}
      <div className="card-img-wrapper">
        <Link to={`/property/${property.id}`}>
          <img
            src={(() => {
              // Array of luxury real estate placeholders
              const placeholders = [
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1600607687931-cebf1036f585?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
              ];
              
              const pId = property.id || property.name || 'default';
              const imgIndex = pId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % placeholders.length;

              if (!property.heroImage || property.heroImage.includes('placeholder-property.jpg')) {
                return placeholders[imgIndex];
              }
              return property.heroImage;
            })()}
            alt={property.name}
            className="card-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null; 
              const placeholders = [
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1600607687931-cebf1036f585?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
              ];
              const pId = property.id || property.name || 'default';
              const imgIndex = pId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % placeholders.length;
              e.target.src = placeholders[imgIndex];
            }}
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
            {Array.isArray(property.configurations) ? property.configurations.join(', ') : property.configurations || 'N/A'}
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
            {property.priceDisplay || property.price_display || 'On Request'}
          </div>
        </div>

        {/* Quick Action Hover Bar */}
        <div
          style={{
            marginTop: '14px',
            display: 'flex',
            gap: '6px'
          }}
        >
          <button
            onClick={() => openModal('brochure', property)}
            style={{
              flex: 1,
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
              flex: 1,
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

          <a
            href="tel:8886087778"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '10px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s',
              border: '1px solid #3b82f6'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2563eb'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#3b82f6'; }}
          >
            <Phone size={14} />
          </a>

          <a
            href="https://wa.me/918886087778"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '10px',
              backgroundColor: '#25D366',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s',
              border: '1px solid #25D366'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#16a34a'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#25D366'; }}
          >
            <MessageCircle size={14} />
          </a>
        </div>

        {/* Admin Quick Control Bar (Visible ONLY to logged in Admins) */}
        {isAdmin && (
          <div
            style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px dashed #fdba74',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff7ed',
              padding: '6px 10px',
              borderRadius: '8px'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c2410c' }}>
              ⚙️ Admin Mode
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Link
                to={`/admin`}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#0369a1',
                  backgroundColor: '#e0f2fe',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  textDecoration: 'none'
                }}
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (window.confirm(`Delete project "${property.name}"?`)) {
                    deleteProperty(property.id);
                  }
                }}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#dc2626',
                  backgroundColor: '#fee2e2',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}

      </div>

    </div>

  );
}
