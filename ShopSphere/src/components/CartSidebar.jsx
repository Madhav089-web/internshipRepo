import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getShippingFee,
    getGrandTotal,
    openCheckout
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const subtotal = getCartTotal();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();
  const itemCount = getCartCount();
  const freeShippingThreshold = 100;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="drawer-backdrop" onClick={closeCart}>
      <aside
        className="cart-drawer glass-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping Cart Drawer"
      >
        {}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag className="w-6 h-6 text-purple-light mr-2.5" />
            <h2 className="drawer-title">Your Cart</h2>
            <span className="cart-count-badge">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="drawer-close-btn"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5 text-purple-200 hover:text-white" />
          </button>
        </div>

        {}
        {cartItems.length > 0 && (
          <div className="shipping-progress-banner">
            <div className="shipping-text-row">
              {amountNeededForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-gold">${amountNeededForFreeShipping.toFixed(2)}</strong> more for <strong>Free Express Shipping!</strong>
                </span>
              ) : (
                <span className="text-emerald-400 font-semibold flex items-center">
                  <Sparkles className="w-4 h-4 mr-1.5 text-gold" />
                  Congratulations! You unlocked Free Shipping!
                </span>
              )}
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {}
        <div className="drawer-body">
          {cartItems.length > 0 ? (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card glass-panel">
                  {}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-thumb"
                  />

                  {}
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="item-remove-btn"
                        title="Remove item"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4 text-purple-300 hover:text-rose-400" />
                      </button>
                    </div>

                    <span className="cart-item-unit-price">
                      ${item.price.toFixed(2)} each
                    </span>

                    {}
                    <div className="cart-item-actions">
                      <div className="drawer-qty-controls">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="drawer-qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="drawer-qty-number">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="drawer-qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="cart-line-subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            
            <div className="empty-cart-state">
              <div className="empty-cart-icon-wrapper">
                <ShoppingBag className="w-16 h-16 text-purple-light/70" />
              </div>
              <h3 className="empty-cart-title">Your shopping cart is empty</h3>
              <p className="empty-cart-subtext">
                Explore our curated gallery of premium luxury electronics, fashion, and accessories.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary-gold"
              >
                <span>Discover Products</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </div>

        {}
        {cartItems.length > 0 && (
          <div className="drawer-footer glass-panel">
            <div className="summary-lines">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-val">${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">
                  Estimated Shipping
                  {subtotal >= 100 && (
                    <span className="free-badge">FREE</span>
                  )}
                </span>
                <span className="summary-val">
                  {shippingFee === 0 ? '$0.00' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row grand-total-row">
                <span className="grand-label">Order Total</span>
                <span className="grand-val gold-gradient-text">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {}
            <div className="drawer-actions-stack">
              <button
                onClick={openCheckout}
                className="btn-checkout-primary"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <div className="drawer-secondary-actions">
                <button
                  onClick={clearCart}
                  className="btn-clear-cart"
                  title="Remove all items from cart"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  <span>Clear Cart</span>
                </button>
              </div>

              <div className="secure-checkout-notice">
                <ShieldCheck className="w-4 h-4 text-purple-light mr-1.5" />
                <span>Simulated 256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
