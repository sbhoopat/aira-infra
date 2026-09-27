import React, { useState } from 'react';
import { Download, CheckCircle2, FileText, Lock, Sparkles } from 'lucide-react';
import Modal from '../common/Modal';
import { useProperty } from '../../context/PropertyContext';
import { PROPERTIES_DATA } from '../../data/propertiesData';

export default function BrochureModal() {
  const { modalState, closeModal, submitEnquiry, properties } = useProperty();
  const isOpen = modalState.isOpen && modalState.type === 'brochure';
  const currentProp = modalState.property || properties?.[0] || PROPERTIES_DATA[0];


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    receiveWhatsApp: true
  });
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number to download.');
      return;
    }

    submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyName: currentProp?.name,
      propertyId: currentProp?.id,
      type: 'Brochure Download',
      message: `Downloaded project brochure & floor plan booklet. WhatsApp Opt-in: ${formData.receiveWhatsApp ? 'Yes' : 'No'}`
    });

    setDownloaded(true);

    // Simulate instant brochure file download
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([
        `====================================================
AIRA INFRA - PROJECT BROCHURE & SPECIFICATIONS
====================================================
Project: ${currentProp?.name}
Category: ${currentProp?.category}
Location: ${currentProp?.location.fullAddress}
Configurations: ${currentProp?.configurations.join(', ')}
Price Range: ${currentProp?.priceDisplay}
RERA Approved: ${currentProp?.reraNumber}
Total Land Parcel: ${currentProp?.landArea}
Open Space: ${currentProp?.openSpacePercentage}

DESCRIPTION:
${currentProp?.description}

HIGHLIGHTS:
${currentProp?.highlights.map(h => `- ${h}`).join('\n')}

SPECIFICATIONS:
- Structure: ${currentProp?.specifications.structure}
- Flooring: ${currentProp?.specifications.flooring}
- Doors: ${currentProp?.specifications.doors}
- Kitchen: ${currentProp?.specifications.kitchen}
- Sanitary: ${currentProp?.specifications.sanitary}

SALES OFFICE & EXPERIENCE CENTER:
Neopolis Boulevard, Golden Mile Road, Kokapet, Hyderabad
Helpline: +91 98765 43210 | sales@airainfra.com
====================================================`
      ], { type: 'text/plain;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = `${currentProp?.id}-brochure-airainfra.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  const handleClose = () => {
    setDownloaded(false);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={downloaded ? "Brochure Downloaded!" : `Download ${currentProp?.name} Brochure`}
      subtitle={downloaded ? "The comprehensive project booklet is ready." : "Get floor plans, price breakdown, master plan, and full specifications."}
      maxWidth="540px"
    >
      {downloaded ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              color: '#10b981'
            }}
          >
            <CheckCircle2 size={40} />
          </div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#110e2e', marginBottom: '8px' }}>
            Thank You, {formData.name}!
          </h4>
          <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Your official <strong>{currentProp?.name}</strong> digital brochure has started downloading. A high-res PDF copy and interactive 3D tour link have also been sent to <strong>{formData.phone}</strong>.
          </p>
          <div style={{ backgroundColor: '#fff7ed', padding: '14px', borderRadius: '12px', border: '1px solid #ffedd5', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: '#c2410c', fontWeight: 600 }}>
              💡 Tip: You can also schedule an on-site sample flat walk-through today.
            </span>
          </div>
          <button onClick={handleClose} className="btn-primary" style={{ minWidth: '150px' }}>
            Continue Exploring
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Project Preview Card */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0'
            }}
          >
            <img
              src={currentProp?.heroImage}
              alt={currentProp?.name}
              style={{ width: '80px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f15a24', letterSpacing: '0.05em' }}>
                {currentProp?.category} · {currentProp?.location.area}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: '#110e2e' }}>
                {currentProp?.name}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                {currentProp?.priceDisplay}
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Varma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9375rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Mobile Number (For WhatsApp / SMS copy) *
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9375rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9375rem'
              }}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8125rem', color: '#475569' }}>
            <input
              type="checkbox"
              checked={formData.receiveWhatsApp}
              onChange={(e) => setFormData({ ...formData, receiveWhatsApp: e.target.checked })}
              style={{ accentColor: '#f15a24' }}
            />
            <span>Send me instant PDF brochure & floor plans on WhatsApp</span>
          </label>

          <button
            type="submit"
            className="btn-primary"
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              justifyContent: 'center',
              marginTop: '8px'
            }}
          >
            <Download size={18} />
            <span>Download Instant Brochure (PDF)</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
            <Lock size={12} />
            <span>Your information is confidential & protected under RERA compliance.</span>
          </div>
        </form>
      )}
    </Modal>
  );
}
