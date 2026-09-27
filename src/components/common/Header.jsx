import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  Search,
  Menu,
  X,
  PhoneCall,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import AiraLogo from './AiraLogo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites, compareList, openModal } = useProperty();
  const { user, profile, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Projects', path: '/properties?view=projects' },
    { name: 'Properties', path: '/properties' },
    { name: 'EMI Calculator', path: '/properties#emi' },
    { name: 'Contact', path: '/contact' },
    { name: isAdmin ? 'Admin Dashboard' : 'Admin Login', path: isAdmin ? '/admin' : '/login', badge: isAdmin ? 'Live' : null }
  ];


  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid #eef2f6' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Architectural Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <AiraLogo height={50} />
        </Link>

        {/* Center/Right Desktop Navigation */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path || (link.path.includes('?') && location.search.includes('view=projects'));
            return (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#b45309' : '#1e1b4b',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 0'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#d97706';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isActive ? '#b45309' : '#1e1b4b';
                }}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                      color: '#ffffff',
                      padding: '1px 7px',
                      borderRadius: '10px',
                      boxShadow: '0 2px 6px rgba(217, 119, 6, 0.35)'
                    }}
                  >
                    {link.badge}
                  </span>
                )}
                {/* Active Gold Underline Indicator */}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #d97706, #fbbf24)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Compare Link */}
          {compareList.length > 0 && (
            <Link
              to="/compare"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#110e2e',
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
              title="Compare Properties"
            >
              <Layers size={16} color="#f15a24" />
              <span>Compare ({compareList.length})</span>
            </Link>
          )}

          {/* Favorites Heart Badge */}
          <Link
            to="/favorites"
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#334155',
              transition: 'all 0.2s ease'
            }}
            aria-label="View Saved Properties"
          >
            <Heart size={18} color={favorites.length > 0 ? "#f15a24" : "#475569"} fill={favorites.length > 0 ? "#f15a24" : "none"} />
            {favorites.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  backgroundColor: '#f15a24',
                  color: '#ffffff',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Schedule Site Visit CTA */}
          <button
            onClick={() => openModal('schedule')}
            className="btn-primary"
            style={{
              padding: '9px 18px',
              fontSize: '0.875rem',
              display: 'none'
            }}
            id="desktop-cta-btn"
          >
            <Calendar size={16} />
            <span>Schedule Visit</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              color: '#110e2e'
            }}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#b45309' : '#1e1b4b',
                  padding: '10px 0',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('schedule');
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Calendar size={18} />
              <span>Schedule Private Site Visit</span>
            </button>
            <a
              href="tel:+919876543210"
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <PhoneCall size={18} color="#f15a24" />
              <span>Call Sales: +91 98765 43210</span>
            </a>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          #desktop-cta-btn {
            display: inline-flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
