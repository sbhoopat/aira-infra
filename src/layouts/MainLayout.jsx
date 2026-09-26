import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Toast from '../components/common/Toast';
import ScheduleVisitModal from '../components/modals/ScheduleVisitModal';
import BrochureModal from '../components/modals/BrochureModal';
import EnquireModal from '../components/modals/EnquireModal';
import ImageLightboxModal from '../components/modals/ImageLightboxModal';
import CompareDrawer from '../components/modals/CompareDrawer';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sticky Header */}
      <Header />

      {/* Dynamic Page Content */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

      {/* Global Modals & Notifications */}
      <ScheduleVisitModal />
      <BrochureModal />
      <EnquireModal />
      <ImageLightboxModal />
      <CompareDrawer />
      <Toast />

      {/* Deep Navy Midnight Footer */}
      <Footer />
    </div>
  );
}
