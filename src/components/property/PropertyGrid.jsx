import React from 'react';
import PropertyCard from './PropertyCard';
import { SearchX, RotateCcw } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function PropertyGrid({ properties, viewMode = 'grid' }) {
  const { resetFilters } = useProperty();

  if (!properties || properties.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '64px 20px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px dashed #cbd5e1',
          margin: '20px 0'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#fff7ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#f15a24'
          }}
        >
          <SearchX size={32} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#110e2e', marginBottom: '8px' }}>
          No Matching Properties Found
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.9375rem', maxWidth: '420px', margin: '0 auto 20px' }}>
          We couldn't find any homes matching your exact filter criteria. Try expanding your budget range or selecting "All areas".
        </p>
        <button
          onClick={resetFilters}
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.875rem' }}
        >
          <RotateCcw size={16} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '28px'
      }}
    >
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
