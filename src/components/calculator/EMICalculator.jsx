import React, { useState } from 'react';
import { Calculator, IndianRupee, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { calculateEMI, formatIndianCurrency, formatIndianNumber } from '../../utils/formatters';
import { useProperty } from '../../context/PropertyContext';

export default function EMICalculator({ initialPrice = 14000000, propertyTitle = null }) {
  const { openModal } = useProperty();
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const loanAmount = propertyPrice - downPaymentAmount;

  const { monthlyEMI, totalInterest, totalPayment } = calculateEMI(
    loanAmount,
    interestRate,
    tenureYears
  );

  const principalPercent = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #edf0f3',
        boxShadow: 'var(--shadow-md)',
        padding: '36px',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <span className="badge-category" style={{ display: 'block', marginBottom: '4px' }}>
            HOME LOAN ASSISTANCE
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: '#110e2e',
              margin: 0
            }}
          >
            {propertyTitle ? `EMI Estimator for ${propertyTitle}` : "Interactive EMI Calculator"}
          </h3>
        </div>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#fff7ed',
            color: '#f15a24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Calculator size={24} />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px'
        }}
      >
        {/* Left Inputs Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Property Value Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                Property Value
              </label>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f15a24' }}>
                {formatIndianCurrency(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min="3000000"
              max="50000000"
              step="500000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f15a24' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
              <span>₹30 Lakhs</span>
              <span>₹5 Crores</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                Down Payment ({downPaymentPercent}%)
              </label>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#110e2e' }}>
                {formatIndianCurrency(downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f15a24' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
              <span>10% (Min)</span>
              <span>60%</span>
            </div>
          </div>

          {/* Interest Rate & Tenure in 2 cols */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
                  Interest Rate (% p.a.)
                </label>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#110e2e' }}>
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="7.0"
                max="12.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f15a24' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
                  Tenure (Years)
                </label>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#110e2e' }}>
                  {tenureYears} Yrs
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f15a24' }}
              />
            </div>
          </div>

        </div>

        {/* Right Output Results Box */}
        <div
          style={{
            backgroundColor: '#110e2e',
            borderRadius: '18px',
            padding: '28px',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fed7aa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              MONTHLY ESTIMATED EMI
            </span>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '8px 0 20px',
                lineHeight: 1
              }}
            >
              ₹{formatIndianNumber(monthlyEMI)}{' '}
              <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-sans)', color: '#9490b8', fontWeight: 500 }}>
                / month
              </span>
            </div>

            {/* Breakdown bars */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#332d66', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${principalPercent}%`, backgroundColor: '#f15a24' }} title={`Principal: ${principalPercent}%`} />
                <div style={{ width: `${interestPercent}%`, backgroundColor: '#fed7aa' }} title={`Interest: ${interestPercent}%`} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '6px', color: '#9490b8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f15a24' }} />
                  Principal ({principalPercent}%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fed7aa' }} />
                  Total Interest ({interestPercent}%)
                </span>
              </div>
            </div>

            {/* Breakdown table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9490b8' }}>Loan Amount:</span>
                <strong style={{ color: '#ffffff' }}>{formatIndianCurrency(loanAmount)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9490b8' }}>Total Interest Payable:</span>
                <strong style={{ color: '#ffffff' }}>{formatIndianCurrency(totalInterest)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9490b8' }}>Total Amount (P + I):</span>
                <strong style={{ color: '#fed7aa' }}>{formatIndianCurrency(totalPayment)}</strong>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button
              onClick={() => openModal('enquire', null, { type: 'Loan Pre-Approval' })}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px'
              }}
            >
              <ShieldCheck size={18} />
              <span>Apply for Bank Loan Pre-Approval</span>
            </button>
            <p style={{ fontSize: '0.72rem', color: '#9490b8', textAlign: 'center', marginTop: '8px', margin: '8px 0 0' }}>
              Pre-approved by SBI, HDFC Bank, ICICI Bank & Axis Bank with special 0% processing fee.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
