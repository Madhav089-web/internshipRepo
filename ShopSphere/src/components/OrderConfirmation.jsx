import React from 'react';
import { CheckCircle2, Package, Calendar, MapPin, Sparkles, ArrowRight, Printer, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderConfirmation = () => {
  const { orderConfirmed, orderNumber, lastOrderDetails, resetOrder } = useCart();

  if (!orderConfirmed || !lastOrderDetails) return null;

  const handlePrintReceipt = () => {
    window.print();
  };

  const { customer, items, grandTotal, date } = lastOrderDetails;

  return (
    <div className="modal-backdrop confirmation-backdrop" role="dialog" aria-modal="true">
      <div className="confirmation-modal glass-panel animate-scale">
        {}
        <div className="success-icon-container">
          <div className="success-circle-glow" />
          <div className="success-circle">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-checkmark" />
          </div>
        </div>

        {}
        <h2 className="confirmation-title">Order Confirmed!</h2>
        <p className="confirmation-subtitle">
          Thank you for choosing ShopSphere. Your simulated order has been registered.
        </p>

        {}
        <div className="order-number-banner">
          <span className="order-number-label">Simulated Order Reference</span>
          <div className="order-number-value">
            <Sparkles className="w-5 h-5 text-gold mr-2" />
            <span className="font-mono font-bold tracking-wider">{orderNumber}</span>
          </div>
          <span className="order-date-text">Placed on: {date}</span>
        </div>

        {}
        <div className="confirmation-demo-alert">
          <AlertCircle className="w-4 h-4 text-purple-light mr-2 flex-shrink-0" />
          <p className="text-xs text-purple-200">
            <strong>Note:</strong> This is a simulated order for demonstration purposes. No real charges or shipments will occur.
          </p>
        </div>

        {}
        <div className="confirmation-details-grid">
          {}
          <div className="detail-card glass-panel">
            <Calendar className="w-5 h-5 text-gold mb-2" />
            <span className="detail-title">Estimated Delivery</span>
            <span className="detail-value text-white font-semibold">3 – 5 Business Days</span>
            <span className="detail-sub text-xs text-purple-200">Express Priority Dispatch</span>
          </div>

          {}
          <div className="detail-card glass-panel">
            <MapPin className="w-5 h-5 text-purple-light mb-2" />
            <span className="detail-title">Delivering To</span>
            <span className="detail-value text-white font-semibold">{customer.name}</span>
            <span className="detail-sub text-xs text-purple-200">
              {customer.address}, {customer.city} {customer.zip}
            </span>
          </div>
        </div>

        {}
        <div className="confirmation-items-box glass-panel">
          <h4 className="confirmation-section-title">Order Summary</h4>
          <div className="confirmation-items-list">
            {items.map((item) => (
              <div key={item.id} className="confirmation-item-row">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover mr-3 border border-purple-500/30"
                  />
                  <div>
                    <span className="text-white font-medium block text-sm">{item.name}</span>
                    <span className="text-xs text-purple-200">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <span className="text-white font-semibold text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="confirmation-total-row">
            <span className="text-purple-200 font-medium">Total Paid (Simulated)</span>
            <span className="gold-gradient-text font-bold text-xl">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {}
        <div className="confirmation-actions">
          <button
            onClick={resetOrder}
            className="btn-primary-gold w-full flex items-center justify-center py-3.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <button
            onClick={handlePrintReceipt}
            className="btn-print-receipt"
          >
            <Printer className="w-4 h-4 mr-2" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
