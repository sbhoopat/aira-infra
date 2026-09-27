import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyGallery from '../components/property/PropertyGallery';
import FloorPlans from '../components/property/FloorPlans';
import AmenitiesSection from '../components/property/AmenitiesSection';
import LocationSection from '../components/property/LocationSection';
import EmiCalculator from '../components/property/EmiCalculator';
import EnquiryForm from '../components/property/EnquiryForm';
import PropertyCard from '../components/property/PropertyCard';
import {
  MapPin,
  Calendar,
  Layers,
  FileDown,
  ShieldCheck,
  CheckCircle,
  Building,
  Check,
  ArrowRight,
  TrendingUp,
  Award,
  PhoneCall,
  Clock,
  Sparkles
} from 'lucide-react';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, openModal, isFavorite, toggleFavorite, isInCompare, addToCompare } = useProperty();

  // Find property by id or slug
  const property = properties.find(p => p.id === id) || properties[0];

  const favorited = property ? isFavorite(property.id) : false;
  const compared = property ? isInCompare(property.id) : false;

  const handleOpenLightbox = (index = 0) => {
    openModal('lightbox', property, {
      images: property?.images || [property?.heroImage],
      activeIndex: index
    });
  };

  const similarProperties = properties.filter(p => p.id !== property?.id).slice(0, 3);

  if (!property) return <div style={{ padding: '40px', textAlign: 'center' }}>Property not found.</div>;

  return (
    <div style={{ paddingTop: '24px', paddingBottom: '80px', backgroundColor: '#fbfbfa' }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.875rem',
            color: '#64748b',
            marginBottom: '20px'
          }}
        >
          <Link to="/" style={{ color: '#64748b', transition: 'color 0.2s' }}>Home</Link>
          <span>/</span>
          <Link to="/properties" style={{ color: '#64748b', transition: 'color 0.2s' }}>Properties</Link>
          <span>/</span>
          <span style={{ color: '#110e2e', fontWeight: 600 }}>{property.name}</span>
        </nav>

        {/* Top Header & Tagline */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '24px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-category">{property.category || property.type.toUpperCase()}</span>
              <span className="badge-status">{property.status}</span>
              {property.reraApproved && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                  <ShieldCheck size={14} />
                  <span>TG-RERA Approved</span>
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                color: '#110e2e',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '8px'
              }}
            >
              {property.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '1rem' }}>
              <MapPin size={18} color="#f15a24" />
              <span>{property.location.fullAddress}</span>
            </div>
          </div>

          {/* Pricing Box on Top */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '16px 24px',
              borderRadius: '16px',
              border: '1px solid #edf0f3',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
              textAlign: 'right'
            }}
          >
            <span style={{ fontSize: '0.8125rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Price Range
            </span>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#110e2e',
                marginTop: '2px'
              }}
            >
              {property.priceDisplay}
            </div>
            {property.pricePerSqFt && (
              <span style={{ fontSize: '0.8125rem', color: '#f15a24', fontWeight: 600 }}>
                ~₹{property.pricePerSqFt.toLocaleString('en-IN')} / Sq. Ft.
              </span>
            )}
          </div>
        </div>

        {/* Gallery Component */}
        <PropertyGallery
          images={property.images}
          propertyName={property.name}
          reraNumber={property.reraNumber}
          status={property.status}
          onOpenLightbox={handleOpenLightbox}
          propertyId={property.id}
        />

        {/* Quick Highlights Summary Bar */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #edf0f3',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Configurations</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#110e2e', marginTop: '2px' }}>
              {property.bhkDisplay}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Super Built-Up Area</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#110e2e', marginTop: '2px' }}>
              {property.areaDisplay}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Possession Date</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#110e2e', marginTop: '2px' }}>
              {property.possessionDate}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Project Land Area</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#110e2e', marginTop: '2px' }}>
              {property.landArea} ({property.openSpacePercentage} Open Space)
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>TG-RERA Registration</span>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#059669', marginTop: '2px' }}>
              {property.reraNumber}
            </div>
          </div>
        </div>

        {/* Main 2-Column Layout: Content (Left 8 cols) + Sticky Booking Desk (Right 4 cols) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '36px'
          }}
        >
          {/* Main Content (8 cols) */}
          <div style={{ gridColumn: 'span 12' }} className="details-main-col">
            
            {/* Overview & Philosophy */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #edf0f3',
                padding: 'clamp(20px, 4vw, 36px)',
                marginBottom: '32px'
              }}
            >
              <span className="badge-category" style={{ display: 'block', marginBottom: '6px' }}>
                PROJECT OVERVIEW
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#110e2e',
                  marginBottom: '16px'
                }}
              >
                {property.tagline}
              </h2>
              <p
                style={{
                  color: '#475569',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  marginBottom: '24px'
                }}
              >
                {property.description}
              </p>

              {/* Key Highlights Bullet Cards */}
              {property.highlights && (
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#110e2e', marginBottom: '14px' }}>
                    Signature Architectural Highlights
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '12px'
                    }}
                  >
                    {property.highlights.map((hl, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          padding: '12px 14px',
                          backgroundColor: '#fbfbfa',
                          borderRadius: '12px',
                          border: '1px solid #f1f5f9'
                        }}
                      >
                        <CheckCircle size={18} color="#f15a24" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: 500, lineHeight: 1.4 }}>
                          {hl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Floor Plans */}
            <FloorPlans floorPlans={property.floorPlans} property={property} />

            {/* Amenities Grid */}
            <AmenitiesSection propertyAmenities={property.amenities} />

            {/* Technical Specifications Breakdown */}
            {property.specifications && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #edf0f3',
                  padding: 'clamp(20px, 4vw, 36px)',
                  margin: '32px 0'
                }}
              >
                <span className="badge-category" style={{ display: 'block', marginBottom: '6px' }}>
                  MATERIAL SPECIFICATIONS
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#110e2e',
                    marginBottom: '20px'
                  }}
                >
                  Uncompromising Build Quality
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px'
                  }}
                >
                  {Object.entries(property.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      style={{
                        padding: '18px',
                        borderRadius: '14px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #eef2f6'
                      }}
                    >
                      <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f15a24', textTransform: 'capitalize', marginBottom: '6px' }}>
                        {key}
                      </h5>
                      <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Construction Progress Milestone */}
            {property.constructionProgress && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #edf0f3',
                  padding: 'clamp(20px, 4vw, 36px)',
                  margin: '32px 0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <span className="badge-category" style={{ display: 'block', marginBottom: '4px' }}>
                      ON-SITE UPDATES
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
                      Construction Status & Timeline
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f15a24' }}>
                      {property.constructionProgress.overallPercent}%
                    </span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Overall Completion</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {property.constructionProgress.milestones.map((ms, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600, color: '#1e293b' }}>{ms.title}</span>
                        <span style={{ color: ms.percent === 100 ? '#10b981' : '#f15a24', fontWeight: 700 }}>
                          {ms.status} ({ms.percent}%)
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${ms.percent}%`,
                            height: '100%',
                            backgroundColor: ms.percent === 100 ? '#10b981' : '#f15a24',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location & Interactive Landmarks Map */}
            <LocationSection
              location={property.location}
              landmarks={property.nearbyLandmarks || []}
              propertyName={property.name}
            />

            {/* EMI Calculator */}
            <EmiCalculator
              defaultPrice={property.priceMin || 14000000}
              propertyName={property.name}
              property={property}
            />

          </div>

          {/* Right Sticky Booking Desk (4 cols) */}
          <div style={{ gridColumn: 'span 12' }} className="details-sidebar-col">
            <div style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Schedule Site Visit CTA Box */}
              <div
                style={{
                  backgroundColor: '#110e2e',
                  borderRadius: '24px',
                  padding: '28px',
                  color: '#ffffff',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fed7aa', fontSize: '0.75rem', fontWeight: 700, marginBottom: '14px' }}>
                  <Sparkles size={13} color="#f15a24" />
                  <span>VIP SITE ASSISTANCE</span>
                </div>
                
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>
                  Visit {property.name}
                </h3>
                
                <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '20px' }}>
                  Experience actual model apartment views, inspect construction materials, and discuss tailored payment plans.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => openModal('schedule', property)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
                  >
                    <Calendar size={18} />
                    <span>Schedule Private Site Visit</span>
                  </button>

                  <button
                    onClick={() => openModal('brochure', property)}
                    className="btn-secondary"
                    style={{ width: '100%', padding: '12px', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <FileDown size={18} />
                    <span>Download PDF Brochure</span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', color: '#9490b8', fontSize: '0.8125rem' }}>
                  <Clock size={14} />
                  <span>Experience Center Open 9:30 AM - 7:30 PM</span>
                </div>
              </div>

              {/* Direct Enquiry Form Card */}
              <EnquiryForm
                property={property}
                title="Direct Developer Enquiry"
                subtitle="Guaranteed callback within 15 minutes."
              />

              {/* Builder Profile Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #edf0f3',
                  padding: '22px'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  DEVELOPED BY
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#110e2e', margin: '4px 0 8px' }}>
                  {property.developer}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                  Aira Infra is a premier luxury real-estate developer in Hyderabad with over 15+ million sq. ft. of residential and commercial milestones delivered.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Properties Spotlight */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
              <div>
                <span className="badge-category">SIMILAR OPPORTUNITIES</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
                  Other Aira Communities You May Like
                </h3>
              </div>
              <Link to="/properties" style={{ color: '#f15a24', fontWeight: 700, fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>View All Properties</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '28px'
              }}
            >
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Responsive Inline CSS */}
      <style>{`
        @media (min-width: 992px) {
          .details-main-col {
            grid-column: span 8 !important;
          }
          .details-sidebar-col {
            grid-column: span 4 !important;
          }
        }
      `}</style>
    </div>
  );
}
