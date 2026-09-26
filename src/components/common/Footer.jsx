import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import AiraLogo from './AiraLogo';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer
      style={{
        backgroundColor: '#110e2e',
        color: '#ffffff',
        paddingTop: '64px',
        paddingBottom: '40px',
        marginTop: '80px',
        borderTop: '1px solid #1e1b4b'
      }}
    >
      <div className="container">
        
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Column 1: Brand & Tagline matching Screenshot */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                <AiraLogo height={50} variant="light" />
              </Link>
            </div>
            <p
              style={{
                color: '#9490b8',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                marginBottom: '24px',
                maxWidth: '320px'
              }}
            >
              Thoughtfully built homes across Hyderabad. Crafting breathable architecture, serene landscapes, and enduring residential communities.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '0.75rem',
                color: '#fed7aa'
              }}
            >
              <ShieldCheck size={16} color="#f15a24" />
              <span>100% TG-RERA Approved Projects</span>
            </div>
          </div>

          {/* Column 2: Visit & Office Location */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#fed7aa',
                marginBottom: '20px'
              }}
            >
              Visit
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#cbd5e1', fontSize: '0.9375rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="#f15a24" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>
                  <strong>Aira Experience Center</strong><br />
                  Neopolis Boulevard, Golden Mile Road,<br />
                  Kokapet, Hyderabad, Telangana 500075
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} color="#9490b8" />
                <span style={{ color: '#9490b8', fontSize: '0.85rem' }}>Daily: 9:30 AM – 7:30 PM IST</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#fed7aa',
                marginBottom: '20px'
              }}
            >
              Explore Properties
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9375rem' }}>
              <li>
                <Link to="/property/aira-skyline" style={{ color: '#cbd5e1', transition: 'color 0.2s ease' }} onMouseEnter={e => e.target.style.color = '#f15a24'} onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                  Aira Skyline (Kokapet)
                </Link>
              </li>
              <li>
                <Link to="/property/aira-stone-villas" style={{ color: '#cbd5e1', transition: 'color 0.2s ease' }} onMouseEnter={e => e.target.style.color = '#f15a24'} onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                  Aira Stone Villas (Shankarpally)
                </Link>
              </li>
              <li>
                <Link to="/property/aira-residences" style={{ color: '#cbd5e1', transition: 'color 0.2s ease' }} onMouseEnter={e => e.target.style.color = '#f15a24'} onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                  Aira Residences (Gachibowli)
                </Link>
              </li>
              <li>
                <Link to="/properties" style={{ color: '#cbd5e1', transition: 'color 0.2s ease' }} onMouseEnter={e => e.target.style.color = '#f15a24'} onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                  All Residential Projects
                </Link>
              </li>
              <li>
                <Link to="/compare" style={{ color: '#cbd5e1', transition: 'color 0.2s ease' }} onMouseEnter={e => e.target.style.color = '#f15a24'} onMouseLeave={e => e.target.style.color = '#cbd5e1'}>
                  Compare Floorplans & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Sales Helpline */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#fed7aa',
                marginBottom: '20px'
              }}
            >
              Sales Assistance
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9375rem' }}>
              <a
                href="tel:+919876543210"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1.0625rem'
                }}
              >
                <Phone size={18} color="#f15a24" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="mailto:sales@airainfra.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#cbd5e1'
                }}
              >
                <Mail size={16} color="#f15a24" />
                <span>sales@airainfra.com</span>
              </a>
              <p style={{ fontSize: '0.8125rem', color: '#9490b8', marginTop: '6px' }}>
                Looking for investor queries or channel partner registration? Reach us at info@airainfra.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching Screenshot */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '28px',
            fontSize: '0.875rem',
            color: '#9490b8'
          }}
        >
          <div>
            © {currentYear} Aira Infra. All rights reserved. Hyderabad, Telangana.
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ color: '#9490b8', transition: 'color 0.2s' }}>Privacy Policy</Link>
            <Link to="/contact" style={{ color: '#9490b8', transition: 'color 0.2s' }}>Terms of Use</Link>
            <Link to="/contact" style={{ color: '#9490b8', transition: 'color 0.2s' }}>RERA Disclosures</Link>
            <Link to="/admin" style={{ color: '#f15a24', fontWeight: 600 }}>Sales Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
