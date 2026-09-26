import React from 'react';
import { ShieldCheck, Award, Building, CheckCircle2, Phone, Mail } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function BuilderProfile({ developer, reraNumber }) {
  const { openModal } = useProperty();

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
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
        <div>
          <span className="badge-category" style={{ display: 'block', marginBottom: '4px' }}>
            DEVELOPER CREDIBILITY
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
            About Aira Infra Developers
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ecfdf5', padding: '6px 14px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
          <ShieldCheck size={18} color="#059669" />
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#065f46' }}>
            TG-RERA: {reraNumber}
          </span>
        </div>
      </div>

      <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '24px' }}>
        Aira Infra is Hyderabad’s pioneering luxury developer committed to biophilic residential design, uncompromised structural longevity, and sustainable community living. With over 12 million square feet delivered across the IT corridor, every project is a masterclass in breathable living spaces.
      </p>

      {/* Developer Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          padding: '20px',
          borderRadius: '16px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}
      >
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f15a24' }}>30+</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Years Legacy</div>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#110e2e' }}>18+</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Delivered Projects</div>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#110e2e' }}>10M+</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Sq. Ft. Built</div>
        </div>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>100%</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>On-Time Record</div>
        </div>
      </div>

      {/* Contact Sales Rep */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={() => openModal('schedule')}
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.875rem' }}
        >
          <span>Connect with Project Director</span>
        </button>
        <a
          href="tel:+919876543210"
          className="btn-secondary"
          style={{ padding: '10px 20px', fontSize: '0.875rem' }}
        >
          <Phone size={16} color="#f15a24" />
          <span>Direct: +91 98765 43210</span>
        </a>
      </div>
    </div>
  );
}
