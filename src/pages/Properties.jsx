import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyGrid from '../components/property/PropertyGrid';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

export default function Properties() {
  const { filteredProperties, properties, filters, setFilter, resetFilters } = useProperty();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL search params on mount or param change
  useEffect(() => {
    const areaParam = searchParams.get('area');
    const typeParam = searchParams.get('type');
    const statusParam = searchParams.get('status');
    const qParam = searchParams.get('q');

    if (areaParam) setFilter('area', areaParam);
    if (typeParam) setFilter('type', typeParam);
    if (statusParam) setFilter('status', statusParam);
    if (qParam) setFilter('searchQuery', qParam);
  }, []);

  const activeFilterCount = [
    filters.searchQuery ? 1 : 0,
    filters.area !== 'All areas' ? 1 : 0,
    filters.status !== 'All' ? 1 : 0,
    filters.type !== 'All types' ? 1 : 0,
    (filters.bhk || []).length,
    (filters.amenities || []).length,
    filters.reraOnly ? 1 : 0,
    filters.priceMax < 50000000 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '80px', backgroundColor: '#fbfbfa' }}>
      <div className="container">
        
        {/* Header Breadcrumb & Title */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge-category">HYDERABAD RESIDENTIAL PROPERTIES</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#110e2e',
              lineHeight: 1.15
            }}
          >
            Find Your Dream Home in Hyderabad
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px', maxWidth: '650px' }}>
            Browse luxury high-rise apartments, boutique garden residences, and handcrafted stone villas with RERA certification.
          </p>
        </div>

        {/* Top Control Bar: Mobile Filter Trigger, Results Count & Sorting */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            backgroundColor: '#ffffff',
            padding: '14px 20px',
            borderRadius: '16px',
            border: '1px solid #edf0f3',
            marginBottom: '24px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}
        >
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              padding: '8px 16px',
              fontSize: '0.875rem'
            }}
            id="mobile-filter-trigger"
          >
            <SlidersHorizontal size={16} color="#f15a24" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Results Summary */}
          <div style={{ fontSize: '0.9375rem', color: '#475569', fontWeight: 500 }}>
            Showing <strong>{filteredProperties.length}</strong> of {properties.length} residential properties
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={15} color="#94a3b8" />
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>Sort by:</span>
            <select
              value={filters.sortBy || 'featured'}
              onChange={(e) => setFilter('sortBy', e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                fontSize: '0.875rem',
                color: '#1e293b',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-asc">Area: Low to High</option>
              <option value="area-desc">Area: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filters Badges */}
        {activeFilterCount > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}
          >
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>Active filters:</span>
            
            {filters.searchQuery && (
              <span className="badge-status" style={{ backgroundColor: '#fff7ed', border: '1px solid #fdba74', color: '#c2410c' }}>
                Keyword: "{filters.searchQuery}"
                <X size={13} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilter('searchQuery', '')} />
              </span>
            )}
            {filters.area !== 'All areas' && (
              <span className="badge-status" style={{ backgroundColor: '#fff7ed', border: '1px solid #fdba74', color: '#c2410c' }}>
                Area: {filters.area}
                <X size={13} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilter('area', 'All areas')} />
              </span>
            )}
            {filters.type !== 'All types' && (
              <span className="badge-status" style={{ backgroundColor: '#fff7ed', border: '1px solid #fdba74', color: '#c2410c' }}>
                Type: {filters.type}
                <X size={13} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilter('type', 'All types')} />
              </span>
            )}
            {filters.status !== 'All' && (
              <span className="badge-status" style={{ backgroundColor: '#fff7ed', border: '1px solid #fdba74', color: '#c2410c' }}>
                Status: {filters.status}
                <X size={13} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilter('status', 'All')} />
              </span>
            )}
            {(filters.bhk || []).map(b => (
              <span key={b} className="badge-status" style={{ backgroundColor: '#fff7ed', border: '1px solid #fdba74', color: '#c2410c' }}>
                {b}
                <X size={13} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilter('bhk', filters.bhk.filter(x => x !== b))} />
              </span>
            ))}
            {filters.reraOnly && (
              <span className="badge-status" style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857' }}>
                TG-RERA Approved
                <X size={13} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilter('reraOnly', false)} />
              </span>
            )}

            <button
              onClick={resetFilters}
              style={{
                fontSize: '0.8125rem',
                color: '#f15a24',
                fontWeight: 600,
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '6px'
              }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Grid: Desktop Sidebar + Properties List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '32px'
          }}
        >
          {/* Desktop Filter Sidebar */}
          <aside
            style={{
              gridColumn: 'span 4',
              display: 'none'
            }}
            className="desktop-filter-sidebar"
          >
            <div style={{ position: 'sticky', top: '96px' }}>
              <PropertyFilters />
            </div>
          </aside>

          {/* Properties Grid Area */}
          <div
            style={{
              gridColumn: 'span 12'
            }}
            className="properties-grid-col"
          >
            <PropertyGrid properties={filteredProperties} />
          </div>
        </div>

      </div>

      {/* Mobile Filters Drawer / Modal */}
      {mobileFilterOpen && (
        <div
          className="modal-overlay"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '500px', maxHeight: '85vh', overflowY: 'auto' }}
          >
            <PropertyFilters
              isMobileModal={true}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Responsive Breakpoints Inline Style */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-filter-sidebar {
            display: block !important;
          }
          .properties-grid-col {
            grid-column: span 8 !important;
          }
          #mobile-filter-trigger {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
