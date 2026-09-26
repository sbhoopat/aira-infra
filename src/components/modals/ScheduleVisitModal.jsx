import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Car, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import Modal from '../common/Modal';
import { useProperty } from '../../context/PropertyContext';
import { PROPERTIES_DATA } from '../../data/propertiesData';

export default function ScheduleVisitModal() {
  const { modalState, closeModal, submitEnquiry } = useProperty();
  const isOpen = modalState.isOpen && modalState.type === 'schedule';
  const preselectedProp = modalState.property;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyId: preselectedProp ? preselectedProp.id : 'aira-skyline',
    visitDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    visitTime: '11:00 AM',
    needCabPickup: false,
    pickupLocation: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync when preselected property changes
  React.useEffect(() => {
    if (preselectedProp) {
      setFormData(prev => ({
        ...prev,
        propertyId: preselectedProp.id
      }));
    }
  }, [preselectedProp]);

  const timeSlots = [
    '10:00 AM - 11:30 AM',
    '11:30 AM - 01:00 PM',
    '02:30 PM - 04:00 PM',
    '04:30 PM - 06:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const selectedProp = PROPERTIES_DATA.find(p => p.id === formData.propertyId) || preselectedProp;

    submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyName: selectedProp ? selectedProp.name : 'All Projects',
      propertyId: formData.propertyId,
      type: 'Site Visit Request',
      visitDate: formData.visitDate,
      visitTime: formData.visitTime,
      message: `${formData.message} ${formData.needCabPickup ? `[Cab requested from: ${formData.pickupLocation}]` : ''}`
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
      title={submitted ? "Site Visit Confirmed!" : "Schedule a Private Site Visit"}
      subtitle={submitted ? "We have reserved your dedicated relationship manager." : "Experience luxury living with an immersive walk-through."}
      maxWidth="620px"
    >
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
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
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#110e2e', marginBottom: '10px' }}>
            We're excited to welcome you!
          </h4>
          <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 24px' }}>
            A confirmation SMS and calendar invite have been sent to <strong>{formData.phone}</strong>. Our Senior Property Advisor will connect with you to finalize entry passes.
          </p>
          <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '14px', textAlign: 'left', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b' }}>Date & Time:</span>
              <strong style={{ color: '#1e293b' }}>{formData.visitDate} ({formData.visitTime})</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b' }}>Location:</span>
              <strong style={{ color: '#1e293b' }}>
                {PROPERTIES_DATA.find(p => p.id === formData.propertyId)?.location.fullAddress || 'Kokapet Experience Center'}
              </strong>
            </div>
          </div>
          <button onClick={handleClose} className="btn-primary" style={{ minWidth: '160px' }}>
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Property Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Selected Property *
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
              required
            >
              {PROPERTIES_DATA.map(prop => (
                <option key={prop.id} value={prop.id}>
                  {prop.name} — {prop.location.area} ({prop.priceDisplay})
                </option>
              ))}
            </select>
          </div>

          {/* Name & Phone in 2 cols */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Full Name *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Sateesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9375rem'
                  }}
                  required
                />
                <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Mobile Number *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9375rem'
                  }}
                  required
                />
                <Phone size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9375rem'
                }}
              />
              <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          {/* Date and Time Slot */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Preferred Date *
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.visitDate}
                onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
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
                Preferred Time Slot *
              </label>
              <select
                value={formData.visitTime}
                onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.9375rem'
                }}
              >
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Complimentary Cab Pickup Request */}
          <div style={{ backgroundColor: '#fff7ed', padding: '14px 16px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, color: '#9a3412' }}>
              <input
                type="checkbox"
                checked={formData.needCabPickup}
                onChange={(e) => setFormData({ ...formData, needCabPickup: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#f15a24' }}
              />
              <Car size={18} color="#f15a24" />
              <span>Request Complimentary AC Cab Pickup & Drop (Hyderabad only)</span>
            </label>

            {formData.needCabPickup && (
              <div style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Enter pickup address / landmark (e.g. Kondapur Main Road)"
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #fdba74',
                    fontSize: '0.875rem',
                    backgroundColor: '#ffffff'
                  }}
                  required={formData.needCabPickup}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary"
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              justifyContent: 'center',
              marginTop: '6px'
            }}
          >
            Confirm Site Visit Booking
          </button>
        </form>
      )}
    </Modal>
  );
}
