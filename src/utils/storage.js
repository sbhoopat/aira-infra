/**
 * LocalStorage Helpers for Persistence
 */

const STORAGE_KEYS = {
  FAVORITES: 'aira_favorites_v1',
  COMPARE: 'aira_compare_v1',
  ENQUIRIES: 'aira_enquiries_v1',
  BROCHURES: 'aira_brochure_leads_v1'
};

// Initial sample inquiries for Admin Dashboard
const DEFAULT_ENQUIRIES = [
  {
    id: "ENQ-1001",
    name: "Vikram Malhotra",
    email: "vikram.m@techcorp.com",
    phone: "+91 98450 12345",
    propertyName: "Aira Skyline",
    propertyId: "aira-skyline",
    type: "Site Visit Request",
    visitDate: "2026-10-02",
    visitTime: "11:00 AM",
    message: "Interested in 4 BHK Sky Villa facing lake. Please arrange cab pickup from Gachibowli.",
    status: "Site Visit Scheduled",
    timestamp: "2026-09-25T14:30:00.000Z"
  },
  {
    id: "ENQ-1002",
    name: "Sneha Rao",
    email: "sneha.rao@gmail.com",
    phone: "+91 97110 54321",
    propertyName: "Aira Stone Villas",
    propertyId: "aira-stone-villas",
    type: "Price & Floorplan Enquiry",
    visitDate: "",
    visitTime: "",
    message: "Looking for 4 BHK East facing villa. Need payment schedule and loan bank approvals list.",
    status: "New",
    timestamp: "2026-09-26T09:15:00.000Z"
  },
  {
    id: "ENQ-1003",
    name: "Amitabh Sen",
    email: "amitabh.sen@senenterprises.in",
    phone: "+91 99201 88776",
    propertyName: "Aira Residences",
    propertyId: "aira-residences",
    type: "Brochure Download",
    visitDate: "",
    visitTime: "",
    message: "Downloaded 3 BHK master plan brochure.",
    status: "Contacted",
    timestamp: "2026-09-26T12:45:00.000Z"
  }
];

export function getFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : ["aira-skyline"];
  } catch (e) {
    return ["aira-skyline"];
  }
}

export function saveFavorites(favIds) {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favIds));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
}

export function getCompareList() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPARE);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveCompareList(compareIds) {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareIds));
  } catch (e) {
    console.error("Failed to save compare list", e);
  }
}

export function getEnquiries() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(DEFAULT_ENQUIRIES));
      return DEFAULT_ENQUIRIES;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_ENQUIRIES;
  }
}

export function saveEnquiry(newEnquiry) {
  try {
    const existing = getEnquiries();
    const entry = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      status: "New",
      ...newEnquiry
    };
    const updated = [entry, ...existing];
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
    return entry;
  } catch (e) {
    console.error("Failed to save enquiry", e);
    return null;
  }
}

export function updateEnquiryStatus(enquiryId, newStatus) {
  try {
    const existing = getEnquiries();
    const updated = existing.map(item => item.id === enquiryId ? { ...item, status: newStatus } : item);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to update enquiry", e);
    return [];
  }
}
