import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyGallery from '../components/property/PropertyGallery';
import EnquiryForm from '../components/property/EnquiryForm';
import PropertyCard from '../components/property/PropertyCard';
import {
  MapPin,
  Calendar,
  FileDown,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
  Phone,
  MessageCircle,
  FileText,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, openModal } = useProperty();
  const { isAdmin } = useAuth();

  // Find property by id or slug
  const property = properties.find(p => p.id === id) || properties[0];

  const handleOpenLightbox = (index = 0) => {
    openModal('lightbox', property, {
      images: property?.images?.length ? property.images : [property?.heroImage],
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
              <span className="badge-category">{property.category || property.type?.toUpperCase()}</span>
              <span className="badge-status">{property.status}</span>
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
              <span>{property.location?.area}, {property.location?.city}</span>
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
              Price
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
              {property.priceDisplay || property.price_display || 'On Request'}
            </div>
          </div>
        </div>

        {/* Gallery Component */}
        <PropertyGallery
          images={property.images?.length ? property.images : [property.heroImage]}
          propertyName={property.name}
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
              {Array.isArray(property.configurations) ? property.configurations.join(', ') : property.configurations || 'N/A'}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Area / Sizes</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#110e2e', marginTop: '2px' }}>
              {property.areaDisplay || property.area_display || 'On Request'}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Possession Date</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#110e2e', marginTop: '2px' }}>
              {property.possessionDate || property.possession_date || 'On Request'}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Total Units</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#110e2e', marginTop: '2px' }}>
              {property.totalUnits || property.total_units || 'N/A'}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Floors</span>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#110e2e', marginTop: '2px' }}>
              {property.floors || 'N/A'}
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
                {property.tagline || property.name}
              </h2>
            </div>

            {/* Complete Project Details Matrix */}
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
                COMPLETE DETAILS
              </span>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginTop: '20px'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Project Name</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                    {property.name || '-'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Category / Type</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                    {property.category || property.type || '-'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Location</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                    {property.location?.area || '-'}, {property.location?.city || '-'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Configurations (BHK)</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                    {Array.isArray(property.configurations) ? property.configurations.join(', ') || '-' : property.configurations || '-'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Sizes / Area</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                    {property.areaDisplay || property.area_display || '-'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Price</span>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                    {property.priceDisplay || property.price_display || '-'}
                  </div>
                </div>
                {isAdmin ? (
                  <>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Possession Date</span>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                        {property.possessionDate || property.possession_date || '-'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Total Units</span>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                        {property.totalUnits || property.total_units || '-'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Floors</span>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                        {property.floors || '-'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>USP / Tagline</span>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                        {property.tagline || '-'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Google Drive URL</span>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px', wordBreak: 'break-all' }}>
                        {property.google_drive_url ? (
                          <a href={property.google_drive_url} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9' }}>
                            View Drive
                          </a>
                        ) : '-'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Lead Registration</span>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px', wordBreak: 'break-all' }}>
                        {property.lead_regist || '-'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>CP Code</span>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                        {property.cp_code || '-'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Status</span>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#110e2e', marginTop: '4px' }}>
                        {property.status || '-'}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ gridColumn: '1 / -1', marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '32px', padding: '32px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div style={{ backgroundColor: '#fff7ed', color: '#ea580c', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                        <span>👑</span> PREMIUM PROPERTY
                      </div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                        Additional Details
                      </h3>
                      <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
                        Premium project details like Floor Plans, Possession Date, and Master USP are reserved. Request more details to unlock.
                      </p>
                      
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={24} color="#334155" />
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Floor Plans</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Calendar size={24} color="#334155" />
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Possession Date</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Star size={24} color="#334155" />
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Master USP</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ width: '1px', backgroundColor: '#e2e8f0', display: 'none' }} className="md-divider"></div>

                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <a
                        href="tel:8886087778"
                        style={{ width: '100%', maxWidth: '320px', padding: '16px 20px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none', backgroundColor: '#3b82f6', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '12px', color: '#fff', marginBottom: '16px', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Phone size={20} />
                          <span>Call for Details</span>
                        </div>
                        <ArrowRight size={20} />
                      </a>
                      
                      <a
                        href="https://wa.me/918886087778"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ width: '100%', maxWidth: '320px', padding: '16px 20px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none', backgroundColor: '#22c55e', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(34,197,94,0.3)', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <MessageCircle size={20} />
                          <span>WhatsApp Us</span>
                        </div>
                        <ArrowRight size={20} />
                      </a>

                      <div style={{ width: '40px', height: '1px', backgroundColor: '#e2e8f0', marginBottom: '16px' }}></div>

                      <span style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>Talk to our property experts</span>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <img src="https://i.pravatar.cc/150?img=11" alt="Expert 1" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                        <img src="https://i.pravatar.cc/150?img=5" alt="Expert 2" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                        <img src="https://i.pravatar.cc/150?img=12" alt="Expert 3" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location Map URL Iframe if available */}
            {property.locationMapUrl && property.locationMapUrl.includes('google.com/maps') && (
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
                  LOCATION MAP
                </span>
                <iframe
                  src={property.locationMapUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: '16px', marginTop: '16px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}

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

                  {property.brochureUrl && (
                    <a
                      href={property.brochureUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '12px', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}
                    >
                      <FileDown size={18} />
                      <span>Download PDF Brochure</span>
                    </a>
                  )}
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
                  Other Projects You May Like
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
