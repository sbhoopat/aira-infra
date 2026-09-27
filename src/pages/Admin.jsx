import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Calendar,
  FileDown,
  PhoneCall,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Download,
  ShieldCheck,
  Building,
  Mail,
  Trash2,
  Plus,
  Edit3,
  Database,
  Lock,
  LogOut,
  UserPlus,
  Key,
  ExternalLink,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Video,
  FileText,
  Copy,
  Check,
  Eye,
  AlertCircle,
  X
} from 'lucide-react';
import { formatDate, formatCurrency } from '../utils/formatters';
import { HYDERABAD_AREAS, PROPERTY_STATUSES, PROPERTY_TYPES } from '../data/propertiesData';
import { SUPABASE_PROJECT_ID, SUPABASE_URL } from '../lib/supabase';

const AMENITY_OPTIONS = [
  'Swimming Pool',
  'Clubhouse',
  'Gym & Fitness Center',
  'EV Charging',
  'Tennis Court',
  'Badminton Court',
  'Children\'s Play Area',
  'Jogging Track',
  'Yoga & Meditation Deck',
  '24/7 Security & CCTV',
  'Power Backup',
  'Mini Theatre',
  'Spa & Salon',
  'Landscaped Zen Gardens',
  'Private Heated Plunge Pool'
];

export default function Admin() {
  const {
    enquiries,
    updateEnquiryStatus,
    showToast,
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    supabaseConnected
  } = useProperty();

  const { user, profile, isAdmin, logout, createNewUser } = useAuth();

  // Active Admin Tab: 'projects' | 'leads' | 'users' | 'database'
  const [activeTab, setActiveTab] = useState('projects');

  // Leads Filter State
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Project Modal State (Add or Edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null); // null = Add new, string = Edit existing

  const initialProjectState = {
    name: '',
    tagline: '',
    type: 'Apartments',
    status: 'Ongoing',
    area: 'Kokapet',
    fullAddress: '',
    priceDisplay: '₹1.5 Cr - ₹2.8 Cr',
    priceMin: 15000000,
    priceMax: 28000000,
    pricePerSqFt: 8500,
    configurations: ['3 BHK', '4 BHK'],
    bhkDisplay: '3 & 4 BHK',
    areaDisplay: '1,850 - 3,200 Sq. Ft.',
    areaMin: 1850,
    areaMax: 3200,
    possessionDate: 'December 2027',
    totalUnits: 240,
    towers: 3,
    floors: 'G + 35 Floors',
    landArea: '5.2 Acres',
    openSpacePercentage: '76%',
    reraNumber: 'P02400008892',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=Pa6bW6Xgr6g',
    brochureUrl: '',
    description: 'Aira Infra presents ultra-modern architecture engineered for maximum sunlight and natural air corridors with room to breathe.',
    highlights: '50,000 Sq. Ft. Club Elegance\nTemperature-Controlled Infinity Pool\n100% Vastu Compliant East & West Units\nEV Fast Charging Stations',
    amenities: ['Swimming Pool', 'Clubhouse', 'Gym & Fitness Center', 'EV Charging', '24/7 Security & CCTV', 'Landscaped Zen Gardens']
  };

  const [projectForm, setProjectForm] = useState(initialProjectState);
  const [newGalleryImage, setNewGalleryImage] = useState('');

  // User Management State
  const [usersList, setUsersList] = useState([
    {
      id: 'usr-01',
      name: 'Aira Master Admin',
      email: 'admin@airainfra.com',
      role: 'admin',
      created_at: '2026-09-01T10:00:00.000Z'
    },
    {
      id: 'usr-02',
      name: 'Suresh Reddy (Sales Lead)',
      email: 'suresh.reddy@airainfra.com',
      role: 'staff',
      created_at: '2026-09-15T12:30:00.000Z'
    }
  ]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('admin');
  const [userCreating, setUserCreating] = useState(false);

  // Copied SQL state
  const [copiedSql, setCopiedSql] = useState(false);

  // Open Modal for Adding
  const handleOpenAddModal = () => {
    setEditingProjectId(null);
    setProjectForm(initialProjectState);
    setIsProjectModalOpen(true);
  };

  // Open Modal for Editing
  const handleOpenEditModal = (prop) => {
    setEditingProjectId(prop.id);
    setProjectForm({
      name: prop.name || '',
      tagline: prop.tagline || '',
      type: prop.type || 'Apartments',
      status: prop.status || 'Ongoing',
      area: prop.location?.area || 'Kokapet',
      fullAddress: prop.location?.fullAddress || '',
      priceDisplay: prop.priceDisplay || '',
      priceMin: prop.priceMin || 15000000,
      priceMax: prop.priceMax || 30000000,
      pricePerSqFt: prop.pricePerSqFt || 8500,
      configurations: prop.configurations || ['3 BHK', '4 BHK'],
      bhkDisplay: prop.bhkDisplay || '3 & 4 BHK',
      areaDisplay: prop.areaDisplay || '',
      areaMin: prop.areaMin || 1800,
      areaMax: prop.areaMax || 3000,
      possessionDate: prop.possessionDate || 'December 2027',
      totalUnits: prop.totalUnits || 100,
      towers: prop.towers || 2,
      floors: prop.floors || 'G + 30 Floors',
      landArea: prop.landArea || '5 Acres',
      openSpacePercentage: prop.openSpacePercentage || '75%',
      reraNumber: prop.reraNumber || '',
      heroImage: prop.heroImage || '',
      images: prop.images || [prop.heroImage || ''],
      videoUrl: prop.videoUrl || 'https://www.youtube.com/watch?v=Pa6bW6Xgr6g',
      brochureUrl: prop.brochureUrl || '',
      description: prop.description || '',
      highlights: (prop.highlights || []).join('\n'),
      amenities: prop.amenities || ['Swimming Pool', 'Clubhouse', 'Gym & Fitness Center']
    });
    setIsProjectModalOpen(true);
  };

  // Save Project (Add or Edit)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.name.trim()) {
      showToast('Please specify a project name', 'error');
      return;
    }

    const highlightsArray = projectForm.highlights
      ? projectForm.highlights.split('\n').map(s => s.trim()).filter(Boolean)
      : ['Luxury Space Engineering', '100% Vastu Compliant'];

    const payload = {
      ...projectForm,
      highlights: highlightsArray,
      location: {
        area: projectForm.area,
        city: 'Hyderabad',
        fullAddress: projectForm.fullAddress || `${projectForm.area}, Hyderabad, Telangana`,
        pincode: '500075',
        coordinates: { lat: 17.4125, lng: 78.3276 }
      }
    };

    if (editingProjectId) {
      await updateProperty(editingProjectId, payload);
    } else {
      await addProperty(payload);
    }

    setIsProjectModalOpen(false);
  };

  // Add Image to Gallery
  const handleAddGalleryImage = () => {
    if (!newGalleryImage.trim()) return;
    setProjectForm(prev => ({
      ...prev,
      images: [...prev.images, newGalleryImage.trim()]
    }));
    setNewGalleryImage('');
  };

  // Remove Image from Gallery
  const handleRemoveGalleryImage = (idx) => {
    setProjectForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  // Toggle Amenity
  const handleToggleAmenity = (amenity) => {
    setProjectForm(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists ? prev.amenities.filter(a => a !== amenity) : [...prev.amenities, amenity]
      };
    });
  };

  // Create User Submit
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserEmail || !newUserPassword || !newUserName) {
      showToast('Please fill in all user fields', 'error');
      return;
    }

    setUserCreating(true);
    const res = await createNewUser(newUserEmail, newUserPassword, newUserName, newUserRole);
    setUserCreating(false);

    const newUserObj = {
      id: res.user?.id || `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      created_at: new Date().toISOString()
    };

    setUsersList(prev => [newUserObj, ...prev]);
    showToast(`User ${newUserName} added successfully!`, 'success');
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('');
  };

  // Export CSV
  const exportCSV = () => {
    if (enquiries.length === 0) {
      showToast('No enquiries to export.', 'info');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Property', 'Type', 'Status', 'Message'];
    const rows = enquiries.map(e => [
      e.id,
      e.createdAt,
      `"${e.name}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.propertyName}"`,
      `"${e.type}"`,
      `"${e.status}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `aira_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported successfully to CSV!', 'success');
  };

  // Filtered Leads
  const filteredEnquiries = enquiries.filter(item => {
    if (filterType !== 'All' && item.type !== filterType) return false;
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (item.name || '').toLowerCase().includes(q);
      const matchPhone = (item.phone || '').toLowerCase().includes(q);
      const matchProp = (item.propertyName || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchProp) return false;
    }
    return true;
  });

  return (
    <div style={{ paddingTop: '36px', paddingBottom: '80px', backgroundColor: '#fbfbfa', minHeight: '90vh' }}>
      <div className="container">
        
        {/* Top Management Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '28px',
            paddingBottom: '20px',
            borderBottom: '1px solid #edf0f3'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-category">ADMINISTRATION CONTROL SUITE</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  border: '1px solid #a7f3d0'
                }}
              >
                ● Live Database: {SUPABASE_PROJECT_ID}
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                color: '#110e2e',
                lineHeight: 1.15,
                margin: 0
              }}
            >
              Project & User Maintenance
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* User Profile Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-full)',
                border: '1px solid #e2e8f0',
                fontSize: '0.8125rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#f15a24',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.8rem'
                }}
              >
                {(profile?.full_name || user?.email || 'A')[0].toUpperCase()}
              </div>
              <div>
                <span style={{ fontWeight: 700, color: '#110e2e', display: 'block', lineHeight: 1.2 }}>
                  {profile?.full_name || user?.email?.split('@')[0]}
                </span>
                <span style={{ fontSize: '0.6875rem', color: '#059669', fontWeight: 600 }}>
                  Role: {profile?.role || 'Admin'}
                </span>
              </div>
            </div>

            {/* Quick Add Project CTA */}
            <button
              onClick={handleOpenAddModal}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.8125rem' }}
            >
              <Plus size={15} />
              <span>Create Project</span>
            </button>

            {/* Sign Out Button */}
            <button
              onClick={logout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#64748b',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '28px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '8px',
            overflowX: 'auto'
          }}
        >
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'projects' ? '#f15a24' : 'transparent',
              color: activeTab === 'projects' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Building size={16} />
            <span>Manage Projects ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'users' ? '#f15a24' : 'transparent',
              color: activeTab === 'users' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <UserPlus size={16} />
            <span>User Maintenance ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'leads' ? '#f15a24' : 'transparent',
              color: activeTab === 'leads' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Users size={16} />
            <span>Sales Leads & Site Visits ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'database' ? '#f15a24' : 'transparent',
              color: activeTab === 'database' ? '#ffffff' : '#475569',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Database size={16} />
            <span>Supabase Cloud Schema</span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* TAB 1: MANAGE PROJECTS                                             */}
        {/* ================================================================== */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, margin: 0, color: '#110e2e' }}>
                  Active Real Estate Projects
                </h3>
                <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  All additions and edits sync dynamically to the frontend and Supabase.
                </span>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.875rem' }}
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {properties.map(prop => (
                <div
                  key={prop.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #edf0f3',
                    overflow: 'hidden',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image with Badges */}
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img
                      src={prop.heroImage || prop.images?.[0]}
                      alt={prop.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                      <span className="badge-status">{prop.status}</span>
                      <span className="badge-status" style={{ backgroundColor: '#110e2e', color: '#ffffff' }}>
                        {prop.type}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#110e2e', margin: '0 0 4px 0' }}>
                        {prop.name}
                      </h4>
                      <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                        📍 {prop.location?.area || 'Hyderabad'} · {prop.bhkDisplay || '3 & 4 BHK'}
                      </p>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f15a24' }}>
                        {prop.priceDisplay}
                      </div>
                    </div>

                    {/* Admin Actions Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                      <a
                        href={`/project/${prop.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.8125rem', color: '#0284c7', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Eye size={14} />
                        <span>Live Page</span>
                      </a>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleOpenEditModal(prop)}
                          style={{
                            backgroundColor: '#f8fafc',
                            color: '#334155',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Edit3 size={13} color="#f15a24" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to permanently remove "${prop.name}"?`)) {
                              deleteProperty(prop.id);
                            }
                          }}
                          style={{
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            border: '1px solid #fee2e2',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: USER MAINTENANCE                                            */}
        {/* ================================================================== */}
        {activeTab === 'users' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
            
            {/* Create New User Card */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #edf0f3', padding: '28px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(241, 90, 36, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserPlus size={20} color="#f15a24" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, margin: 0, color: '#110e2e' }}>
                    Provision New User
                  </h3>
                  <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                    Create authorized admin or staff credentials.
                  </span>
                </div>
              </div>

              <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Varma"
                    value={newUserName}
                    onChange={e => setNewUserName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@airainfra.com"
                    value={newUserEmail}
                    onChange={e => setNewUserEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newUserPassword}
                    onChange={e => setNewUserPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Role & Permissions
                  </label>
                  <select
                    value={newUserRole}
                    onChange={e => setNewUserRole(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.875rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="admin">Administrator (Full Access: Add/Edit Projects & Users)</option>
                    <option value="staff">Sales Staff (CRM Leads & Site Visits Only)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={userCreating}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.875rem', justifyContent: 'center', marginTop: '6px' }}
                >
                  <UserPlus size={16} />
                  <span>{userCreating ? 'Creating in Supabase...' : 'Save User to System'}</span>
                </button>
              </form>
            </div>

            {/* Users Table */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #edf0f3', padding: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 16px 0', color: '#110e2e' }}>
                System Users & Roles
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'left' }}>
                      <th style={{ padding: '12px 14px' }}>User</th>
                      <th style={{ padding: '12px 14px' }}>Role</th>
                      <th style={{ padding: '12px 14px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px' }}>
                          <div style={{ fontWeight: 700, color: '#110e2e' }}>{u.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</div>
                        </td>
                        <td style={{ padding: '14px' }}>
                          <span
                            style={{
                              padding: '3px 10px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: u.role === 'admin' ? '#fff7ed' : '#e0f2fe',
                              color: u.role === 'admin' ? '#c2410c' : '#0369a1'
                            }}
                          >
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '14px' }}>
                          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                            ● Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: SALES LEADS & CRM                                           */}
        {/* ================================================================== */}
        {activeTab === 'leads' && (
          <div>
            {/* Filter Controls Bar */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #edf0f3',
                padding: '16px 20px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                marginBottom: '24px'
              }}
            >
              {/* Search */}
              <div style={{ position: 'relative', flex: '1 1 240px' }}>
                <input
                  type="text"
                  placeholder="Search lead by name, phone, or property..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>

              {/* Status Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>Status:</span>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="Deal Closed">Deal Closed</option>
                </select>

                <button
                  onClick={exportCSV}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #edf0f3',
                overflowX: 'auto',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '850px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', fontSize: '0.8125rem', color: '#64748b', textTransform: 'uppercase' }}>
                    <th style={{ padding: '16px 20px' }}>Lead Details</th>
                    <th style={{ padding: '16px 20px' }}>Target Property</th>
                    <th style={{ padding: '16px 20px' }}>Lead Type</th>
                    <th style={{ padding: '16px 20px' }}>Visit Details / Notes</th>
                    <th style={{ padding: '16px 20px' }}>Date</th>
                    <th style={{ padding: '16px 20px' }}>Lead Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
                        No leads found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.875rem' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 700, color: '#110e2e', fontSize: '0.9375rem' }}>
                            {item.name}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', marginTop: '2px' }}>
                            <PhoneCall size={13} color="#f15a24" />
                            <span>{item.phone}</span>
                          </div>
                          {item.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>
                              <Mail size={12} />
                              <span>{item.email}</span>
                            </div>
                          )}
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600, color: '#110e2e' }}>
                            {item.propertyName}
                          </div>
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: (item.type || '').includes('Visit') ? '#fff7ed' : (item.type || '').includes('Brochure') ? '#e0f2fe' : '#f3e8ff',
                              color: (item.type || '').includes('Visit') ? '#c2410c' : (item.type || '').includes('Brochure') ? '#0369a1' : '#7e22ce'
                            }}
                          >
                            {item.type}
                          </span>
                        </td>

                        <td style={{ padding: '16px 20px', maxWidth: '280px' }}>
                          {item.visitDate && (
                            <div style={{ fontSize: '0.8125rem', color: '#110e2e', fontWeight: 600, marginBottom: '2px' }}>
                              📅 {item.visitDate} ({item.visitTime})
                            </div>
                          )}
                          <div style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.4 }}>
                            {item.message || 'No additional note'}
                          </div>
                        </td>

                        <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                          {formatDate(item.createdAt)}
                        </td>

                        <td style={{ padding: '16px 20px' }}>
                          <select
                            value={item.status || 'New'}
                            onChange={e => updateEnquiryStatus(item.id, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '8px',
                              fontSize: '0.8125rem',
                              fontWeight: 700,
                              border: '1px solid #e2e8f0',
                              backgroundColor: item.status === 'Contacted' ? '#ecfdf5' : item.status === 'Deal Closed' ? '#f0fdf4' : '#ffffff',
                              color: item.status === 'Contacted' ? '#047857' : item.status === 'Deal Closed' ? '#15803d' : '#334155',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                            <option value="Deal Closed">Deal Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: DATABASE & SUPABASE CLOUD                                   */}
        {/* ================================================================== */}
        {activeTab === 'database' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #edf0f3', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div>
                <span className="badge-category">SUPABASE POSTGRESQL CLOUD</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, margin: '4px 0', color: '#110e2e' }}>
                  Project: {SUPABASE_PROJECT_ID}
                </h3>
                <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                  Dashboard: https://supabase.com/dashboard/project/{SUPABASE_PROJECT_ID}
                </span>
              </div>

              <a
                href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ padding: '9px 18px', fontSize: '0.8125rem' }}
              >
                <span>Open Supabase SQL Editor</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9375rem', fontWeight: 700, color: '#110e2e' }}>
                📋 Tables Managed in Supabase:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.875rem', color: '#475569', lineHeight: 1.7 }}>
                <li><code>properties</code>: Master projects with pricing, location coordinates, amenities, and floor plans.</li>
                <li><code>inquiries</code>: Customer inquiries, private tour bookings, and brochure downloads.</li>
                <li><code>locations</code>: Growth corridor statistics, price trends, and appreciation rates.</li>
                <li><code>profiles</code>: Authenticated user management and administrative permissions.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`-- SQL script available in supabase_schema.sql`);
                  setCopiedSql(true);
                  showToast('SQL schema reference copied!', 'info');
                  setTimeout(() => setCopiedSql(false), 3000);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {copiedSql ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                <span>{copiedSql ? 'Copied!' : 'Copy SQL Schema Reference'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ==================================================================== */}
      {/* ADD / EDIT PROJECT FULL MODAL                                        */}
      {/* ==================================================================== */}
      {isProjectModalOpen && (
        <div className="modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: '840px', width: '95%', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #edf0f3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 10 }}>
              <div>
                <span className="badge-category">{editingProjectId ? 'MODIFY LISTING' : 'NEW LISTING'}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, margin: '4px 0 0 0', color: '#110e2e' }}>
                  {editingProjectId ? `Edit Project: ${projectForm.name}` : 'Add New Real Estate Project'}
                </h3>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProject} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Row 1: Name & Tagline */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aira Skyline Kokapet"
                    value={projectForm.name}
                    onChange={e => setProjectForm({ ...projectForm, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ultra-Luxury High-Rise with Room to Breathe"
                    value={projectForm.tagline}
                    onChange={e => setProjectForm({ ...projectForm, tagline: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              {/* Row 2: Type, Status, Area Corridor */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Property Type
                  </label>
                  <select
                    value={projectForm.type}
                    onChange={e => setProjectForm({ ...projectForm, type: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', backgroundColor: '#ffffff' }}
                  >
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={e => setProjectForm({ ...projectForm, status: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', backgroundColor: '#ffffff' }}
                  >
                    {PROPERTY_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Micro-Market Corridor
                  </label>
                  <select
                    value={projectForm.area}
                    onChange={e => setProjectForm({ ...projectForm, area: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', backgroundColor: '#ffffff' }}
                  >
                    {HYDERABAD_AREAS.filter(a => a !== 'All areas').map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3: Pricing */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Price Display String
                  </label>
                  <input
                    type="text"
                    value={projectForm.priceDisplay}
                    onChange={e => setProjectForm({ ...projectForm, priceDisplay: e.target.value })}
                    placeholder="₹1.4 Cr - ₹2.6 Cr"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Price Min (₹)
                  </label>
                  <input
                    type="number"
                    value={projectForm.priceMin}
                    onChange={e => setProjectForm({ ...projectForm, priceMin: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Price Max (₹)
                  </label>
                  <input
                    type="number"
                    value={projectForm.priceMax}
                    onChange={e => setProjectForm({ ...projectForm, priceMax: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              {/* Row 4: Hero Image URL & Live Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Hero Image URL
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="url"
                    value={projectForm.heroImage}
                    onChange={e => setProjectForm({ ...projectForm, heroImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                  {projectForm.heroImage && (
                    <img
                      src={projectForm.heroImage}
                      alt="Preview"
                      style={{ width: '56px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                    />
                  )}
                </div>
              </div>

              {/* Dynamic Gallery Image Manager */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Gallery Images (Attach Multiple Photos)
                </label>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    type="url"
                    placeholder="Paste additional image URL (e.g. living room, pool, bedroom)..."
                    value={newGalleryImage}
                    onChange={e => setNewGalleryImage(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.8125rem' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#f15a24',
                      color: '#ffffff',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    + Add Image
                  </button>
                </div>

                {/* Gallery Thumbnails List */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {projectForm.images.map((imgUrl, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                      <img src={imgUrl} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Walkthrough URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Video Walkthrough URL (YouTube or MP4)
                </label>
                <input
                  type="url"
                  value={projectForm.videoUrl}
                  onChange={e => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=Pa6bW6Xgr6g"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Detailed Project Description
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Key Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={projectForm.highlights}
                  onChange={e => setProjectForm({ ...projectForm, highlights: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              {/* Amenities Checkbox Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  Amenities & Facilities
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
                  {AMENITY_OPTIONS.map(amenity => {
                    const isChecked = projectForm.amenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => handleToggleAmenity(amenity)}
                        style={{
                          textAlign: 'left',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          border: isChecked ? '1.5px solid #f15a24' : '1px solid #e2e8f0',
                          backgroundColor: isChecked ? '#fff7ed' : '#ffffff',
                          color: isChecked ? '#c2410c' : '#475569',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{isChecked ? '✓' : '+'}</span>
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px', position: 'sticky', bottom: 0, backgroundColor: '#ffffff', paddingTop: '16px', borderTop: '1px solid #edf0f3' }}>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  style={{ padding: '10px 22px', borderRadius: 'var(--radius-full)', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 26px', fontSize: '0.9375rem' }}
                >
                  <CheckCircle size={16} />
                  <span>{editingProjectId ? 'Update Project' : 'Save Project to Database'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
