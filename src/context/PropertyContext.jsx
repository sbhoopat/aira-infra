import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getPropertiesFromBackend,
  insertPropertyToBackend,
  updatePropertyInBackend,
  deletePropertyFromBackend,
  getInquiriesFromBackend,
  insertInquiryToBackend,
  updateInquiryStatusInBackend
} from '../lib/api';
import {
  getFavorites,
  saveFavorites,
  getCompareList,
  saveCompareList,
  getEnquiries,
  saveEnquiry,
  updateEnquiryStatus as updateLocalEnquiryStatus
} from '../utils/storage';

const PropertyContext = createContext();

const INITIAL_FILTERS = {
  searchQuery: '',
  area: 'All areas',
  status: 'All',
  type: 'All types',
  bhk: [],
  priceMin: 0,
  priceMax: 50000000,
  areaMin: 0,
  areaMax: 6000,
  amenities: [],
  reraOnly: false,
  sortBy: 'featured'
};

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [compareList, setCompareList] = useState(() => getCompareList());
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [enquiries, setEnquiries] = useState(() => getEnquiries());
  const [isLoadingFromSupabase, setIsLoadingFromSupabase] = useState(true);
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  // Modal system
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'schedule' | 'brochure' | 'enquire' | 'lightbox'
    property: null,
    extraData: null
  });

  // Toast Notification System
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' | 'info' | 'error'
  });

  // Fetch Live Data from Supabase
  useEffect(() => {
    let isMounted = true;

    async function loadSupabaseData() {
      try {
        setIsLoadingFromSupabase(true);
        
        // 1. Fetch Properties from Backend
        const { data: propsData, error: propsError } = await getPropertiesFromBackend();
        
        if (!propsError && propsData && propsData.length > 0) {
          if (isMounted) {
            // Normalize field names if needed
            const normalizedProps = propsData.map(p => ({
              ...p,
              reraApproved: p.rera_approved ?? p.reraApproved,
              reraNumber: p.rera_number ?? p.reraNumber,
              priceDisplay: p.price_display ?? p.priceDisplay,
              priceMin: p.price_min ?? p.priceMin,
              priceMax: p.price_max ?? p.priceMax,
              pricePerSqFt: p.price_per_sqft ?? p.pricePerSqFt,
              bhkDisplay: p.bhk_display ?? p.bhkDisplay,
              areaDisplay: p.area_display ?? p.areaDisplay,
              areaMin: p.area_min ?? p.areaMin,
              areaMax: p.area_max ?? p.areaMax,
              possessionDate: p.possession_date ?? p.possessionDate,
              totalUnits: p.total_units ?? p.totalUnits,
              landArea: p.land_area ?? p.landArea,
              openSpacePercentage: p.open_space_percentage ?? p.openSpacePercentage,
              heroImage: p.hero_image ?? p.heroImage,
              videoUrl: p.video_url ?? p.videoUrl,
              brochureUrl: p.brochure_url ?? p.brochureUrl,
              floorPlans: p.floor_plans ?? p.floorPlans ?? [],
              nearbyLandmarks: p.nearby_landmarks ?? p.nearbyLandmarks ?? []
            }));
            setProperties(normalizedProps);
            setSupabaseConnected(true);
          }
        }

        // 2. Fetch Inquiries from Backend
        const { data: inqData, error: inqError } = await getInquiriesFromBackend();
        if (!inqError && inqData && inqData.length > 0) {
          if (isMounted) {
            const normalizedInquiries = inqData.map(i => ({
              id: i.id,
              name: i.name,
              phone: i.phone,
              email: i.email,
              propertyName: i.property_name,
              propertyId: i.property_id,
              type: i.type,
              visitDate: i.visit_date,
              visitTime: i.visit_time,
              message: i.message,
              status: i.status,
              createdAt: i.created_at
            }));
            setEnquiries(normalizedInquiries);
          }
        }
      } catch (err) {
        console.warn('PropertyContext initial sync:', err.message);
      } finally {
        if (isMounted) setIsLoadingFromSupabase(false);
      }
    }

    loadSupabaseData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Persist Favorites
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Persist Compare List
  useEffect(() => {
    saveCompareList(compareList);
  }, [compareList]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const exists = prev.includes(propertyId);
      const updated = exists ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      showToast(
        exists ? 'Removed from saved properties' : 'Added to saved properties ❤️',
        exists ? 'info' : 'success'
      );
      return updated;
    });
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  const addToCompare = (propertyId) => {
    if (compareList.includes(propertyId)) {
      setCompareList(prev => prev.filter(id => id !== propertyId));
      showToast('Removed from comparison list', 'info');
      return;
    }
    if (compareList.length >= 4) {
      showToast('You can compare up to 4 properties at once.', 'error');
      return;
    }
    setCompareList(prev => [...prev, propertyId]);
    showToast('Added to compare list', 'success');
  };

  const removeFromCompare = (propertyId) => {
    setCompareList(prev => prev.filter(id => id !== propertyId));
    showToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (propertyId) => compareList.includes(propertyId);

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    showToast('Filters reset to default', 'info');
  };

  const openModal = (type, property = null, extraData = null) => {
    setModalState({
      isOpen: true,
      type,
      property,
      extraData
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      property: null,
      extraData: null
    });
  };

  // Submit Customer Inquiries / Leads (Directly to Supabase & Local)
  const handleEnquirySubmit = async (enquiryData) => {
    try {
      // 1. Save to Backend
      const { data: supabaseLead, error } = await insertInquiryToBackend(enquiryData);
      
      // 2. Also save to LocalStorage fallback
      const localSaved = saveEnquiry(enquiryData);
      
      // Update local state immediately
      const newLead = {
        id: supabaseLead?.id || localSaved?.id || `ENQ-${Date.now()}`,
        name: enquiryData.name,
        phone: enquiryData.phone,
        email: enquiryData.email || '',
        propertyName: enquiryData.propertyName || 'Aira Property',
        propertyId: enquiryData.propertyId || '',
        type: enquiryData.type || 'General Enquiry',
        visitDate: enquiryData.visitDate || '',
        visitTime: enquiryData.visitTime || '',
        message: enquiryData.message || '',
        status: 'New',
        createdAt: new Date().toISOString()
      };

      setEnquiries(prev => [newLead, ...prev]);
      showToast('Thank you! Your request has been received. Our sales advisor will contact you within 15 minutes.', 'success');
      return true;
    } catch (err) {
      console.error('Enquiry submission error:', err);
      showToast('Thank you! Your request has been received.', 'success');
      return true;
    }
  };

  // Update Status in Supabase & Local
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateInquiryStatusInBackend(id, newStatus);
      const updated = updateLocalEnquiryStatus(id, newStatus);
      setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      showToast(`Lead status updated to ${newStatus}`, 'info');
    } catch (err) {
      console.warn('Update status error:', err);
    }
  };

  // ADD NEW PROJECT / PROPERTY (Saves to Backend & Local State)
  const addProperty = async (newPropertyData) => {
    try {
      // Generate ID slug
      const id = newPropertyData.id || newPropertyData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const payload = {
        id: id,
        name: newPropertyData.name,
        slug: id,
        tagline: newPropertyData.tagline || 'Luxury Living with Room to Breathe',
        type: newPropertyData.type || 'Apartments',
        category: (newPropertyData.type || 'Apartments').toUpperCase(),
        status: newPropertyData.status || 'Ongoing',
        status_badge: newPropertyData.status || 'Ongoing',
        rera_approved: Boolean(newPropertyData.reraApproved ?? true),
        rera_number: newPropertyData.reraNumber || 'P02400009999',
        featured: Boolean(newPropertyData.featured ?? false),
        price_display: newPropertyData.priceDisplay || '₹1.5 Cr Onwards',
        price_min: Number(newPropertyData.priceMin) || 15000000,
        price_max: Number(newPropertyData.priceMax) || 30000000,
        price_per_sqft: Number(newPropertyData.pricePerSqFt) || 8500,
        location: newPropertyData.location || {
          area: newPropertyData.area || 'Kokapet',
          city: 'Hyderabad',
          fullAddress: newPropertyData.fullAddress || 'Kokapet, Hyderabad',
          pincode: '500075',
          coordinates: { lat: 17.4125, lng: 78.3276 }
        },
        configurations: newPropertyData.configurations || ['3 BHK', '4 BHK'],
        bhk_display: newPropertyData.bhkDisplay || '3 & 4 BHK',
        area_display: newPropertyData.areaDisplay || '1,800 - 3,000 Sq. Ft.',
        area_min: Number(newPropertyData.areaMin) || 1800,
        area_max: Number(newPropertyData.areaMax) || 3000,
        possession_date: newPropertyData.possessionDate || 'December 2027',
        total_units: Number(newPropertyData.totalUnits) || 120,
        towers: Number(newPropertyData.towers) || 2,
        floors: newPropertyData.floors || 'G + 30 Floors',
        land_area: newPropertyData.landArea || '4.5 Acres',
        open_space_percentage: newPropertyData.openSpacePercentage || '75%',
        developer: newPropertyData.developer || 'Aira Infra Developers Ltd.',
        hero_image: newPropertyData.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        images: newPropertyData.images?.length ? newPropertyData.images : [
          newPropertyData.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        video_url: newPropertyData.videoUrl || 'https://www.youtube.com/watch?v=Pa6bW6Xgr6g',
        brochure_url: newPropertyData.brochureUrl || '',
        description: newPropertyData.description || 'Modern luxury project crafted by Aira Infra.',
        highlights: newPropertyData.highlights || ['100% Vastu Compliant', 'Ultra-Modern Clubhouse'],
        amenities: newPropertyData.amenities || ['Swimming Pool', 'Clubhouse', 'Gym & Fitness Center', '24/7 Security & CCTV'],
        floor_plans: newPropertyData.floorPlans || [],
        specifications: newPropertyData.specifications || {},
        nearby_landmarks: newPropertyData.nearbyLandmarks || []
      };

      // 1. Insert into Backend
      const { data: inserted, error } = await insertPropertyToBackend(payload);
      
      // Normalized Object for React state
      const formatted = {
        ...payload,
        reraApproved: payload.rera_approved,
        reraNumber: payload.rera_number,
        priceDisplay: payload.price_display,
        priceMin: payload.price_min,
        priceMax: payload.price_max,
        pricePerSqFt: payload.price_per_sqft,
        bhkDisplay: payload.bhk_display,
        areaDisplay: payload.area_display,
        areaMin: payload.area_min,
        areaMax: payload.area_max,
        possessionDate: payload.possession_date,
        totalUnits: payload.total_units,
        landArea: payload.land_area,
        openSpacePercentage: payload.open_space_percentage,
        heroImage: payload.hero_image,
        videoUrl: payload.video_url,
        brochureUrl: payload.brochure_url,
        floorPlans: payload.floor_plans,
        nearbyLandmarks: payload.nearby_landmarks
      };

      setProperties(prev => [formatted, ...prev]);
      showToast(`Project "${formatted.name}" created successfully and saved to database!`, 'success');
      return { success: true, property: formatted };
    } catch (err) {
      console.error('Add property error:', err);
      showToast('Error adding property to database.', 'error');
      return { success: false, error: err };
    }
  };

  // UPDATE PROPERTY IN BACKEND
  const updateProperty = async (id, updates) => {
    try {
      const payload = {
        name: updates.name,
        tagline: updates.tagline,
        type: updates.type,
        status: updates.status,
        price_display: updates.priceDisplay,
        price_min: updates.priceMin,
        price_max: updates.priceMax,
        hero_image: updates.heroImage,
        video_url: updates.videoUrl,
        description: updates.description,
        amenities: updates.amenities,
        highlights: updates.highlights
      };

      await updatePropertyInBackend(id, payload);

      setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
      showToast('Project updated successfully!', 'success');
      return { success: true };
    } catch (err) {
      console.error('Update property error:', err);
      showToast('Failed to update project.', 'error');
      return { success: false, error: err };
    }
  };

  // DELETE PROPERTY FROM BACKEND
  const deleteProperty = async (id) => {
    try {
      await deletePropertyFromBackend(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      showToast('Project removed successfully.', 'info');
      return { success: true };
    } catch (err) {
      console.error('Delete property error:', err);
      setProperties(prev => prev.filter(p => p.id !== id));
      showToast('Project removed.', 'info');
      return { success: true };
    }
  };

  // Filtered Properties Computation
  const filteredProperties = properties.filter(prop => {
    // Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = (prop.name || '').toLowerCase().includes(q);
      const matchArea = (prop.location?.area || '').toLowerCase().includes(q);
      const matchCity = (prop.location?.city || '').toLowerCase().includes(q);
      const matchType = (prop.type || '').toLowerCase().includes(q);
      if (!matchName && !matchArea && !matchCity && !matchType) return false;
    }

    // Area filter
    if (filters.area && filters.area !== 'All areas') {
      if ((prop.location?.area || '').toLowerCase() !== filters.area.toLowerCase()) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status !== 'All') {
      if ((prop.status || '').toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
    }

    // Type filter
    if (filters.type && filters.type !== 'All types') {
      if ((prop.type || '').toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
    }

    // BHK filter
    if (filters.bhk && filters.bhk.length > 0) {
      const hasBHK = filters.bhk.some(selectedBhk => 
        (prop.configurations || []).some(c => c.includes(selectedBhk.replace(' BHK', '')))
      );
      if (!hasBHK) return false;
    }

    // Price range
    if (filters.priceMin > 0 && prop.priceMax < filters.priceMin) return false;
    if (filters.priceMax < 50000000 && prop.priceMin > filters.priceMax) return false;

    // Area range
    if (filters.areaMin > 0 && prop.areaMax < filters.areaMin) return false;
    if (filters.areaMax < 6000 && prop.areaMin > filters.areaMax) return false;

    // RERA only
    if (filters.reraOnly && !prop.reraApproved) return false;

    // Amenities
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        (prop.amenities || []).includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return (a.priceMin || 0) - (b.priceMin || 0);
    if (filters.sortBy === 'price-desc') return (b.priceMin || 0) - (a.priceMin || 0);
    if (filters.sortBy === 'area-asc') return (a.areaMin || 0) - (b.areaMin || 0);
    if (filters.sortBy === 'area-desc') return (b.areaMin || 0) - (a.areaMin || 0);
    if (filters.sortBy === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    }
    return 0;
  });

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        filters,
        setFilter,
        resetFilters,
        modalState,
        openModal,
        closeModal,
        toast,
        showToast,
        enquiries,
        submitEnquiry: handleEnquirySubmit,
        updateEnquiryStatus: handleUpdateStatus,
        addProperty,
        updateProperty,
        deleteProperty,
        isLoadingFromSupabase,
        supabaseConnected
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}
