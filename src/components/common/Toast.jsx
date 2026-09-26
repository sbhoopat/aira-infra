import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';

export default function Toast() {
  const { toast } = useProperty();

  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle size={20} color="#ef4444" />;
      case 'info':
        return <Info size={20} color="#3b82f6" />;
      default:
        return <CheckCircle2 size={20} color="#10b981" />;
    }
  };

  const getBgColor = () => {
    switch (toast.type) {
      case 'error':
        return '#fef2f2';
      case 'info':
        return '#eff6ff';
      default:
        return '#f0fdf4';
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'error':
        return '#fecaca';
      case 'info':
        return '#bfdbfe';
      default:
        return '#bbf7d0';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: getBgColor(),
        border: `1px solid ${getBorderColor()}`,
        padding: '14px 20px',
        borderRadius: '14px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
        maxWidth: '420px',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ flexShrink: 0 }}>{getIcon()}</div>
      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', margin: 0 }}>
        {toast.message}
      </p>
    </div>
  );
}
