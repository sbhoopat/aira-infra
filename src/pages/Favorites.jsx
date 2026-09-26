import React from 'react';
import { Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/property/PropertyCard';
import { Heart, ArrowRight, Trash2, Layers } from 'lucide-react';

export default function Favorites() {
  const { favorites, properties, toggleFavorite } = useProperty();

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div style={{ paddingTop: '36px', paddingBottom: '80px', backgroundColor: '#fbfbfa' }}>
      <div className="container">
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '36px',
            paddingBottom: '20px',
            borderBottom: '1px solid #edf0f3'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Heart size={18} color="#f15a24" fill="#f15a24" />
              <span className="badge-category">SAVED SHORTLIST</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                color: '#110e2e',
                lineHeight: 1.15,
                margin: 0
              }}
            >
              Your Favorite Properties ({favoriteProperties.length})
            </h1>
          </div>

          {favoriteProperties.length > 0 && (
            <Link
              to="/compare"
              className="btn-secondary"
              style={{ padding: '10px 20px', fontSize: '0.875rem' }}
            >
              <Layers size={16} color="#f15a24" />
              <span>Compare Saved Properties</span>
            </Link>
          )}
        </div>

        {/* Empty State */}
        {favoriteProperties.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '72px 24px',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px dashed #cbd5e1',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#fff7ed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#f15a24'
              }}
            >
              <Heart size={36} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#110e2e', marginBottom: '10px' }}>
              No Saved Properties Yet
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Click the heart icon on any property card or details page to bookmark your preferred homes for easy review and side-by-side comparison.
            </p>
            <Link to="/properties" className="btn-primary" style={{ padding: '12px 24px' }}>
              <span>Browse All Properties</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {favoriteProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
