import React, { useState } from 'react';
import { Compass, Maximize2, FileDown, CheckCircle, Bath, Bed, Eye } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function FloorPlans({ floorPlans = [], property }) {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const { openModal } = useProperty();

  if (!floorPlans || floorPlans.length === 0) return null;

  const currentPlan = floorPlans[selectedPlanIndex] || floorPlans[0];

  return (
    <div
      id="floor-plans"
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
            ARCHITECTURAL LAYOUTS
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
            Floor Plans & Unit Configurations
          </h3>
        </div>

        <button
          onClick={() => openModal('brochure', property)}
          className="btn-outline-primary"
          style={{ padding: '8px 18px', fontSize: '0.875rem' }}
        >
          <FileDown size={16} />
          <span>Download High-Res PDF Plans</span>
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '24px',
          borderBottom: '1px solid #f1f5f9'
        }}
      >
        {floorPlans.map((plan, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPlanIndex(idx)}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              border: selectedPlanIndex === idx ? '1.5px solid #f15a24' : '1px solid #e2e8f0',
              backgroundColor: selectedPlanIndex === idx ? '#f15a24' : '#ffffff',
              color: selectedPlanIndex === idx ? '#ffffff' : '#334155',
              boxShadow: selectedPlanIndex === idx ? '0 4px 12px rgba(241, 90, 36, 0.25)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {plan.bhk}
          </button>
        ))}
      </div>

      {/* Layout Grid: Details on Left, Diagram on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}
      >
        {/* Specs Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Unit Specification
            </span>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#110e2e',
                marginTop: '4px',
                marginBottom: '8px'
              }}
            >
              {currentPlan.bhk}
            </h4>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f15a24' }}>
              {currentPlan.price}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
              padding: '18px',
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid #e2e8f0'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Super Built-Up Area</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#110e2e' }}>
                {currentPlan.superBuiltUpArea}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Carpet Area</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#110e2e' }}>
                {currentPlan.carpetArea}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Vastu Facing</span>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#110e2e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Compass size={14} color="#f15a24" />
                <span>{currentPlan.facing}</span>
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Balconies & Baths</span>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#110e2e' }}>
                {currentPlan.bathrooms} Baths · {currentPlan.balconies} Balconies
              </div>
            </div>
          </div>

          <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            Features optimized cross-ventilation, separate wet & dry kitchen counter areas, private foyer entrance, and zero structural dead-spaces.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openModal('schedule', property)}
              className="btn-primary"
              style={{ flex: 1, padding: '10px 18px', fontSize: '0.875rem' }}
            >
              <span>Book Sample Flat Walkthrough</span>
            </button>
          </div>
        </div>

        {/* Blueprint Visual & Zoom Preview */}
        <div
          style={{
            position: 'relative',
            borderRadius: '18px',
            overflow: 'hidden',
            backgroundColor: '#f1f5f9',
            border: '1px solid #cbd5e1',
            aspectRatio: '4 / 3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={currentPlan.image}
            alt={`${currentPlan.bhk} Blueprint`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              display: 'flex',
              gap: '8px'
            }}
          >
            <button
              onClick={() => setZoomOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(17, 14, 46, 0.85)',
                backdropFilter: 'blur(6px)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Maximize2 size={13} />
              <span>Enlarge Plan</span>
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomOpen && (
        <div
          className="modal-overlay"
          onClick={() => setZoomOpen(false)}
          style={{ zIndex: 1200 }}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '900px', padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#110e2e', margin: 0 }}>
                {property?.name} — {currentPlan.bhk} Floor Blueprint
              </h4>
              <button
                onClick={() => setZoomOpen(false)}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.8125rem' }}
              >
                Close
              </button>
            </div>
            <img
              src={currentPlan.image}
              alt="High-Res Blueprint"
              style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '12px' }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
