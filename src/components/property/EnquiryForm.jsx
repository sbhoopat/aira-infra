import React, { useState } from 'react';
import { Send, Phone, Mail, User, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import { PROPERTIES_DATA } from '../../data/propertiesData';

export default function EnquiryForm({ property = null, title = "Request Property Information", subtitle = "Receive complete pricing breakdown, master plans & brochure instantly." }) {
  const { submitEnquiry, properties } = useProperty();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyId: property ? property.id : (properties?.[0]?.id || 'aira-skyline'),
    configuration: '3 BHK',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (property) {
      setFormData(prev => ({
        ...prev,
        propertyId: property.id
      }));
    }
  }, [property]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const selectedProp = (properties || []).find(p => p.id === formData.propertyId) || property;


    submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyName: selectedProp ? selectedProp.name : 'General Enquiry',
      propertyId: formData.propertyId,
      type: 'Direct Property Enquiry',
      message: `${formData.message} [Config Interest: ${formData.configuration}]`
    });

    setIsSuccess(true);
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #edf0f3',
        boxShadow: 'var(--shadow-md)',
        padding: 'clamp(20px, 4vw, 32px)'
      }}
    >
      {isSuccess ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#10b981'
            }}
          >
            <CheckCircle2 size={36} />
          </div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#110e2e', marginBottom: '8px' }}>
            Enquiry Received!
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Our Senior Portfolio Advisor has been assigned to your query and will contact you via WhatsApp / Phone shortly.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({ name: '', phone: '', email: '', propertyId: property ? property.id : 'aira-skyline', configuration: '3 BHK', message: '' });
            }}
            className="btn-secondary"
            style={{ fontSize: '0.875rem', padding: '8px 18px' }}
          >
            Submit Another Query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: '#110e2e', marginBottom: '4px' }}>
              {title}
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
              {subtitle}
            </p>
          </div>

          {/* Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Your Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Varma"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Mobile Phone Number *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <Phone size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Email Address (Optional)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="ramesh@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Property Select if not fixed */}
          {!property && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Select Property
              </label>
              <select
                value={formData.propertyId}
                onChange={e => setFormData({ ...formData, propertyId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff'
                }}
              >
                {PROPERTIES_DATA.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.location.area})</option>
                ))}
              </select>
            </div>
          )}

          {/* Configuration Interest */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Interested Configuration
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['2 BHK', '3 BHK', '4 BHK', 'Villa'].map(cfg => (
                <button
                  type="button"
                  key={cfg}
                  onClick={() => setFormData({ ...formData, configuration: cfg })}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    border: formData.configuration === cfg ? '1.5px solid #f15a24' : '1px solid #e2e8f0',
                    backgroundColor: formData.configuration === cfg ? '#fff6f2' : '#ffffff',
                    color: formData.configuration === cfg ? '#f15a24' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {cfg}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Any specific request or budget?
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Looking for East-facing high floor with immediate booking..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '0.875rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <a
              href="tel:8886087778"
              className="btn-primary"
              style={{ flex: 1, padding: '12px', justifyContent: 'center', fontSize: '0.9375rem', textDecoration: 'none', backgroundColor: '#3b82f6', border: 'none' }}
            >
              <Phone size={16} />
              <span>Call</span>
            </a>
            <a
              href="https://wa.me/918886087778"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ flex: 1, padding: '12px', justifyContent: 'center', fontSize: '0.9375rem', textDecoration: 'none', backgroundColor: '#25D366', color: 'white', border: 'none' }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>100% Privacy. Zero spam calls. Official developer sales desk.</span>
          </div>

        </form>
      )}
    </div>
  );
}
