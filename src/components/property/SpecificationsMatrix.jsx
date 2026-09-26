import React from 'react';
import { Layers, Box, DoorClosed, UtensilsCrossed, Bath, Zap } from 'lucide-react';

export default function SpecificationsMatrix({ specifications }) {
  if (!specifications) return null;

  const specItems = [
    {
      title: "Structure & Framework",
      icon: <Layers size={20} color="#f15a24" />,
      content: specifications.structure || "RCC framed shear-wall structure designed for seismic zone II resistance."
    },
    {
      title: "Flooring & Cladding",
      icon: <Box size={20} color="#f15a24" />,
      content: specifications.flooring || "Imported Italian marble in living & dining. Laminated wooden flooring in Master Suite."
    },
    {
      title: "Doors & Windows",
      icon: <DoorClosed size={20} color="#f15a24" />,
      content: specifications.doors || "8-foot high teakwood frames with biometric smart locks and heavy-duty double glazed UPVC/Aluminium windows."
    },
    {
      title: "Kitchen & Utility",
      icon: <UtensilsCrossed size={20} color="#f15a24" />,
      content: specifications.kitchen || "Polished granite counter with Franke double bowl sink, piped PNG connection & water purifier provision."
    },
    {
      title: "Sanitary & CP Fittings",
      icon: <Bath size={20} color="#f15a24" />,
      content: specifications.sanitary || "Kohler / Villeroy & Boch wall-hung WC, concealed Grohe thermostatic rain showers."
    },
    {
      title: "Electrical & Smart Home",
      icon: <Zap size={20} color="#f15a24" />,
      content: specifications.electrical || "Concealed copper wiring (Polycab/Finolex) with Schneider modular switches and 100% DG backup."
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #edf0f3',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <span className="badge-category" style={{ display: 'block', marginBottom: '4px' }}>
          ENGINEERING EXCELLENCE
        </span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
          Material Specifications & Finishes
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}
      >
        {specItems.map((spec, idx) => (
          <div
            key={idx}
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: '#fbfbfa',
              border: '1px solid #edf0f3'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#fff7ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {spec.icon}
              </div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
                {spec.title}
              </h4>
            </div>
            <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.55, margin: 0 }}>
              {spec.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
