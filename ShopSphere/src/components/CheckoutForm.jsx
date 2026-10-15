import React, { useState } from 'react';
import {
  X,
  CreditCard,
  MapPin,
  Lock,
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutForm = () => {
  const {
    cartItems,
    isCheckoutOpen,
    closeCheckout,
    getCartTotal,
    getShippingFee,
    getGrandTotal,
    placeOrder
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen || cartItems.length === 0) return null;

  const subtotal = getCartTotal();
  const shipping = getShippingFee();
  const grandTotal = getGrandTotal();

  
  const formatCardNumber = (value) => {
    const raw = value.replace(/\D/g, '').substring(0, 16);
    const groups = raw.match(/.{1,4}/g);
    return groups ? groups.join(' ') : raw;
  };

  const formatExpiry = (value) => {
    const raw = value.replace(/\D/g, '').substring(0, 4);
    if (raw.length >= 3) {
      return `${raw.substring(0, 2)}/${raw.substring(2, 4)}`;
    }
    return raw;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedVal = value;

    if (name === 'cardNumber') {
      formattedVal = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedVal = formatExpiry(value);
    } else if (name === 'cvv') {
      formattedVal = value.replace(/\D/g, '').substring(0, 4);
    } else if (name === 'phone') {
      formattedVal = value.replace(/[^\d+()-\s]/g, '').substring(0, 18);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedVal }));

    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  
  const validate = () => {
    const newErrors = {};

    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Please enter your full name';
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    
    const digitsOnlyPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (digitsOnlyPhone.length < 10) {
      newErrors.phone = 'Phone must contain at least 10 digits';
    }

    
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }

    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    
    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP/Postal code is required';
    } else if (formData.zip.trim().length < 4) {
      newErrors.zip = 'ZIP code is too short';
    }

    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Name on card is required';
    }

    
    const digitsOnlyCard = formData.cardNumber.replace(/\s/g, '');
    if (!digitsOnlyCard) {
      newErrors.cardNumber = 'Card number is required';
    } else if (digitsOnlyCard.length !== 16) {
      newErrors.cardNumber = 'Card number must be exactly 16 digits';
    }

    
    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiration date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Must be in MM/YY format';
    } else {
      const [expMonth, expYear] = formData.expiry.split('/').map(Number);
      if (expMonth < 1 || expMonth > 12) {
        newErrors.expiry = 'Invalid month (01-12)';
      }
    }

    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      
      const firstErrorEl = document.querySelector('.input-error-msg');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    
    setTimeout(() => {
      setIsSubmitting(false);
      placeOrder(formData);
    }, 1200);
  };

  
  const getMaskedDisplay = () => {
    const raw = formData.cardNumber.replace(/\s/g, '');
    if (!raw) return '•••• •••• •••• ••••';
    const first4 = raw.substring(0, 4);
    const last4 = raw.length >= 16 ? raw.substring(12, 16) : '••••';
    return `${first4} •••• •••• ${last4}`;
  };

  return (
    <div className="modal-backdrop" onClick={closeCheckout} role="dialog" aria-modal="true">
      <div
        className="checkout-modal-container glass-panel animate-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {}
        <div className="checkout-header">
          <div className="checkout-title-group">
            <Lock className="w-5 h-5 text-gold mr-2.5" />
            <h2 className="checkout-title">Express Secure Checkout</h2>
          </div>
          <button
            onClick={closeCheckout}
            className="checkout-close-btn"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5 text-purple-200 hover:text-white" />
          </button>
        </div>

        {}
        <div className="checkout-warning-banner">
          <AlertTriangle className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
          <div>
            <strong className="text-amber-300">DEMO ENVIRONMENT NOTICE:</strong>
            <p className="text-sm text-purple-200">
              Payment and order submission are simulated for demonstration purposes. No real payments are processed.
            </p>
          </div>
        </div>

        {}
        <div className="checkout-body-grid">
          {}
          <form onSubmit={handleSubmit} className="checkout-form" noValidate>
            {}
            <div className="form-section">
              <div className="section-title-line">
                <MapPin className="w-4 h-4 text-purple-light mr-2" />
                <h3 className="form-section-title">1. Delivery Address</h3>
              </div>

              <div className="form-fields-grid">
                {}
                <div className="form-group full-width">
                  <label htmlFor="name" className="field-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Chandan Sharma"
                    className={`form-input ${errors.name ? 'input-invalid' : ''}`}
                  />
                  {errors.name && <span className="input-error-msg">{errors.name}</span>}
                </div>

                {}
                <div className="form-group">
                  <label htmlFor="email" className="field-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="chandan@example.com"
                    className={`form-input ${errors.email ? 'input-invalid' : ''}`}
                  />
                  {errors.email && <span className="input-error-msg">{errors.email}</span>}
                </div>

                {}
                <div className="form-group">
                  <label htmlFor="phone" className="field-label">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={`form-input ${errors.phone ? 'input-invalid' : ''}`}
                  />
                  {errors.phone && <span className="input-error-msg">{errors.phone}</span>}
                </div>

                {}
                <div className="form-group full-width">
                  <label htmlFor="address" className="field-label">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Luxury Boulevard, Suite 400"
                    className={`form-input ${errors.address ? 'input-invalid' : ''}`}
                  />
                  {errors.address && <span className="input-error-msg">{errors.address}</span>}
                </div>

                {}
                <div className="form-group">
                  <label htmlFor="city" className="field-label">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className={`form-input ${errors.city ? 'input-invalid' : ''}`}
                  />
                  {errors.city && <span className="input-error-msg">{errors.city}</span>}
                </div>

                {}
                <div className="form-group">
                  <label htmlFor="zip" className="field-label">ZIP / Postal Code *</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="10001"
                    className={`form-input ${errors.zip ? 'input-invalid' : ''}`}
                  />
                  {errors.zip && <span className="input-error-msg">{errors.zip}</span>}
                </div>
              </div>
            </div>

            {}
            <div className="form-section">
              <div className="section-title-line">
                <CreditCard className="w-4 h-4 text-purple-light mr-2" />
                <h3 className="form-section-title">2. Payment Method (Simulated)</h3>
              </div>

              {}
              <div className="virtual-card-preview">
                <div className="virtual-card-top">
                  <span className="text-xs uppercase tracking-widest text-purple-light">ShopSphere VIP Black</span>
                  <CreditCard className="w-6 h-6 text-gold" />
                </div>
                <div className="virtual-card-number">
                  {getMaskedDisplay()}
                </div>
                <div className="virtual-card-bottom">
                  <div>
                    <span className="text-[10px] text-purple-300 block uppercase">Cardholder</span>
                    <span className="text-xs font-semibold tracking-wider uppercase text-white">
                      {formData.cardholderName || 'YOUR NAME'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-300 block uppercase">Expires</span>
                    <span className="text-xs font-semibold text-white">
                      {formData.expiry || 'MM/YY'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-fields-grid mt-4">
                {}
                <div className="form-group full-width">
                  <label htmlFor="cardholderName" className="field-label">Cardholder Name *</label>
                  <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    placeholder="Name exactly as on card"
                    className={`form-input ${errors.cardholderName ? 'input-invalid' : ''}`}
                  />
                  {errors.cardholderName && <span className="input-error-msg">{errors.cardholderName}</span>}
                </div>

                {}
                <div className="form-group full-width">
                  <label htmlFor="cardNumber" className="field-label">
                    Card Number (16 digits) *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    className={`form-input font-mono ${errors.cardNumber ? 'input-invalid' : ''}`}
                  />
                  {errors.cardNumber && <span className="input-error-msg">{errors.cardNumber}</span>}
                </div>

                {}
                <div className="form-group">
                  <label htmlFor="expiry" className="field-label">Expiry (MM/YY) *</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="12/28"
                    maxLength={5}
                    className={`form-input font-mono ${errors.expiry ? 'input-invalid' : ''}`}
                  />
                  {errors.expiry && <span className="input-error-msg">{errors.expiry}</span>}
                </div>

                {}
                <div className="form-group">
                  <label htmlFor="cvv" className="field-label">CVV / Security Code *</label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="•••"
                    maxLength={4}
                    className={`form-input font-mono ${errors.cvv ? 'input-invalid' : ''}`}
                  />
                  {errors.cvv && <span className="input-error-msg">{errors.cvv}</span>}
                </div>
              </div>
            </div>

            {}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`submit-order-btn ${isSubmitting ? 'submitting' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-2" />
                  <span>Authorizing Simulated Payment...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Lock className="w-5 h-5 mr-2 text-gold" />
                  <span>Place Simulated Order (${grandTotal.toFixed(2)})</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>
          </form>

          {}
          <div className="checkout-summary-col">
            <div className="checkout-summary-card glass-panel">
              <h3 className="summary-title">Order Summary ({cartItems.length} items)</h3>

              {}
              <div className="checkout-items-mini-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-item-mini">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="checkout-thumb"
                    />
                    <div className="item-mini-info">
                      <span className="item-mini-name">{item.name}</span>
                      <span className="item-mini-meta">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="item-mini-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {}
              <div className="summary-calc-box">
                <div className="calc-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="calc-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="calc-row">
                  <span>Simulated Sales Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="summary-divider" />
                <div className="calc-row total-highlight">
                  <span>Total Amount</span>
                  <span className="gold-gradient-text font-bold text-xl">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {}
              <div className="summary-trust-perks">
                <div className="trust-perk-row">
                  <ShieldCheck className="w-4 h-4 text-purple-light mr-2" />
                  <span>Encrypted 256-bit Simulated Gateway</span>
                </div>
                <div className="trust-perk-row">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  <span>Immediate Simulated Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
