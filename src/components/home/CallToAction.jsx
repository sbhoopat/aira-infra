import React from 'react';
import { Calendar, PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  const { openModal } = useProperty();

  return (
    <section
      style={{
        padding: '80px 0 20px',
        backgroundColor: '#fbfbfa'
      }}
    >
      <div className="container">
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            backgroundColor: '#110e2e',
            overflow: 'hidden',
            padding: 'clamp(36px, 6vw, 64px)',
            color: '#ffffff',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(241, 90, 36, 0.25) 0%, rgba(241, 90, 36, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '680px'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#fed7aa',
                marginBottom: '20px'
              }}
            >
              <Sparkles size={15} color="#f15a24" />
              <span>PRIVATE SITE TOURS & CONSULTATIONS</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.18,
                marginBottom: '18px',
                color: '#ffffff'
              }}
            >
              Ready to experience homes built with <span style={{ color: '#f15a24', fontStyle: 'italic', fontFamily: 'var(--font-accent)' }}>room to breathe?</span>
            </h2>

            <p
              style={{
                color: '#cbd5e1',
                fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                lineHeight: 1.6,
                marginBottom: '36px'
              }}
            >
              Book an exclusive private walk-through with our Senior Relationship Managers. Enjoy complimentary chauffeur pick-and-drop across Hyderabad.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              <button
                onClick={() => openModal('schedule')}
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '1rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <Calendar size={18} />
                <span>Schedule Private Site Visit</span>
              </button>

              <a
                href="tel:+919876543210"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <PhoneCall size={18} color="#f15a24" />
                <span>+91 98765 43210</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
