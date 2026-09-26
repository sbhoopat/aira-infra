import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle2, MessageSquare, Building2, Sparkles } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { HYDERABAD_AREAS, PROPERTY_TYPES } from '../data/propertiesData';

export default function Contact() {
  const { submitEnquiry } = useProperty();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: 'Kokapet',
    propertyType: 'Apartments',
    budget: '₹1.5 Cr - ₹2.5 Cr',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyName: `General Inquiry (${formData.propertyType} in ${formData.preferredLocation})`,
      type: 'General Sales Inquiry',
      message: `${formData.message} [Budget: ${formData.budget}]`
    });

    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '36px', paddingBottom: '80px', backgroundColor: '#fbfbfa' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <span className="badge-category" style={{ display: 'block', marginBottom: '8px' }}>
            CONNECT WITH AIRA SALES DESK
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              fontWeight: 800,
              color: '#110e2e',
              lineHeight: 1.15,
              marginBottom: '12px'
            }}
          >
            We're Here to Guide Your Real Estate Journey
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Visit our state-of-the-art Experience Center in Kokapet or schedule a tailored call with our real estate specialists.
          </p>
        </div>

        {/* 2 Column Layout: Office Info & Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '36px'
          }}
        >
          {/* Left Column: Office Locations & Sales Helplines (5 cols) */}
          <div style={{ gridColumn: 'span 12' }} className="contact-info-col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Experience Center Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #edf0f3',
                  padding: '30px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f15a24' }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#110e2e', margin: 0 }}>
                      Aira Experience Center
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#f15a24', fontWeight: 700 }}>FLAGSHIP SALES GALLERY</span>
                  </div>
                </div>

                <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  Plot 14, Neopolis Boulevard, Golden Mile Road,<br />
                  Kokapet, Hyderabad, Telangana 500075
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' }}>
                    <Phone size={16} color="#f15a24" />
                    <strong>+91 98765 43210 / +91 40 4567 8900</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}>
                    <Mail size={16} color="#f15a24" />
                    <span>sales@airainfra.com</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b' }}>
                    <Clock size={16} color="#94a3b8" />
                    <span>Monday – Sunday: 9:30 AM to 7:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Corporate Office Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #edf0f3',
                  padding: '26px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <Building2 size={20} color="#110e2e" />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#110e2e', margin: 0 }}>
                    Corporate Headquarters
                  </h4>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                  Aira Towers, Level 8, DLF Cyber City Corridor,<br />
                  Gachibowli, Hyderabad, Telangana 500032
                </p>
              </div>

              {/* NRI & Institutional Desk */}
              <div
                style={{
                  backgroundColor: '#110e2e',
                  borderRadius: '24px',
                  padding: '24px',
                  color: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fed7aa', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
                  <Sparkles size={14} color="#f15a24" />
                  <span>DEDICATED NRI & GLOBAL INVESTOR DESK</span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 12px' }}>
                  Looking for virtual walkthroughs, FEMA regulatory advice, or power-of-attorney registration?
                </p>
                <a
                  href="mailto:nri@airainfra.com"
                  style={{ color: '#f15a24', fontWeight: 700, fontSize: '0.875rem' }}
                >
                  Email: nri@airainfra.com →
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div style={{ gridColumn: 'span 12' }} className="contact-form-col">
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '28px',
                border: '1px solid #edf0f3',
                padding: 'clamp(24px, 5vw, 44px)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '36px 0' }}>
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      backgroundColor: '#ecfdf5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: '#10b981'
                    }}
                  >
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#110e2e', marginBottom: '10px' }}>
                    Thank You for Reaching Out
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 24px' }}>
                    Your message has been assigned to our Senior Hyderabad Relationship Manager. We will call you back within 15 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', preferredLocation: 'Kokapet', propertyType: 'Apartments', budget: '₹1.5 Cr - ₹2.5 Cr', message: '' });
                    }}
                    className="btn-primary"
                    style={{ padding: '10px 24px' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 700, color: '#110e2e', marginBottom: '6px' }}>
                      Send an Official Sales Enquiry
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                      Complete the form below to receive customized price sheets, floor plans, and site visit coordinates.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Rao"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          fontSize: '0.9375rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          fontSize: '0.9375rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="anand@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.9375rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        Preferred Location
                      </label>
                      <select
                        value={formData.preferredLocation}
                        onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          fontSize: '0.9375rem',
                          color: '#1e293b'
                        }}
                      >
                        {HYDERABAD_AREAS.filter(a => a !== 'All areas').map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                        Property Category
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          fontSize: '0.9375rem',
                          color: '#1e293b'
                        }}
                      >
                        <option value="Apartments">Luxury High-Rise Apartments</option>
                        <option value="Villas">Handcrafted Stone Villas</option>
                        <option value="Plots">Gated Villa Plots</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Investment Budget
                    </label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['< ₹1.0 Cr', '₹1.0 - ₹1.8 Cr', '₹1.8 - ₹3.0 Cr', '₹3.0 Cr+'].map(b => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '10px',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            border: formData.budget === b ? '1.5px solid #f15a24' : '1px solid #e2e8f0',
                            backgroundColor: formData.budget === b ? '#fff6f2' : '#ffffff',
                            color: formData.budget === b ? '#f15a24' : '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Message or Specific Inquiries
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your requirements regarding floor preferences, possession date, or payment schemes..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.9375rem',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '14px 28px', fontSize: '1rem', justifyContent: 'center' }}
                  >
                    <Send size={18} />
                    <span>Submit Sales Inquiry</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <ShieldCheck size={16} color="#10b981" />
                    <span>Your personal information is encrypted and strictly used for property consultation.</span>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-info-col {
            grid-column: span 5 !important;
          }
          .contact-form-col {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </div>
  );
}
