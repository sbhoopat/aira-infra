import React from 'react';
import { Calendar, FileDown, PhoneCall, Heart, MessageSquare, ShieldCheck, Share2, Layers } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function StickyPropertyActionBar({ property }) {
  const { openModal, isFavorite, toggleFavorite, isInCompare, addToCompare, showToast } = useProperty();

  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${property.name} - Aira Infra`,
        text: `Check out ${property.name} in ${property.location.area}, Hyderabad!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <>
      {/* Desktop Sticky Sidebar Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '28px',
          border: '1px solid #edf0f3',
          boxShadow: 'var(--shadow-lg)',
          position: 'sticky',
          top: '96px'
        }}
      >
        {/* Pricing & Tag */}
        <div style={{ marginBottom: '18px' }}>
          <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>
            Starting Price (Excl. Reg.)
          </span>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#110e2e',
              lineHeight: 1.2
            }}
          >
            {property.priceDisplay}
          </div>
          <span style={{ fontSize: '0.8125rem', color: '#f15a24', fontWeight: 700 }}>
            ₹{property.pricePerSqFt} / Sq. Ft.
          </span>
        </div>

        {/* Quick Spec list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '14px',
            fontSize: '0.85rem',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Configurations:</span>
            <strong style={{ color: '#110e2e' }}>{property.bhkDisplay}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Built-Up Area:</span>
            <strong style={{ color: '#110e2e' }}>{property.areaDisplay}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Status:</span>
            <strong style={{ color: '#10b981' }}>{property.status}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Possession:</span>
            <strong style={{ color: '#110e2e' }}>{property.possessionDate}</strong>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => openModal('schedule', property)}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            <Calendar size={18} />
            <span>Schedule Private Site Visit</span>
          </button>

          <button
            onClick={() => openModal('brochure', property)}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
          >
            <FileDown size={18} />
            <span>Download Detailed Brochure</span>
          </button>

          <button
            onClick={() => openModal('enquire', property)}
            className="btn-outline-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
          >
            <MessageSquare size={16} />
            <span>Request Custom Price Sheet</span>
          </button>
        </div>

        {/* Secondary Icons (Favorite, Compare, Share) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9'
          }}
        >
          <button
            onClick={() => toggleFavorite(property.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: favorited ? '#f15a24' : '#64748b',
              cursor: 'pointer'
            }}
          >
            <Heart size={16} fill={favorited ? '#f15a24' : 'none'} />
            <span>{favorited ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => addToCompare(property.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: compared ? '#10b981' : '#64748b',
              cursor: 'pointer'
            }}
          >
            <Layers size={16} />
            <span>{compared ? 'In Compare' : 'Compare'}</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>

        {/* Direct Call Assistance */}
        <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#fff7ed', padding: '12px', borderRadius: '12px' }}>
          <a
            href="tel:+919876543210"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#c2410c',
              fontWeight: 700,
              fontSize: '0.875rem'
            }}
          >
            <PhoneCall size={16} />
            <span>Direct Sales: +91 98765 43210</span>
          </a>
        </div>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 45,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)'
        }}
        className="mobile-action-bar"
      >
        <div>
          <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Starting Price</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#110e2e' }}>{property.priceDisplay}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => openModal('brochure', property)}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8125rem' }}
          >
            <FileDown size={15} />
            <span>Brochure</span>
          </button>
          <button
            onClick={() => openModal('schedule', property)}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
          >
            <Calendar size={15} />
            <span>Visit</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .mobile-action-bar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
