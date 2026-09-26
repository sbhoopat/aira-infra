import React, { useState } from 'react';
import { Download, Compass, Maximize, Bath, Home, Eye, Check } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function FloorPlansViewer({ property }) {
  const { openModal } = useProperty();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const floorPlans = property.floorPlans || [];
  if (floorPlans.length === 0) return null;

  const currentPlan = floorPlans[selectedPlanIndex] || floorPlans[0];

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
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span className="badge-category" style={{ display: 'block', marginBottom: '4px' }}>
            ARCHITECTURAL LAYOUTS
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
            Floor Plans & Unit Configurations
          </h3>
        </div>

        {/* Download PDF button */}
        <button
          onClick={() => openModal('brochure', property)}
          className="btn-outline-primary"
          style={{ fontSize: '0.85rem', padding: '8px 16px' }}
        >
          <Download size={15} />
          <span>Download All Floor Plans (PDF)</span>
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
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
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: 600,
              backgroundColor: selectedPlanIndex === idx ? '#fff7ed' : '#ffffff',
              color: selectedPlanIndex === idx ? '#f15a24' : '#64748b',
              border: selectedPlanIndex === idx ? '1.5px solid #f15a24' : '1px solid #e2e8f0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {plan.bhk} ({plan.superBuiltUpArea})
          </button>
        ))}
      </div>

      {/* Main Floor Plan Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}
      >
        {/* Left: Blueprint Graphic & Architectural Render */}
        <div
          style={{
            position: 'relative',
            backgroundColor: '#f8fafc',
            border: '1.5px dashed #cbd5e1',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'center',
            minHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Blueprint SVG Schematic Visualizer */}
          <div style={{ maxWidth: '100%', width: '380px', margin: '0 auto' }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: 'auto' }}>
              <rect x="10" y="10" width="380" height="280" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
              {/* Living Area */}
              <rect x="25" y="25" width="220" height="150" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="135" y="95" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="bold">Living & Dining</text>
              <text x="135" y="115" textAnchor="middle" fill="#94a3b8" fontSize="11">22'0" x 14'6"</text>
              
              {/* Master Bedroom */}
              <rect x="255" y="25" width="120" height="130" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
              <text x="315" y="80" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="bold">Master Bed</text>
              <text x="315" y="100" textAnchor="middle" fill="#64748b" fontSize="10">16'0" x 12'0"</text>

              {/* Bedroom 2 */}
              <rect x="25" y="185" width="140" height="90" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
              <text x="95" y="225" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">Bedroom 2</text>
              <text x="95" y="243" textAnchor="middle" fill="#64748b" fontSize="10">13'0" x 11'0"</text>

              {/* Kitchen */}
              <rect x="175" y="185" width="110" height="90" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
              <text x="230" y="225" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">Kitchen</text>
              <text x="230" y="243" textAnchor="middle" fill="#64748b" fontSize="10">10'0" x 8'6"</text>

              {/* Balcony Deck */}
              <rect x="295" y="165" width="80" height="110" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="335" y="225" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">Balcony Deck</text>
            </svg>
          </div>

          <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '12px' }}>
            *Schematic layout representation. Exact room dimensions subject to architectural drawings.
          </span>
        </div>

        {/* Right: Technical Specs for this layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#f15a24', textTransform: 'uppercase' }}>
              CONFIGURATION SPECIFICATION
            </span>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, color: '#110e2e', margin: '4px 0 6px' }}>
              {currentPlan.bhk}
            </h4>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#110e2e' }}>
              Starting at {currentPlan.price}
            </div>
          </div>

          {/* Key Metric Chips */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px'
            }}
          >
            <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Super Built-Up Area</span>
              <strong style={{ fontSize: '1.05rem', color: '#110e2e' }}>{currentPlan.superBuiltUpArea}</strong>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Carpet Area (RERA)</span>
              <strong style={{ fontSize: '1.05rem', color: '#110e2e' }}>{currentPlan.carpetArea}</strong>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Vastu Facing</span>
              <strong style={{ fontSize: '1.05rem', color: '#110e2e' }}>{currentPlan.facing} Facing</strong>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Bathrooms & Decks</span>
              <strong style={{ fontSize: '1.05rem', color: '#110e2e' }}>{currentPlan.bathrooms} Baths, {currentPlan.balconies} Balconies</strong>
            </div>
          </div>

          <button
            onClick={() => openModal('schedule', property)}
            className="btn-primary"
            style={{ marginTop: '8px', justifyContent: 'center' }}
          >
            Schedule On-Site Model Flat Walkthrough
          </button>
        </div>
      </div>

    </div>
  );
}
