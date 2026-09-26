import React, { useState } from 'react';
import { Camera, Maximize, Play, Heart, Share2, ShieldCheck } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function PropertyGallery({ images = [], propertyName = '', reraNumber = '', status = '', onOpenLightbox, propertyId }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { isFavorite, toggleFavorite, showToast } = useProperty();

  const currentImage = images[activeImageIndex] || images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  const favorited = propertyId ? isFavorite(propertyId) : false;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'success');
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '32px' }}>
      
      {/* Main Feature Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 55vh, 520px)',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#0f172a',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <img
          src={currentImage}
          alt={`${propertyName} - View ${activeImageIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(17,14,46,0.5) 0%, transparent 40%, rgba(17,14,46,0.3) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            gap: '10px',
            zIndex: 3
          }}
        >
          {status && (
            <span className="badge-status" style={{ fontSize: '0.8125rem' }}>
              {status}
            </span>
          )}
          {reraNumber && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(17, 14, 46, 0.75)',
                backdropFilter: 'blur(8px)',
                color: '#fed7aa',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              <ShieldCheck size={14} color="#f15a24" />
              <span>RERA: {reraNumber}</span>
            </span>
          )}
        </div>

        {/* Top Right Action Icons */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px',
            zIndex: 3
          }}
        >
          {propertyId && (
            <button
              onClick={() => toggleFavorite(propertyId)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              title="Save property"
            >
              <Heart
                size={20}
                color={favorited ? '#f15a24' : '#334155'}
                fill={favorited ? '#f15a24' : 'none'}
              />
            </button>
          )}

          <button
            onClick={handleShare}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#334155',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            title="Share Property"
          >
            <Share2 size={18} />
          </button>
        </div>

        {/* Bottom Bar: Fullscreen Gallery & Photos count button */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 3
          }}
        >
          <button
            onClick={() => onOpenLightbox && onOpenLightbox(activeImageIndex)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(17, 14, 46, 0.85)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f15a24'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(17, 14, 46, 0.85)'}
          >
            <Camera size={16} />
            <span>View All {images.length} Photos</span>
            <Maximize size={14} style={{ opacity: 0.8 }} />
          </button>
        </div>

      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '14px',
            overflowX: 'auto',
            paddingBottom: '6px'
          }}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              style={{
                flex: '0 0 100px',
                height: '70px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: activeImageIndex === idx ? '2.5px solid #f15a24' : '2px solid transparent',
                opacity: activeImageIndex === idx ? 1 : 0.65,
                transition: 'all 0.2s ease',
                padding: 0,
                cursor: 'pointer',
                background: 'none'
              }}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
