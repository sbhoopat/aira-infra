import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPERTIES_DATA } from '../data/propertiesData';
import {
  getFavorites,
  saveFavorites,
  getCompareList,
  saveCompareList,
  getEnquiries,
  saveEnquiry,
  updateEnquiryStatus
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
  const [properties, setProperties] = useState(PROPERTIES_DATA);
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [compareList, setCompareList] = useState(() => getCompareList());
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [enquiries, setEnquiries] = useState(() => getEnquiries());

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

  const handleEnquirySubmit = (enquiryData) => {
    const saved = saveEnquiry(enquiryData);
    if (saved) {
      setEnquiries(getEnquiries());
      showToast('Thank you! Your request has been received. Our sales advisor will contact you within 15 minutes.', 'success');
      return true;
    }
    return false;
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = updateEnquiryStatus(id, newStatus);
    setEnquiries(updated);
    showToast(`Lead status updated to ${newStatus}`, 'info');
  };

  // Filtered Properties Computation
  const filteredProperties = properties.filter(prop => {
    // Search Query (name, area, developer, tags)
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = prop.name.toLowerCase().includes(q);
      const matchArea = prop.location.area.toLowerCase().includes(q);
      const matchCity = prop.location.city.toLowerCase().includes(q);
      const matchType = prop.type.toLowerCase().includes(q);
      if (!matchName && !matchArea && !matchCity && !matchType) return false;
    }

    // Area filter
    if (filters.area && filters.area !== 'All areas') {
      if (prop.location.area.toLowerCase() !== filters.area.toLowerCase()) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status !== 'All') {
      if (prop.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
    }

    // Type filter
    if (filters.type && filters.type !== 'All types') {
      if (prop.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
    }

    // BHK filter (array of selected BHKs)
    if (filters.bhk && filters.bhk.length > 0) {
      const hasBHK = filters.bhk.some(selectedBhk => 
        prop.configurations.some(c => c.includes(selectedBhk.replace(' BHK', '')))
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
        prop.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.priceMin - b.priceMin;
    if (filters.sortBy === 'price-desc') return b.priceMin - a.priceMin;
    if (filters.sortBy === 'area-asc') return a.areaMin - b.areaMin;
    if (filters.sortBy === 'area-desc') return b.areaMin - a.areaMin;
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
        updateEnquiryStatus: handleUpdateStatus
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
