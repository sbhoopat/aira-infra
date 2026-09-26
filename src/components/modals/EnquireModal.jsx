import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, User, Building, MessageSquare } from 'lucide-react';
import Modal from '../common/Modal';
import { useProperty } from '../../context/PropertyContext';
import { PROPERTIES_DATA } from '../../data/propertiesData';

export default function EnquireModal() {
  const { modalState, closeModal, submitEnquiry } = useProperty();
  const isOpen = modalState.isOpen && modalState.type === 'enquire';
  const currentProp = modalState.property || PROPERTIES_DATA[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyId: currentProp ? currentProp.id : 'aira-skyline',
    budget: '₹1.5 Cr - ₹2.5 Cr',
    message: 'I would like to know about available unit numbers, floor rise charges, and special launch offers.'
  });

  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (currentProp) {
      setFormData(prev => ({
        ...prev,
        propertyId: currentProp.id
      }));
    }
  }, [currentProp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const selectedProp = PROPERTIES_DATA.find(p => p.id === formData.propertyId) || currentProp;

    submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyName: selectedProp ? selectedProp.name : 'General Enquiry',
      propertyId: formData.propertyId,
      type: 'Pricing & Availability Enquiry',
      message: `[Budget: ${formData.budget}] ${formData.message}`
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={submitted ? "Enquiry Submitted!" : `Enquire about ${currentProp.name}`}
      subtitle={submitted ? "Our senior sales consultant will assist you promptly." : "Get customized payment plans, cost sheet breakdowns & priority inventory access."}
      maxWidth="560px"
    >
      {submitted ? (
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
              margin: '0 auto 16px',
              color: '#10b981'
            }}
          >
            <CheckCircle2 size={40} />
          </div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#110e2e', marginBottom: '8px' }}>
            Request Received Successfully
          </h4>
          <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Thank you, <strong>{formData.name}</strong>. An exclusive detailed pricing sheet and inventory availability list for <strong>{currentProp.name}</strong> has been shared with your registered contact details.
          </p>
          <button onClick={handleClose} className="btn-primary" style={{ minWidth: '140px' }}>
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Project of Interest
            </label>
            <select
              value={formData.propertyId}
              onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '0.9375rem'
              }}
            >
              {PROPERTIES_DATA.map(prop => (
                <option key={prop.id} value={prop.id}>
                  {prop.name} ({prop.location.area}) — {prop.priceDisplay}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Your Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
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
                Mobile Number *
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@email.com"
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

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Approx. Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.9375rem'
                }}
              >
                <option value="₹70 L - ₹1.2 Cr">₹70 Lakhs – ₹1.2 Cr</option>
                <option value="₹1.2 Cr - ₹2.0 Cr">₹1.2 Cr – ₹2.0 Cr</option>
                <option value="₹2.0 Cr - ₹3.5 Cr">₹2.0 Cr – ₹3.5 Cr</option>
                <option value="₹3.5 Cr+">₹3.5 Cr and above</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Your Specific Requirement / Message
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9375rem',
                resize: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              justifyContent: 'center',
              marginTop: '4px'
            }}
          >
            <Send size={18} />
            <span>Send Enquiry to Sales Desk</span>
          </button>
        </form>
      )}
    </Modal>
  );
}
