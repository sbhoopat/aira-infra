import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/testimonialsData';

export default function TestimonialsSection() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
          <span className="badge-category" style={{ display: 'block', marginBottom: '8px' }}>
            TESTIMONIALS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)',
              fontWeight: 700,
              color: '#110e2e',
              lineHeight: 1.25,
              marginBottom: '12px'
            }}
          >
            Stories from Our Homeowners
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
            Hear firsthand from families who found their sanctuary in Hyderabad's premier Aira communities.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}
        >
          {TESTIMONIALS_DATA.map(t => (
            <div
              key={t.id}
              style={{
                backgroundColor: '#fbfbfa',
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid #edf0f3',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = '#fdba74';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#edf0f3';
              }}
            >
              <div>
                {/* Stars Rating */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                {/* Quote Text */}
                <p
                  style={{
                    color: '#334155',
                    fontSize: '0.9375rem',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    marginBottom: '24px'
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  borderTop: '1px solid #eef2f6',
                  paddingTop: '18px'
                }}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
                    {t.name}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '2px 0 0' }}>
                    {t.role} · <strong style={{ color: '#f15a24' }}>{t.property}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
