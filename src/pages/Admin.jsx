import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
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
  Trash2
} from 'lucide-react';
import { formatDate } from '../utils/formatters';

export default function Admin() {
  const { enquiries, updateEnquiryStatus, showToast } = useProperty();
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredEnquiries = enquiries.filter(item => {
    if (filterType !== 'All' && item.type !== filterType) return false;
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchPhone = item.phone.toLowerCase().includes(q);
      const matchProp = (item.propertyName || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchProp) return false;
    }
    return true;
  });

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
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aira_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported successfully to CSV!', 'success');
  };

  const totalLeads = enquiries.length;
  const siteVisits = enquiries.filter(e => e.type?.includes('Visit')).length;
  const brochureLeads = enquiries.filter(e => e.type?.includes('Brochure')).length;
  const directInquiries = enquiries.filter(e => e.type?.includes('Enquiry') || e.type?.includes('Inquiry')).length;

  return (
    <div style={{ paddingTop: '36px', paddingBottom: '80px', backgroundColor: '#fbfbfa' }}>
      <div className="container">
        
        {/* Admin Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '32px',
            paddingBottom: '20px',
            borderBottom: '1px solid #edf0f3'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-category">AIRA INFRA INTERNAL CRM</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                color: '#110e2e',
                lineHeight: 1.15,
                margin: 0
              }}
            >
              Sales Leads & Site Visit Desk
            </h1>
          </div>

          <button
            onClick={exportCSV}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.875rem' }}
          >
            <Download size={16} />
            <span>Export Leads to CSV</span>
          </button>
        </div>

        {/* Top KPI Metrics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}
        >
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #edf0f3', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Inquiries</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#110e2e', marginTop: '4px' }}>
              {totalLeads}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Active in CRM</span>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #edf0f3', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Site Visits Booked</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f15a24', marginTop: '4px' }}>
              {siteVisits}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Chauffeur / Private Tours</span>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #edf0f3', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Brochure Downloads</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>
              {brochureLeads}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>High Intent Buyers</span>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '18px', border: '1px solid #edf0f3', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Direct Calls & Messages</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6', marginTop: '4px' }}>
              {directInquiries}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>WhatsApp & Portal Forms</span>
          </div>
        </div>

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
                    {/* Name & Phone */}
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

                    {/* Property */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: '#110e2e' }}>
                        {item.propertyName}
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: item.type?.includes('Visit') ? '#fff7ed' : item.type?.includes('Brochure') ? '#e0f2fe' : '#f3e8ff',
                          color: item.type?.includes('Visit') ? '#c2410c' : item.type?.includes('Brochure') ? '#0369a1' : '#7e22ce'
                        }}
                      >
                        {item.type}
                      </span>
                    </td>

                    {/* Notes / Visit Schedule */}
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

                    {/* Date */}
                    <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                      {formatDate(item.createdAt)}
                    </td>

                    {/* Status Dropdown */}
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
    </div>
  );
}
