/**
 * Aira Infra Unified API Client
 * Connects to Python FastAPI Backend (https://aira-infra-backend.vercel.app) with seamless Supabase fallback.
 */

import { supabase, insertPropertyToSupabase, updatePropertyInSupabase, deletePropertyFromSupabase } from '../lib/supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://aira-infra-backend.vercel.app/api';

function getAuthHeaders() {
  const token = localStorage.getItem('aira_jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const apiClient = {
  // --------------------------------------------------------------------------
  // AUTHENTICATION
  // --------------------------------------------------------------------------
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('aira_jwt_token', data.access_token);
        }
        return { success: true, user: data.user, error: null };
      }
    } catch (e) {
      console.info('Python backend offline, using Supabase auth fallback');
    }

    // Supabase Auth Direct Fallback
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data?.user) {
      return { success: true, user: data.user, error: null };
    }
    return { success: false, error: error || new Error('Login failed') };
  },

  async createUser(email, password, fullName, role = 'admin') {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/create-user`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ email, password, full_name: fullName, role })
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, user: data, error: null };
      }
    } catch (e) {
      console.info('Using Supabase client fallback for create user');
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } }
    });
    return { success: !authError, user: authData?.user, error: authError };
  },

  // --------------------------------------------------------------------------
  // PROPERTIES CRUD
  // --------------------------------------------------------------------------
  async getProperties(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/properties${query ? `?${query}` : ''}`);
      if (response.ok) {
        const data = await response.json();
        return { data, error: null };
      }
    } catch (e) {
      // fallback
    }

    const { data, error } = await supabase.from('properties').select('*');
    return { data, error };
  },

  async getProperty(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      if (response.ok) {
        const data = await response.json();
        return { data, error: null };
      }
    } catch (e) {
      // fallback
    }

    const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
    return { data, error };
  },

  async createProperty(propertyData) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData)
      });

      if (response.ok) {
        const data = await response.json();
        return { data, error: null };
      }
    } catch (e) {
      console.info('Using direct Supabase insert fallback');
    }

    return await insertPropertyToSupabase(propertyData);
  },

  async updateProperty(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        return { data, error: null };
      }
    } catch (e) {
      console.info('Using direct Supabase update fallback');
    }

    return await updatePropertyInSupabase(id, updates);
  },

  async deleteProperty(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        return { success: true, error: null };
      }
    } catch (e) {
      console.info('Using direct Supabase delete fallback');
    }

    return await deletePropertyFromSupabase(id);
  },

  // --------------------------------------------------------------------------
  // INQUIRIES & LEADS
  // --------------------------------------------------------------------------
  async getInquiries() {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        return { data, error: null };
      }
    } catch (e) {
      // fallback
    }

    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    return { data, error };
  },

  async submitInquiry(inquiryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });

      if (response.ok) {
        const data = await response.json();
        return { data: data.inquiry, error: null };
      }
    } catch (e) {
      console.info('Using direct Supabase inquiry insert fallback');
    }

    return await supabase.from('inquiries').insert([inquiryData]).select().single();
  },

  async updateInquiryStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        return { success: true, error: null };
      }
    } catch (e) {
      console.info('Using direct Supabase status update fallback');
    }

    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    return { success: !error, error };
  }
};
