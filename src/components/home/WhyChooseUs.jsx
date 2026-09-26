import React from 'react';
import { ShieldCheck, Trees, Clock, Award, Compass, KeyRound } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck size={28} color="#f15a24" />,
      title: "100% TG-RERA Certified",
      description: "Every Aira development holds complete municipal, environmental, and Telangana RERA clearances for foolproof title ownership."
    },
    {
      icon: <Trees size={28} color="#f15a24" />,
      title: "75%+ Breathable Greenery",
      description: "Consciously engineered with low tower density, expansive central parks, and natural air corridor orientation for true room to breathe."
    },
    {
      icon: <Award size={28} color="#f15a24" />,
      title: "German Mivan Engineering",
      description: "Monolithic shear-wall earthquake resistant construction with premium imported marble, Grohe sanitary, and Schneider IoT automation."
    },
    {
      icon: <Clock size={28} color="#f15a24" />,
      title: "On-Time Handover Guarantee",
      description: "Over 3 decades of punctual possession with transparent real-time construction webcam and milestone-linked payment schedules."
    }
  ];

  return (
    <section
      style={{
        padding: '72px 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <span className="badge-category" style={{ display: 'block', marginBottom: '8px' }}>
            THE AIRA INFRA PROMISE
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
            Engineering Sanctuary, Not Just Square Footage
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
            We combine architectural purity with uncompromising structural integrity to deliver homes that appreciate in both lifestyle and financial value.
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '28px'
          }}
        >
          {features.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '28px',
                borderRadius: '18px',
                backgroundColor: '#fcfcfb',
                border: '1px solid #edf0f3',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(17, 14, 46, 0.06)';
                e.currentTarget.style.borderColor = '#fdba74';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#edf0f3';
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#fff7ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#110e2e',
                  marginBottom: '10px'
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
