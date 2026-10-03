-- ==============================================================================
-- AIRA INFRA REAL ESTATE - SUPABASE DATABASE SCHEMA
-- Project ID: emdvemarpmkpogifxjyj
-- Target: https://supabase.com/dashboard/project/emdvemarpmkpogifxjyj/sql
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES & USER ROLES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'staff', 'user')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Function to check if active user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on Auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin') -- default first users as admin
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    role = COALESCE(EXCLUDED.role, public.profiles.role),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 2. PROPERTIES / PROJECTS MASTER TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT,
  tagline TEXT,
  type TEXT NOT NULL,
  category TEXT DEFAULT 'APARTMENTS',
  status TEXT NOT NULL DEFAULT 'Ongoing',
  status_badge TEXT DEFAULT 'Ongoing',
  rera_approved BOOLEAN DEFAULT true,
  rera_number TEXT,
  featured BOOLEAN DEFAULT false,
  price_display TEXT NOT NULL,
  price_min BIGINT NOT NULL DEFAULT 0,
  price_max BIGINT NOT NULL DEFAULT 0,
  price_per_sqft INTEGER DEFAULT 0,
  location JSONB NOT NULL DEFAULT '{}'::jsonb,
  configurations TEXT[] DEFAULT ARRAY[]::text[],
  bhk_display TEXT,
  area_display TEXT,
  area_min INTEGER DEFAULT 0,
  area_max INTEGER DEFAULT 0,
  possession_date TEXT,
  total_units INTEGER DEFAULT 0,
  towers INTEGER DEFAULT 1,
  floors TEXT,
  land_area TEXT,
  open_space_percentage TEXT,
  developer TEXT DEFAULT 'Aira Infra Developers Ltd.',
  hero_image TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::text[],
  video_url TEXT,
  brochure_url TEXT,
  description TEXT,
  highlights TEXT[] DEFAULT ARRAY[]::text[],
  amenities TEXT[] DEFAULT ARRAY[]::text[],
  floor_plans JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  nearby_landmarks JSONB DEFAULT '[]'::jsonb,
  google_drive_url TEXT,
  lead_regist TEXT,
  cp_code TEXT,
  location_map_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 3. INQUIRIES & SALES LEADS CRM TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT,
  property_name TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  type TEXT NOT NULL DEFAULT 'General Enquiry',
  visit_date TEXT,
  visit_time TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Site Visit Scheduled', 'Deal Closed')),
  notes TEXT,
  source TEXT DEFAULT 'Website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. LOCATIONS & CORRIDORS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sub_title TEXT,
  average_price TEXT,
  growth_rate TEXT,
  active_projects INTEGER DEFAULT 0,
  description TEXT,
  image TEXT,
  tags TEXT[] DEFAULT ARRAY[]::text[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 5. TESTIMONIALS / BUYER STORIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  project TEXT,
  avatar TEXT,
  rating INTEGER DEFAULT 5,
  quote TEXT NOT NULL,
  verified_buyer BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for properties, locations, testimonials
CREATE POLICY "Public read properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Public read locations" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);

-- Anyone can submit an inquiry/lead
CREATE POLICY "Public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Authenticated Users / Admins have full access
CREATE POLICY "Admin write properties" ON public.properties FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read & manage inquiries" ON public.inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write locations" ON public.locations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 7. INITIAL SEED DATA INSERTION
-- ==============================================================================

-- Seed Locations
INSERT INTO public.locations (id, name, sub_title, average_price, growth_rate, active_projects, description, image, tags)
VALUES
('kokapet', 'Kokapet', 'The Golden Mile & Neopolis Growth Corridor', '₹8,200 / Sq. Ft.', '+18.4% YoY', 4, 'Hyderabad''s most sought-after luxury micro-market, directly connected to Financial District and ORR Exit 1.', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', ARRAY['High Appreciation', 'Near Neopolis SEZ', 'Premium High-Rises']),
('gachibowli', 'Gachibowli', 'The Tech Epicenter of South India', '₹7,800 / Sq. Ft.', '+12.1% YoY', 3, 'Surrounded by tech giants like Microsoft, Google, Amazon, top international schools, and multispecialty healthcare.', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', ARRAY['High Rental Yield', 'Ready Infrastructure', 'Walk to Work']),
('shankarpally', 'Shankarpally', 'Eco-Luxury Villa Corridor', '₹9,400 / Sq. Ft.', '+22.5% YoY', 2, 'A green sanctuary designated for low-density luxury villas and organic farm communities, just 20 mins from Financial District.', 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', ARRAY['Eco-Living', 'Bespoke Villas', 'Peaceful Greenery']),
('kondapur', 'Kondapur', 'Vibrant Hub between Hitec City & Botanical Gardens', '₹6,800 / Sq. Ft.', '+14.0% YoY', 2, 'A bustling neighborhood filled with premium dining, retail avenues, and 2 minutes from Sarath City Capital Mall.', 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80', ARRAY['Urban Lifestyle', 'Shopping Hubs', 'Metro Connectivity'])
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description, average_price = EXCLUDED.average_price, image = EXCLUDED.image;

-- Seed Initial Properties
INSERT INTO public.properties (
  id, name, tagline, type, category, status, status_badge, rera_approved, rera_number, featured,
  price_display, price_min, price_max, price_per_sqft, location, configurations, bhk_display, area_display,
  area_min, area_max, possession_date, total_units, towers, floors, land_area, open_space_percentage,
  hero_image, images, video_url, description, highlights, amenities, floor_plans, specifications, nearby_landmarks
)
VALUES
(
  'aira-skyline',
  'Aira Skyline',
  'Ultra-Luxury High-Rise Residences Overlooking Kokapet Lake',
  'Apartments',
  'APARTMENTS',
  'Ongoing',
  'Ongoing',
  true,
  'P02400004921',
  true,
  '₹1.4 Cr - ₹2.6 Cr',
  14000000,
  26000000,
  8200,
  '{"area": "Kokapet", "city": "Hyderabad", "fullAddress": "Financial District Extension, Kokapet, Hyderabad, Telangana 500075", "pincode": "500075", "coordinates": {"lat": 17.4125, "lng": 78.3276}}'::jsonb,
  ARRAY['3 BHK', '4 BHK'],
  '3 & 4 BHK',
  '1,850 - 3,200 Sq. Ft.',
  1850,
  3200,
  'December 2026',
  480,
  4,
  'G + 38 Floors',
  '6.5 Acres',
  '78%',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  ],
  'https://www.youtube.com/watch?v=Pa6bW6Xgr6g',
  'Aira Skyline is conceived as a sanctuary of elevated living, rising 38 floors above the vibrant Kokapet skyline. Designed with expansive corner balconies, floor-to-ceiling panoramic soundproof glass, and Vastu-compliant layouts, each home delivers unparalleled privacy and abundant natural breeze.',
  ARRAY[
    '50,000 Sq. Ft. Triple-Height Club Elegance',
    'Rooftop Temperature-Controlled Infinity Pool on 38th Floor',
    '100% Vastu Compliant East & West Facing Units',
    'EV Fast Charging Stations for Every Designated Parking Bay'
  ],
  ARRAY[
    'Swimming Pool', 'Clubhouse', 'Gym & Fitness Center', 'EV Charging', 'Tennis Court',
    'Badminton Court', 'Children''s Play Area', 'Jogging Track', 'Yoga & Meditation Deck',
    '24/7 Security & CCTV', 'Power Backup', 'Spa & Salon', 'Landscaped Zen Gardens'
  ],
  '[
    {"bhk": "3 BHK - Royal Suite", "superBuiltUpArea": "1,850 Sq. Ft.", "carpetArea": "1,420 Sq. Ft.", "facing": "East / North", "price": "₹1.48 Cr", "bathrooms": 3, "balconies": 2, "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"},
    {"bhk": "4 BHK - Presidential Sky Villa", "superBuiltUpArea": "3,200 Sq. Ft.", "carpetArea": "2,480 Sq. Ft.", "facing": "North-East", "price": "₹2.56 Cr", "bathrooms": 4, "balconies": 4, "image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"}
  ]'::jsonb,
  '{"structure": "RCC framed shear-wall structure.", "flooring": "Imported Italian marble in living, dining & foyer.", "doors": "8-foot engineered teakwood with biometric lock."}'::jsonb,
  '[{"category": "Offices", "name": "Financial District", "distance": "2.5 km", "time": "5 mins"}]'::jsonb
),
(
  'aira-stone-villas',
  'Aira Stone Villas',
  'Eco-Luxury Basalt Stone Villas with Private Plunge Pools',
  'Villas',
  'VILLAS',
  'Ongoing',
  'Ongoing',
  true,
  'P02400005118',
  true,
  '₹2.8 Cr - ₹4.5 Cr',
  28000000,
  45000000,
  9400,
  '{"area": "Shankarpally", "city": "Hyderabad", "fullAddress": "Green Corridor Road, Shankarpally, Hyderabad 501203", "pincode": "501203", "coordinates": {"lat": 17.4485, "lng": 78.1322}}'::jsonb,
  ARRAY['4 BHK', '5 BHK'],
  '4 & 5 BHK Villas',
  '3,400 - 5,200 Sq. Ft.',
  3400,
  5200,
  'March 2027',
  84,
  84,
  'G + 2 Floors',
  '18 Acres',
  '82%',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ],
  'https://www.youtube.com/watch?v=Pa6bW6Xgr6g',
  'Nestled in Shankarpally tranquil ecological corridor, Aira Stone Villas blends raw earth architecture with five-star luxury. Built using indigenous exposed basalt stone, expansive double-height living rooms, private swimming pools, and rooftop stargazing terraces.',
  ARRAY[
    'Individual Private Heated Plunge Pool & Sundeck',
    'Double-Height 22-Foot Living Room with Skylight',
    'Solar Integrated Smart Villa Infrastructure'
  ],
  ARRAY['Swimming Pool', 'Clubhouse', 'Gym & Fitness Center', 'Private Pool', 'EV Charging', 'Jogging Track'],
  '[]'::jsonb,
  '{"structure": "Exposed Basalt stone and RCC structure."}'::jsonb,
  '[]'::jsonb
),
(
  'aira-residences',
  'Aira Residences',
  'Boutique Lakeview Community in Hyderabad Innovation Hub',
  'Apartments',
  'APARTMENTS',
  'Ready to Move',
  'Ready to Move',
  true,
  'P02400003889',
  true,
  '₹1.1 Cr - ₹1.9 Cr',
  11000000,
  19000000,
  7800,
  '{"area": "Gachibowli", "city": "Hyderabad", "fullAddress": "ISB Road, Gachibowli, Hyderabad, Telangana 500032", "pincode": "500032", "coordinates": {"lat": 17.4399, "lng": 78.3489}}'::jsonb,
  ARRAY['2 BHK', '3 BHK'],
  '2 & 3 BHK',
  '1,350 - 2,100 Sq. Ft.',
  1350,
  2100,
  'Ready to Move',
  240,
  2,
  'G + 24 Floors',
  '3.8 Acres',
  '74%',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'],
  'https://www.youtube.com/watch?v=Pa6bW6Xgr6g',
  'Immediate possession luxury residences located 3 minutes from Wipro Circle and Microsoft campus.',
  ARRAY['Zero Wait Time - 100% Ready to Move In', 'Overlooking Khajaguda Lake'],
  ARRAY['Clubhouse', 'Gym & Fitness Center', 'Swimming Pool', '24/7 Security & CCTV'],
  '[]'::jsonb,
  '{}'::jsonb,
  '[]'::jsonb
)
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name, price_display = EXCLUDED.price_display, hero_image = EXCLUDED.hero_image, video_url = EXCLUDED.video_url;

-- Seed Sample Inquiries
INSERT INTO public.inquiries (property_id, property_name, name, phone, email, type, visit_date, visit_time, message, status)
VALUES
('aira-skyline', 'Aira Skyline', 'Vikram Malhotra', '+91 98450 12345', 'vikram.m@techcorp.com', 'Site Visit Request', '2026-10-02', '11:00 AM', 'Interested in 4 BHK Sky Villa facing lake. Please arrange cab pickup from Gachibowli.', 'Site Visit Scheduled'),
('aira-stone-villas', 'Aira Stone Villas', 'Sneha Rao', '+91 97110 54321', 'sneha.rao@gmail.com', 'Price & Floorplan Enquiry', NULL, NULL, 'Looking for 4 BHK East facing villa. Need payment schedule and loan bank approvals list.', 'New'),
('aira-residences', 'Aira Residences', 'Amitabh Sen', '+91 99201 88776', 'amitabh.sen@senenterprises.in', 'Brochure Download', NULL, NULL, 'Downloaded 3 BHK master plan brochure.', 'Contacted')
ON CONFLICT DO NOTHING;
