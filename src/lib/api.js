const API_BASE = import.meta.env.PROD ? 'https://aira-infra-backend.vercel.app/api' : 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('aira_access_token');

export async function fetchApi(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'API Request failed');
  }
  return data;
}

// ----------------------------------------------------
// AUTH API
// ----------------------------------------------------
export async function loginToBackend(email, password) {
  const data = await fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (data.access_token) {
    localStorage.setItem('aira_access_token', data.access_token);
  }
  return data;
}

export function logoutFromBackend() {
  localStorage.removeItem('aira_access_token');
}

// ----------------------------------------------------
// INQUIRIES API
// ----------------------------------------------------
export async function getInquiriesFromBackend() {
  try {
    const data = await fetchApi('/inquiries');
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function insertInquiryToBackend(inquiry) {
  try {
    const payload = {
      property_id: inquiry.propertyId || inquiry.property_id || null,
      property_name: inquiry.propertyName || inquiry.property_name || 'General Enquiry',
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email || null,
      type: inquiry.type || 'General Enquiry',
      visit_date: inquiry.visitDate || inquiry.visit_date || null,
      visit_time: inquiry.visitTime || inquiry.visit_time || null,
      message: inquiry.message || null,
      source: inquiry.source || 'Website'
    };
    const data = await fetchApi('/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return { data: data.inquiry, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateInquiryStatusInBackend(id, status) {
  try {
    const data = await fetchApi(`/inquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// ----------------------------------------------------
// PROPERTIES API
// ----------------------------------------------------
export async function getPropertiesFromBackend() {
  try {
    const data = await fetchApi('/properties');
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function insertPropertyToBackend(property) {
  try {
    const data = await fetchApi('/properties', {
      method: 'POST',
      body: JSON.stringify(property)
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updatePropertyInBackend(id, updates) {
  try {
    const data = await fetchApi(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deletePropertyFromBackend(id) {
  try {
    const data = await fetchApi(`/properties/${id}`, {
      method: 'DELETE'
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
}
