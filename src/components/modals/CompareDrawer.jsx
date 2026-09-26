import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import { PROPERTIES_DATA } from '../../data/propertiesData';

export default function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare } = useProperty();

  if (compareList.length === 0) return null;

  const comparedProperties = PROPERTIES_DATA.filter(p => compareList.includes(p.id));

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        backgroundColor: '#110e2e',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '24px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        maxWidth: '92vw',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(241, 90, 36, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f15a24'
          }}
        >
          <Layers size={18} />
        </div>
        <div>
          <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
            Compare ({compareList.length}/4)
          </span>
          <p style={{ fontSize: '0.75rem', color: '#9490b8', margin: 0 }}>
            Side-by-side specs & pricing
          </p>
        </div>
      </div>

      {/* Selected Items Thumbnails */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {comparedProperties.map(prop => (
          <div
            key={prop.id}
            style={{
              position: 'relative',
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1.5px solid #f15a24'
            }}
            title={prop.name}
          >
            <img src={prop.heroImage} alt={prop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button
              onClick={() => removeFromCompare(prop.id)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '18px',
                height: '18px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Remove"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link
          to="/compare"
          className="btn-primary"
          style={{
            padding: '8px 18px',
            fontSize: '0.875rem',
            textDecoration: 'none'
          }}
        >
          <span>Compare Now</span>
          <ArrowRight size={15} />
        </Link>

        <button
          onClick={clearCompare}
          style={{
            color: '#9490b8',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '0.8rem',
            cursor: 'pointer',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="Clear all"
        >
          <Trash2 size={14} />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}
