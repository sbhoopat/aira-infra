import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseLive, createAdminUserInSupabase } from '../lib/supabase';
import { loginToBackend, logoutFromBackend } from '../lib/api';

const AuthContext = createContext();

const ADMIN_STORAGE_KEY = 'aira_admin_session_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth from Backend
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const localAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
        const accessToken = localStorage.getItem('aira_access_token');
        
        if (localAdmin && mounted) {
          // If we have localAdmin but no backend token, force them to login again
          if (!accessToken) {
            localStorage.removeItem(ADMIN_STORAGE_KEY);
            setUser(null);
            setProfile(null);
          } else {
            const parsed = JSON.parse(localAdmin);
            setUser(parsed.user);
            setProfile(parsed.profile);
          }
        }
      } catch (err) {
        console.warn('Auth init check:', err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // Fetch Profile from Supabase
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Profile fetch warning:', error.message);
      }

      if (data) {
        setProfile(data);
      } else {
        // Fallback default admin profile
        setProfile({
          id: userId,
          email: user?.email || 'admin@airainfra.com',
          full_name: 'Aira Infra Administrator',
          role: 'admin'
        });
      }
    } catch (e) {
      console.warn('Profile lookup:', e);
    }
  };

  // Sign In with Email & Password
  const login = async (email, password) => {
    try {
      setLoading(true);

      // Attempt Backend API login First
      let backendUser = null;
      try {
        const apiData = await loginToBackend(email, password);
        if (apiData && apiData.access_token) {
          backendUser = apiData.user;
        }
      } catch (backendErr) {
        console.warn('Backend login failed', backendErr);
      }

      // If credentials match standard Aira Admin demo or backend succeeds
      if (
        backendUser ||
        ((email.toLowerCase() === 'admin@airainfra.com' || email.toLowerCase() === 'admin@aira.com') &&
        (password === 'admin123' || password === 'AiraInfra2026!'))
      ) {
        const fallbackUser = backendUser || {
          id: 'admin-local-master',
          email: email,
          user_metadata: { full_name: 'Aira Infra Administrator', role: 'admin' }
        };
        const fallbackProfile = backendUser || {
          id: 'admin-local-master',
          email: email,
          full_name: 'Aira Infra Administrator',
          role: 'admin'
        };

        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({
          user: fallbackUser,
          profile: fallbackProfile
        }));

        setUser(fallbackUser);
        setProfile(fallbackProfile);
        return { success: true, user: fallbackUser, error: null };
      }

      return {
        success: false,
        error: new Error('Invalid email or password. Please check your credentials.')
      };
    } catch (err) {
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      logoutFromBackend();
      setUser(null);
      setSession(null);
      setProfile(null);
      return { success: true };
    } catch (err) {
      setUser(null);
      setSession(null);
      setProfile(null);
      return { success: true };
    }
  };

  // Create New User (Admins only)
  const createNewUser = async (email, password, fullName, role = 'admin') => {
    try {
      const res = await createAdminUserInSupabase(email, password, fullName, role);
      return res;
    } catch (err) {
      return { user: null, error: err };
    }
  };

  const isAdmin = Boolean(
    user && (profile?.role === 'admin' || user.user_metadata?.role === 'admin' || user.email?.includes('admin'))
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isAdmin,
        loading,
        login,
        logout,
        createNewUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
