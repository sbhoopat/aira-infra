import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function ImageLightboxModal() {
  const { modalState, closeModal } = useProperty();
  const isOpen = modalState.isOpen && modalState.type === 'lightbox';
  const property = modalState.property;

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (modalState.extraData && typeof modalState.extraData.index === 'number') {
      setCurrentIndex(modalState.extraData.index);
    } else {
      setCurrentIndex(0);
    }
  }, [modalState.extraData]);

  if (!isOpen || !property) return null;

  const images = property.images && property.images.length > 0 ? property.images : [property.heroImage];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(10, 8, 28, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={closeModal}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0 }}>
            {property.name} — Gallery
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Image {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={closeModal}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Large Image View with Left & Right arrows */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: '20px 0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '16px',
            zIndex: 10,
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        <img
          src={images[currentIndex]}
          alt={`${property.name} view ${currentIndex + 1}`}
          style={{
            maxHeight: '75vh',
            maxWidth: '90vw',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        />

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '16px',
            zIndex: 10,
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Thumbnails Row */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          overflowX: 'auto',
          paddingBottom: '10px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: '72px',
              height: '50px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: currentIndex === idx ? '2px solid #f15a24' : '2px solid transparent',
              opacity: currentIndex === idx ? 1 : 0.6,
              transition: 'all 0.2s',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
