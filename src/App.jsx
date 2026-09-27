import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import ProjectDetails from './pages/ProjectDetails';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="properties" element={<Properties />} />
              <Route path="property/:id" element={<PropertyDetails />} />
              <Route path="project/:id" element={<ProjectDetails />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="compare" element={<Compare />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="admin" element={<Admin />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PropertyProvider>
    </AuthProvider>
  );
}


