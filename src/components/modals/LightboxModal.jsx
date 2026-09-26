import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function LightboxModal() {
  const { modalState, closeModal } = useProperty();
  const isOpen = modalState.isOpen && modalState.type === 'lightbox';

  const images = modalState.extraData?.images || [];
  const activeIndex = modalState.extraData?.activeIndex || 0;
  const propertyName = modalState.property?.name || 'Property Gallery';

  const [currentIndex, setCurrentIndex] = React.useState(activeIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(activeIndex);
    }
  }, [isOpen, activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, closeModal]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 8, 25, 0.96)',
        backdropFilter: 'blur(16px)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px'
      }}
      onClick={closeModal}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff',
          zIndex: 2010
        }}
        onClick={e => e.stopPropagation()}
      >
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
            {propertyName}
          </h4>
          <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
            Photo {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={closeModal}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close Lightbox"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Image View */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 160px)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        />

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={() => setCurrentIndex(prev => (prev - 1 + images.length) % images.length)}
            style={{
              position: 'absolute',
              left: '10px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={() => setCurrentIndex(prev => (prev + 1) % images.length)}
            style={{
              position: 'absolute',
              right: '10px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          overflowX: 'auto',
          padding: '8px',
          zIndex: 2010
        }}
        onClick={e => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: '60px',
              height: '42px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: currentIndex === idx ? '2px solid #f15a24' : '1px solid rgba(255,255,255,0.2)',
              opacity: currentIndex === idx ? 1 : 0.45,
              padding: 0,
              background: 'none',
              cursor: 'pointer'
            }}
          >
            <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
