import React from 'react';
import { HardHat, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function ConstructionTimeline({ progress, possessionDate }) {
  if (!progress) return null;

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
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span className="badge-category" style={{ display: 'block', marginBottom: '4px' }}>
            ON-SITE MILESTONES
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
            Construction Progress & Updates
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#fff7ed', padding: '8px 16px', borderRadius: '20px', border: '1px solid #fed7aa' }}>
          <Calendar size={16} color="#f15a24" />
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#9a3412' }}>
            Target Handover: {possessionDate}
          </span>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div style={{ marginBottom: '28px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>
            Overall Project Completion
          </span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f15a24' }}>
            {progress.overallPercent}%
          </span>
        </div>
        <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress.overallPercent}%`,
              height: '100%',
              backgroundColor: '#f15a24',
              borderRadius: '5px',
              transition: 'width 1s ease-in-out'
            }}
          />
        </div>
      </div>

      {/* Milestones List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {progress.milestones?.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderRadius: '12px',
              backgroundColor: '#fbfbfa',
              border: '1px solid #edf0f3'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {m.percent === 100 ? (
                <CheckCircle2 size={20} color="#10b981" />
              ) : (
                <Clock size={20} color="#f59e0b" />
              )}
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1e293b' }}>
                {m.title}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  backgroundColor: m.percent === 100 ? '#ecfdf5' : '#fffbeb',
                  color: m.percent === 100 ? '#059669' : '#d97706'
                }}
              >
                {m.status}
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#110e2e', minWidth: '40px', textAlign: 'right' }}>
                {m.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
