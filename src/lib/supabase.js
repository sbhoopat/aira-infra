import { createClient } from '@supabase/supabase-js';

// Supabase Project: emdvemarpmkpogifxjyj
export const SUPABASE_PROJECT_ID = 'emdvemarpmkpogifxjyj';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZHZlbWFycG1rcG9naWZ4anlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDM3NzEsImV4cCI6MjA0MzAxOTc3MX0.sample_placeholder_key';

export const isSupabaseLive = () => {
  return Boolean(
    import.meta.env.VITE_SUPABASE_ANON_KEY && 
    import.meta.env.VITE_SUPABASE_ANON_KEY !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZHZlbWFycG1rcG9naWZ4anlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NDM3NzEsImV4cCI6MjA0MzAxOTc3MX0.sample_placeholder_key'
  );
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

/**
 * Properties API Helpers
 */
export async function getPropertiesFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('featured', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase fetch properties:', err.message);
    return { data: null, error: err };
  }
}

export async function insertPropertyToSupabase(property) {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Supabase insert property error:', err);
    return { data: null, error: err };
  }
}

export async function updatePropertyInSupabase(id, updates) {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Supabase update property error:', err);
    return { data: null, error: err };
  }
}

export async function deletePropertyFromSupabase(id) {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (err) {
    console.error('Supabase delete property error:', err);
    return { success: false, error: err };
  }
}

/**
 * Inquiries / Leads API Helpers
 */
export async function getInquiriesFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase fetch inquiries:', err.message);
    return { data: null, error: err };
  }
}

export async function insertInquiryToSupabase(inquiry) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{
        property_id: inquiry.propertyId || inquiry.property_id || null,
        property_name: inquiry.propertyName || inquiry.property_name || 'General Enquiry',
        name: inquiry.name,
        phone: inquiry.phone,
        email: inquiry.email || null,
        type: inquiry.type || 'General Enquiry',
        visit_date: inquiry.visitDate || inquiry.visit_date || null,
        visit_time: inquiry.visitTime || inquiry.visit_time || null,
        message: inquiry.message || null,
        status: inquiry.status || 'New',
        source: inquiry.source || 'Website'
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Supabase insert inquiry error:', err);
    return { data: null, error: err };
  }
}

export async function updateInquiryStatusInSupabase(id, status) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Supabase update inquiry status error:', err);
    return { data: null, error: err };
  }
}

/**
 * Profiles / User Management
 */
export async function getProfilesFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase fetch profiles:', err.message);
    return { data: null, error: err };
  }
}

export async function createAdminUserInSupabase(email, password, fullName, role = 'admin') {
  try {
    // 1. Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role
        }
      }
    });

    if (authError) throw authError;

    // 2. Insert or update the profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          role: role,
          updated_at: new Date().toISOString()
        });

      if (profileError) console.warn('Profile insert warning:', profileError.message);
    }

    return { user: authData.user, error: null };
  } catch (err) {
    console.error('Supabase create user error:', err);
    return { user: null, error: err };
  }
}
