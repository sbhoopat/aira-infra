# Aira Infra — Modern Luxury Real Estate Web Application

A production-ready luxury real estate sales website built with **React 18**, **Vite**, **React Router 6**, and modern styling, recreating the **Aira Infra ("Homes built with room to breathe")** brand aesthetic from the visual design references.

---

## 🌟 Visual Design & Screenshot Fidelity

This application was engineered to match the attached reference screenshots:

1. **Brand Identity & Header**:
   - `Aira` in editorial serif navy paired with uppercase coral `INFRA`.
   - Sticky navigation with backdrop blur, saved properties heart badge counter, and instant "Schedule Visit" CTA.
2. **Hero Section**:
   - Eyebrow: `HYDERABAD · SINCE DAY ONE` in letterspaced coral.
   - Headline: `Homes built with room to breathe.` with italic coral accents.
   - Subtitle: *"Explore our apartments and villas — filter by area, walk through photos and videos, and download detailed brochures."*
   - Interactive search bar, area dropdown, status pills (`All`, `Ongoing`, `Upcoming`, `Ready to move`), and type pills (`All types`, `Apartments`, `Villas`).
   - Dynamic counter: `Showing 3 of 3 projects` with `Explore projects ↓` solid coral button.
3. **Project & Property Cards**:
   - High-resolution architectural photography with rounded corners (`border-radius: 20px`).
   - Floating status badges (`Ongoing`, `Upcoming`, `Ready to move`).
   - Category tags (`APARTMENTS`, `VILLAS`), editorial serif titles (`Aira Skyline`, `Aira Stone Villas`, `Aira Residences`), locations with map pins (`Kokapet, Hyderabad`, `Shankarpally, Hyderabad`, `Gachibowli, Hyderabad`), BHK configurations, and Indian pricing formats (`₹1.4 Cr - ₹2.6 Cr`, `₹3.2 Cr onwards`, `₹95 L - ₹1.6 Cr`).
4. **Footer**:
   - Deep midnight navy (`#110e2e`) matching Screenshot 4 with tagline *"Thoughtfully built homes across Hyderabad."*, visit locations, TG-RERA disclosures, and copyright.

---

## 🚀 Getting Started

When you are ready to run the application, execute:

```bash
# Navigate into the project folder
cd C:\Users\echsa\.gemini\antigravity-ide\scratch\aira-infra-realestate

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will start at `http://localhost:3000`.

---

## 📱 Pages & Routes

| Route | Page | Key Features |
|---|---|---|
| `/` | **Home Page** | Screenshot-accurate Hero, flagship project cards, pillars, location spotlights, amenities showcase, interactive EMI calculator, homeowner reviews, CTA. |
| `/properties` | **Properties Listing** | Multi-faceted sidebar/drawer filters (Area, BHK, Type, Budget slider, Status, Amenities, RERA), sort options, results count. |
| `/property/:id` | **Property Details** | Dynamic route for any property (`/property/aira-skyline`, `aira-stone-villas`, etc.), 4K gallery, interactive blueprint floor plans explorer, specifications matrix, commute map, construction timeline, loan EMI calculator. |
| `/project/:id` | **Project Details** | Alias to full project overview and brochure download. |
| `/compare` | **Compare Properties** | Side-by-side comparison matrix for up to 4 selected properties (price, price/sqft, BHK, carpet area, RERA number, amenities checkmarks). |
| `/contact` | **Contact & Enquiry** | Sales desk inquiry form, Kokapet & Gachibowli experience center locations, direct helplines, FAQ accordion. |
| `/favorites` | **Saved Properties** | Wishlisted properties persisted in `localStorage`. |
| `/admin` | **Admin Dashboard** | Live CRM portal to manage inquiries, scheduled site visits, and brochure leads with CSV export and status updates. |

---

## 🛠️ Technology Stack & Architecture

- **React 18.3+** with functional components and hooks
- **Vite 5+** for ultra-fast HMR and bundling
- **React Router 6** for client-side routing and URL state sync
- **Lucide React** for lightweight icons
- **CSS Design System** with custom variables, smooth transitions, and responsive typography
- **LocalStorage State Layer** with persistence for favorites, compare lists, and inquiry submissions.

---

## 📂 Project Structure

```
aira-infra-realestate/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── PropertyContext.jsx
    ├── data/
    │   ├── propertiesData.js
    │   ├── locationsData.js
    │   ├── amenitiesData.js
    │   └── testimonialsData.js
    ├── components/
    │   ├── common/
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Modal.jsx
    │   │   └── Toast.jsx
    │   ├── home/
    │   │   ├── Hero.jsx
    │   │   ├── FeaturedProjects.jsx
    │   │   ├── WhyChooseUs.jsx
    │   │   ├── LocationHighlights.jsx
    │   │   ├── AmenitiesShowcase.jsx
    │   │   ├── TestimonialsSection.jsx
    │   │   └── CTASection.jsx
    │   ├── property/
    │   │   ├── PropertyCard.jsx
    │   │   ├── PropertyGrid.jsx
    │   │   ├── PropertyFilters.jsx
    │   │   ├── PropertyGallery.jsx
    │   │   ├── FloorPlansViewer.jsx
    │   │   ├── SpecificationsMatrix.jsx
    │   │   ├── LocationMapSection.jsx
    │   │   ├── ConstructionTimeline.jsx
    │   │   ├── BuilderProfile.jsx
    │   │   └── StickyPropertyActionBar.jsx
    │   ├── calculator/
    │   │   └── EMICalculator.jsx
    │   └── modals/
    │       ├── ScheduleVisitModal.jsx
    │       ├── BrochureModal.jsx
    │       ├── EnquireModal.jsx
    │       ├── ImageLightboxModal.jsx
    │       └── CompareDrawer.jsx
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── PropertiesPage.jsx
    │   ├── PropertyDetailsPage.jsx
    │   ├── ComparePage.jsx
    │   ├── ContactPage.jsx
    │   ├── FavoritesPage.jsx
    │   └── AdminDashboardPage.jsx
    └── utils/
        ├── formatters.js
        └── storage.js
```
