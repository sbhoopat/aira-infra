/**
 * Formatting and Calculation Utilities for Indian Real Estate
 */

/**
 * Format numeric amount to Indian Currency String (e.g. ₹1.45 Cr, ₹85 Lakhs)
 */
export function formatIndianCurrency(amount) {
  if (!amount || isNaN(amount)) return "₹0";
  
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `₹${cr.replace(/\.00$/, '')} Cr`;
  } else if (amount >= 100000) {
    const lk = (amount / 100000).toFixed(2);
    return `₹${lk.replace(/\.00$/, '')} Lakhs`;
  } else {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
}

// Alias for formatIndianCurrency
export const formatCurrencyINR = formatIndianCurrency;

/**
 * Format integer with Indian comma notation (e.g. 12,50,000)
 */
export function formatIndianNumber(num) {
  if (!num || isNaN(num)) return "0";
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Format ISO date string into readable Indian format (e.g. 26 Sep 2026, 06:45 PM)
 */
export function formatDate(dateString) {
  if (!dateString) return "Recent";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch (err) {
    return dateString;
  }
}

/**
 * Calculate standard Monthly EMI (Equated Monthly Installment)
 * EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
 */
export function calculateEMI(principal, annualRatePercent, tenureYears) {
  if (!principal || principal <= 0 || !annualRatePercent || !tenureYears) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalPayment: 0,
      principal: 0
    };
  }

  const p = Number(principal);
  const r = (Number(annualRatePercent) / 12) / 100;
  const n = Number(tenureYears) * 12;

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

  return {
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principal: Math.round(p)
  };
}
