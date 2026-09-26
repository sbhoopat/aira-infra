import React from 'react';
import { Calendar, FileDown, PhoneCall, Sparkles } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function CTASection() {
  const { openModal } = useProperty();

  return (
    <section
      style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #110e2e 0%, #1a1547 50%, #2a1f5f 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(241, 90, 36, 0.2)',
              border: '1px solid rgba(241, 90, 36, 0.4)',
              color: '#fed7aa',
              fontSize: '0.8125rem',
              fontWeight: 700,
              marginBottom: '20px'
            }}
          >
            <Sparkles size={14} color="#f15a24" />
            <span>DISCOVER YOUR NEW ADDRESS IN HYDERABAD</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '16px'
            }}
          >
            Ready to experience a home with room to breathe?
          </h2>

          <p
            style={{
              color: '#cbd5e1',
              fontSize: '1.0625rem',
              lineHeight: 1.6,
              marginBottom: '36px'
            }}
          >
            Book a private guided walk-through of our sample flats and experience centers in Kokapet, Shankarpally, and Gachibowli with dedicated relationship managers.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            <button
              onClick={() => openModal('schedule')}
              className="btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem'
              }}
            >
              <Calendar size={18} />
              <span>Schedule Private Site Visit</span>
            </button>

            <button
              onClick={() => openModal('brochure')}
              className="btn-secondary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.25)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <FileDown size={18} />
              <span>Download Portfolio Brochure</span>
            </button>
          </div>

          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: '#9490b8',
              fontSize: '0.9rem'
            }}
          >
            <PhoneCall size={16} color="#f15a24" />
            <span>Direct Sales Priority Line: <strong>+91 98765 43210</strong> (Available 9 AM – 8 PM)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
