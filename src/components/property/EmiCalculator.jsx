import React, { useState, useMemo } from 'react';
import { Calculator, IndianRupee, PieChart, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import { useProperty } from '../../context/PropertyContext';

export default function EmiCalculator({ defaultPrice = 14000000, propertyName = null, property = null }) {
  const { openModal } = useProperty();

  const [price, setPrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Sync if defaultPrice changes
  React.useEffect(() => {
    if (defaultPrice) {
      setPrice(defaultPrice);
    }
  }, [defaultPrice]);

  const downPaymentAmount = useMemo(() => {
    return Math.round((price * downPaymentPercent) / 100);
  }, [price, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return price - downPaymentAmount;
  }, [price, downPaymentAmount]);

  const calculations = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / (12 * 100); // monthly interest
    const n = tenureYears * 12; // total months

    if (P <= 0 || r <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalPayment: 0, totalInterest: 0, principalPercent: 50, interestPercent: 50 };
    }

    // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    const principalPercent = Math.round((P / totalPayment) * 100);
    const interestPercent = 100 - principalPercent;

    return {
      monthlyEmi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principalPercent,
      interestPercent
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <div
      id="emi-calculator"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #edf0f3',
        boxShadow: 'var(--shadow-md)',
        padding: 'clamp(20px, 4vw, 36px)',
        margin: '32px 0'
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#fff7ed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f15a24'
            }}
          >
            <Calculator size={24} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#110e2e', margin: 0 }}>
              Home Loan & EMI Estimator
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
              {propertyName ? `Calculate instant monthly outflows for ${propertyName}` : 'Tailor loan tenures, interest rates, and down payments'}
            </p>
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={14} />
          <span>Tie-ups with SBI, HDFC, ICICI & Axis</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}
      >
        {/* Left Inputs Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Property Price */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Property Valuation</label>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#110e2e' }}>{formatCurrencyINR(price)}</span>
            </div>
            <input
              type="range"
              min="5000000"
              max="50000000"
              step="500000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f15a24' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>₹50 Lakhs</span>
              <span>₹2.5 Cr</span>
              <span>₹5.0 Cr</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                Down Payment ({downPaymentPercent}%)
              </label>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#f15a24' }}>
                {formatCurrencyINR(downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f15a24' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>10% (Min)</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Interest Rate (% p.a.)</label>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#110e2e' }}>{interestRate.toFixed(1)} %</span>
            </div>
            <input
              type="range"
              min="7.5"
              max="12.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f15a24' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>7.5%</span>
              <span>9.5%</span>
              <span>12.0%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Loan Tenure</label>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#110e2e' }}>{tenureYears} Years</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[10, 15, 20, 25, 30].map(years => (
                <button
                  key={years}
                  onClick={() => setTenureYears(years)}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    border: tenureYears === years ? '1.5px solid #f15a24' : '1px solid #e2e8f0',
                    backgroundColor: tenureYears === years ? '#fff6f2' : '#ffffff',
                    color: tenureYears === years ? '#f15a24' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {years} Yrs
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Output Box */}
        <div
          style={{
            backgroundColor: '#110e2e',
            borderRadius: '20px',
            padding: '28px',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div>
            <span style={{ fontSize: '0.8125rem', color: '#9490b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Estimated Monthly EMI
            </span>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#f15a24',
                marginTop: '4px'
              }}
            >
              {formatCurrencyINR(calculations.monthlyEmi)}
              <span style={{ fontSize: '1rem', color: '#cbd5e1', fontWeight: 400, fontFamily: 'var(--font-sans)' }}> / month</span>
            </div>
          </div>

          {/* Breakdown Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingTop: '16px', borderTop: '1px solid #2c2763' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#9490b8' }}>Principal Loan</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                {formatCurrencyINR(loanAmount)}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#9490b8' }}>Total Interest</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fed7aa' }}>
                {formatCurrencyINR(calculations.totalInterest)}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#9490b8' }}>Total Payable</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                {formatCurrencyINR(calculations.totalPayment)}
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#9490b8' }}>Down Payment</span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>
                {formatCurrencyINR(downPaymentAmount)}
              </div>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '6px' }}>
              <span>Principal: {calculations.principalPercent}%</span>
              <span>Interest: {calculations.interestPercent}%</span>
            </div>
            <div style={{ height: '8px', width: '100%', borderRadius: '4px', backgroundColor: '#fed7aa', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${calculations.principalPercent}%`, backgroundColor: '#f15a24', height: '100%' }} />
            </div>
          </div>

          <button
            onClick={() => openModal('schedule', property || { name: propertyName || 'Aira Property' })}
            className="btn-primary"
            style={{ width: '100%', padding: '12px 20px', fontSize: '0.9375rem', marginTop: '6px' }}
          >
            <Calendar size={16} />
            <span>Apply For Bank Loan Assistance</span>
          </button>
        </div>

      </div>
    </div>
  );
}
