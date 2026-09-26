import React, { useRef } from 'react';
import Hero from '../components/home/Hero';
import FeaturedProjects from '../components/home/FeaturedProjects';
import LocationHighlights from '../components/home/LocationHighlights';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import EmiCalculator from '../components/property/EmiCalculator';

export default function Home() {
  const projectsSectionRef = useRef(null);

  const handleExploreClick = () => {
    if (projectsSectionRef.current) {
      projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section matching Screenshot 1 */}
      <Hero onExploreClick={handleExploreClick} />

      {/* Featured Projects Grid matching Screenshot 2 & 3 */}
      <FeaturedProjects sectionRef={projectsSectionRef} />

      {/* High Growth Hyderabad Residential Corridors */}
      <LocationHighlights />

      {/* Why Choose Aira Infra Engineering & Standards */}
      <WhyChooseUs />

      {/* Interactive Home Loan / EMI Estimator Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 16px' }}>
            <span className="badge-category" style={{ display: 'block', marginBottom: '6px' }}>
              FINANCIAL PLANNING
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)', fontWeight: 700, color: '#110e2e' }}>
              Transparent Investment Planning
            </h2>
          </div>
          <EmiCalculator defaultPrice={14000000} />
        </div>
      </section>

      {/* Homeowner Stories / Testimonials */}
      <Testimonials />

      {/* Final Call to Action Banner */}
      <CallToAction />
    </div>
  );
}
