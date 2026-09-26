import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../../data/testimonialsData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section
      style={{
        padding: '80px 0',
        backgroundColor: '#fbfbfa',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <span className="badge-category" style={{ display: 'block', marginBottom: '8px' }}>
            VERIFIED RESIDENTS
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
            Stories of Life at Aira Communities
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
            Hear how our homeowners found tranquil spaces, thoughtful ventilation, and lasting quality in Hyderabad's premier locales.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #edf0f3',
            boxShadow: 'var(--shadow-md)',
            padding: 'clamp(24px, 5vw, 48px)',
            position: 'relative'
          }}
        >
          {/* Quote Icon */}
          <div
            style={{
              position: 'absolute',
              top: '28px',
              right: '32px',
              color: 'rgba(241, 90, 36, 0.12)'
            }}
          >
            <Quote size={56} />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* Stars */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#f15a24" color="#f15a24" />
              ))}
            </div>

            {/* Quote text */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.125rem, 2vw, 1.35rem)',
                lineHeight: 1.65,
                color: '#1e293b',
                fontStyle: 'italic',
                margin: 0
              }}
            >
              "{current.quote}"
            </p>

            {/* Author Profile */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                paddingTop: '20px',
                borderTop: '1px solid #f1f5f9'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={current.avatar}
                  alt={current.name}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #fdba74'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
                      {current.name}
                    </h4>
                    <CheckCircle size={15} color="#10b981" />
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                    {current.role} · <strong style={{ color: '#f15a24' }}>{current.property}</strong>
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={prevTestimonial}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#110e2e';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#334155';
                  }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>
                  {activeIndex + 1} / {TESTIMONIALS_DATA.length}
                </span>
                <button
                  onClick={nextTestimonial}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#110e2e';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#334155';
                  }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
