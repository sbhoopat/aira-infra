import React from 'react';
import { Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { PROPERTIES_DATA } from '../data/propertiesData';
import { Layers, X, Check, ShieldCheck, Calendar, ArrowRight, Plus } from 'lucide-react';

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare, properties, openModal, addToCompare } = useProperty();

  const comparedProperties = properties.filter(p => compareList.includes(p.id));
  const availableToAdd = properties.filter(p => !compareList.includes(p.id));

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
            marginBottom: '32px',
            paddingBottom: '20px',
            borderBottom: '1px solid #edf0f3'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Layers size={18} color="#f15a24" />
              <span className="badge-category">SIDE-BY-SIDE EVALUATION</span>
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
              Compare Properties ({comparedProperties.length}/4)
            </h1>
          </div>

          {comparedProperties.length > 0 && (
            <button
              onClick={clearCompare}
              className="btn-secondary"
              style={{ padding: '8px 18px', fontSize: '0.875rem' }}
            >
              <span>Clear All Comparisons</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {comparedProperties.length === 0 ? (
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
              <Layers size={36} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#110e2e', marginBottom: '10px' }}>
              No Properties in Comparison Matrix
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Select up to 4 properties by clicking the compare icon on any property card to evaluate price per sq ft, floor plans, possession dates, and specs.
            </p>
            <Link to="/properties" className="btn-primary" style={{ padding: '12px 24px' }}>
              <span>Browse Properties to Compare</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div>
            {/* Quick Add Bar if less than 4 */}
            {comparedProperties.length < 4 && availableToAdd.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                  overflowX: 'auto'
                }}
              >
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', whiteSpace: 'nowrap' }}>
                  Quick Add:
                </span>
                {availableToAdd.map(p => (
                  <button
                    key={p.id}
                    onClick={() => addToCompare(p.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: '#1e293b',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={14} color="#f15a24" />
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Comparison Table */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #edf0f3',
                overflowX: 'auto',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #edf0f3' }}>
                    <th style={{ padding: '24px', textAlign: 'left', width: '220px', backgroundColor: '#fcfcfb' }}>
                      <span style={{ fontSize: '0.8125rem', color: '#64748b', textTransform: 'uppercase' }}>Feature</span>
                    </th>
                    {comparedProperties.map(p => (
                      <th key={p.id} style={{ padding: '24px', textAlign: 'left', minWidth: '220px', verticalAlign: 'top' }}>
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: '#fee2e2',
                              color: '#ef4444',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                            title="Remove"
                          >
                            <X size={14} />
                          </button>
                          
                          <img
                            src={p.heroImage}
                            alt={p.name}
                            style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }}
                          />
                          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#110e2e', margin: '0 0 4px' }}>
                            {p.name}
                          </h4>
                          <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                            {p.location.area}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Price */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#334155', backgroundColor: '#fcfcfb' }}>Price Range</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '16px 24px', fontWeight: 800, color: '#f15a24', fontSize: '1.05rem' }}>
                        {p.priceDisplay}
                      </td>
                    ))}
                  </tr>

                  {/* Price Per Sq Ft */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#334155', backgroundColor: '#fcfcfb' }}>Avg. Rate</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '16px 24px', color: '#475569', fontSize: '0.9rem' }}>
                        ₹{p.pricePerSqFt?.toLocaleString('en-IN')} / Sq. Ft.
                      </td>
                    ))}
                  </tr>

                  {/* Type */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#334155', backgroundColor: '#fcfcfb' }}>Type</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '16px 24px', color: '#1e293b', fontWeight: 600 }}>
                        {p.type}
                      </td>
                    ))}
                  </tr>

                  {/* Configurations */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#334155', backgroundColor: '#fcfcfb' }}>Configurations</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '16px 24px', color: '#1e293b', fontWeight: 600 }}>
                        {p.bhkDisplay}
                      </td>
                    ))}
                  </tr>

                  {/* Area */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#334155', backgroundColor: '#fcfcfb' }}>Area Range</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '16px 24px', color: '#475569' }}>
                        {p.areaDisplay}
                      </td>
                    ))}
                  </tr>

                  {/* Status & Possession */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#334155', backgroundColor: '#fcfcfb' }}>Status & Possession</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '16px 24px' }}>
                        <span className="badge-status" style={{ display: 'inline-block', marginBottom: '4px' }}>
                          {p.status}
                        </span>
                        <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{p.possessionDate}</div>
                      </td>
                    ))}
                  </tr>

                  {/* TG-RERA */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#334155', backgroundColor: '#fcfcfb' }}>RERA Number</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '16px 24px', color: '#059669', fontWeight: 600, fontSize: '0.875rem' }}>
                        {p.reraNumber}
                      </td>
                    ))}
                  </tr>

                  {/* Land & Density */}
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: '#334155', backgroundColor: '#fcfcfb' }}>Land & Open Space</td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '16px 24px', color: '#475569', fontSize: '0.875rem' }}>
                        {p.landArea} ({p.openSpacePercentage} Open Space)
                      </td>
                    ))}
                  </tr>

                  {/* Actions Row */}
                  <tr>
                    <td style={{ padding: '24px', backgroundColor: '#fcfcfb' }}></td>
                    {comparedProperties.map(p => (
                      <td key={p.id} style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <button
                            onClick={() => openModal('schedule', p)}
                            className="btn-primary"
                            style={{ width: '100%', padding: '9px 14px', fontSize: '0.8125rem' }}
                          >
                            <Calendar size={14} />
                            <span>Schedule Visit</span>
                          </button>

                          <Link
                            to={`/property/${p.id}`}
                            className="btn-secondary"
                            style={{ width: '100%', padding: '9px 14px', fontSize: '0.8125rem', justifyContent: 'center' }}
                          >
                            <span>Full Details</span>
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
