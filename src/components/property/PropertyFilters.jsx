import React from 'react';
import {
  Search,
  MapPin,
  Building,
  RotateCcw,
  Check,
  ShieldCheck,
  IndianRupee,
  Maximize2,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import {
  HYDERABAD_AREAS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
  BHK_OPTIONS
} from '../../data/propertiesData';
import { ALL_AMENITIES } from '../../data/amenitiesData';
import { formatCurrencyINR } from '../../utils/formatters';

export default function PropertyFilters({ isMobileModal = false, onCloseMobile = null }) {
  const { filters, setFilter, resetFilters, filteredProperties, properties } = useProperty();

  const handleBhkToggle = (bhkVal) => {
    const currentBhks = filters.bhk || [];
    if (currentBhks.includes(bhkVal)) {
      setFilter('bhk', currentBhks.filter(b => b !== bhkVal));
    } else {
      setFilter('bhk', [...currentBhks, bhkVal]);
    }
  };

  const handleAmenityToggle = (amenityName) => {
    const currentAmenities = filters.amenities || [];
    if (currentAmenities.includes(amenityName)) {
      setFilter('amenities', currentAmenities.filter(a => a !== amenityName));
    } else {
      setFilter('amenities', [...currentAmenities, amenityName]);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: isMobileModal ? '0' : '20px',
        border: isMobileModal ? 'none' : '1px solid #edf0f3',
        padding: isMobileModal ? '20px' : '24px',
        boxShadow: isMobileModal ? 'none' : '0 2px 12px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid #f1f5f9'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={18} color="#f15a24" />
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
            Filters
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={resetFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8125rem',
              color: '#f15a24',
              fontWeight: 600,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
          {isMobileModal && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
          Search Keywords
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Project name, builder, area..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 36px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Location / Area */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
          Location in Hyderabad
        </label>
        <div style={{ position: 'relative' }}>
          <select
            value={filters.area}
            onChange={(e) => setFilter('area', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 32px 10px 36px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              fontSize: '0.875rem',
              color: '#334155',
              outline: 'none',
              appearance: 'none',
              cursor: 'pointer'
            }}
          >
            {HYDERABAD_AREAS.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <MapPin size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '0.75rem', color: '#94a3b8' }}>▼</span>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
          Property Type
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PROPERTY_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setFilter('type', type)}
              className={`filter-pill ${filters.type === type ? 'active' : ''}`}
              style={{ fontSize: '0.8125rem', padding: '6px 14px' }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Possession Status */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
          Possession Status
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PROPERTY_STATUSES.map(st => (
            <button
              key={st}
              onClick={() => setFilter('status', st)}
              className={`filter-pill ${filters.status === st ? 'active' : ''}`}
              style={{ fontSize: '0.8125rem', padding: '6px 14px' }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* BHK Configurations */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
          Bedrooms (BHK)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {BHK_OPTIONS.map(bhk => {
            const isSelected = (filters.bhk || []).includes(bhk);
            return (
              <button
                key={bhk}
                onClick={() => handleBhkToggle(bhk)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  border: isSelected ? '1.5px solid #f15a24' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#fff6f2' : '#ffffff',
                  color: isSelected ? '#f15a24' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {bhk}
              </button>
            );
          })}
        </div>
      </div>

      {/* Removed Max Budget, TG-RERA, and Amenities since they are not in local_db.json */}

      {/* Results Count & Apply CTA (Especially on mobile) */}
      {isMobileModal && (
        <div style={{ paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={onCloseMobile}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Show {filteredProperties.length} Properties
          </button>
        </div>
      )}

    </div>
  );
}
