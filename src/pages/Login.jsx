import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import { Lock, Mail, ShieldCheck, ArrowRight, CheckCircle, Building } from 'lucide-react';
import AiraLogo from '../components/common/AiraLogo';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';

export default function Login() {
  const { login, isAdmin, user } = useAuth();
  const { showToast } = useProperty();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in as admin
  React.useEffect(() => {
    if (isAdmin) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAdmin, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast('Welcome back, Administrator!', 'success');
      navigate('/admin', { replace: true });
    } else {
      setError(res.error?.message || 'Invalid email or password. Please verify your credentials.');
    }
  };

  const handleDemoAdmin = async () => {
    setLoading(true);
    const res = await login('admin@airainfra.com', 'admin123');
    setLoading(false);
    if (res.success) {
      showToast('Logged in as Master Administrator', 'success');
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 76px)',
        backgroundColor: '#fbfbfa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '460px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '40px 36px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
          border: '1px solid #edf0f3',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', marginBottom: '16px' }}>
            <AiraLogo height={48} />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#f15a24',
                backgroundColor: 'rgba(241, 90, 36, 0.08)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              ADMINISTRATOR LOGIN
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#110e2e',
              margin: '0 0 6px 0'
            }}
          >
            Management Portal
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            Authorized access for project management, lead tracking, and system administration.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: '#fef2f2',
              borderRadius: '12px',
              color: '#dc2626',
              fontSize: '0.8125rem',
              marginBottom: '20px',
              border: '1px solid #fee2e2',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Admin Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="admin@airainfra.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  color: '#1e293b'
                }}
              />
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  color: '#1e293b'
                }}
              />
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '0.9375rem',
              justifyContent: 'center',
              marginTop: '6px'
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Hub'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Quick Sign-in Section */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
              SUPABASE CLOUD PROJECT: <code style={{ color: '#0f172a' }}>{SUPABASE_PROJECT_ID}</code>
            </span>
          </div>

          <button
            onClick={handleDemoAdmin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #fed7aa',
              backgroundColor: '#fff7ed',
              color: '#c2410c',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <span>⚡ Quick Login as Master Admin</span>
          </button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link to="/" style={{ fontSize: '0.8125rem', color: '#64748b', textDecoration: 'none' }}>
              ← Return to public website (No login required)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
