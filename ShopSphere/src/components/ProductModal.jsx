import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart, Check, ShieldCheck, Truck, RotateCcw, ThumbsUp, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal = () => {
  const { selectedProduct, isProductModalOpen, closeProductModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  
  useEffect(() => {
    if (isProductModalOpen) {
      setQuantity(1);
      setIsAdded(false);
      
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isProductModalOpen, selectedProduct]);

  if (!isProductModalOpen || !selectedProduct) return null;

  const discountPercent =
    selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price
      ? Math.round(
          ((selectedProduct.originalPrice - selectedProduct.price) /
            selectedProduct.originalPrice) *
            100
        )
      : 0;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!selectedProduct.inStock) return;
    addToCart(selectedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  
  const mockReviews = [
    {
      id: 'rev-1',
      name: 'Alexander Wright',
      avatar: 'AW',
      rating: 5,
      date: '2 days ago',
      verified: true,
      comment:
        'The build quality completely exceeded my expectations. Sleek finish, premium weight, and impeccable sound stage. Worth every penny.'
    },
    {
      id: 'rev-2',
      name: 'Elena Rostova',
      avatar: 'ER',
      rating: 5,
      date: '1 week ago',
      verified: true,
      comment:
        'Arrived in stunning luxury packaging within 2 days. The design aesthetic matches my workspace perfectly. Highly recommend to anyone seeking top tier craftsmanship.'
    },
    {
      id: 'rev-3',
      name: 'Marcus Vance',
      avatar: 'MV',
      rating: 4,
      date: '2 weeks ago',
      verified: true,
      comment:
        'Very premium touch and feel. Customer service was responsive when I inquired about expedited delivery. Top notch brand experience!'
    }
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={closeProductModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="product-modal-container glass-panel animate-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {}
        <button
          onClick={closeProductModal}
          className="modal-close-btn"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-purple-200 hover:text-white" />
        </button>

        <div className="modal-content-grid">
          {}
          <div className="modal-image-col">
            <div className="modal-image-wrapper">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="modal-product-img"
              />
              {}
              <div className="modal-image-badges">
                <span className="product-category-badge">
                  {selectedProduct.category}
                </span>
                {discountPercent > 0 && (
                  <span className="product-discount-badge">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {}
            <div className="modal-perks-box">
              <div className="perk-item">
                <Truck className="w-4 h-4 text-gold mr-2" />
                <span>Complimentary Express Shipping over $100</span>
              </div>
              <div className="perk-item">
                <ShieldCheck className="w-4 h-4 text-purple-light mr-2" />
                <span>2-Year Comprehensive Manufacturer Warranty</span>
              </div>
              <div className="perk-item">
                <RotateCcw className="w-4 h-4 text-purple-light mr-2" />
                <span>30-Day Hassle-Free Returns & Exchanges</span>
              </div>
            </div>
          </div>

          {}
          <div className="modal-info-col">
            <div className="modal-header-meta">
              <span className="modal-brand-tag">ShopSphere Signature Collection</span>
              <h2 id="modal-product-title" className="modal-product-title">
                {selectedProduct.name}
              </h2>

              {}
              <div className="modal-rating-row">
                <div className="flex items-center text-amber-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedProduct.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-purple-900 fill-purple-950/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-white mr-2">
                  {selectedProduct.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-purple-200 text-sm">
                  ({selectedProduct.reviews.toLocaleString()} verified reviews)
                </span>
              </div>
            </div>

            {}
            <div className="modal-price-box">
              <div className="modal-prices">
                <span className="modal-current-price gold-gradient-text">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="modal-original-price">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="stock-indicator">
                {selectedProduct.inStock ? (
                  <span className="stock-badge in-stock">
                    <span className="pulse-dot" /> In Stock & Ready to Ship
                  </span>
                ) : (
                  <span className="stock-badge out-of-stock">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> Currently Backordered
                  </span>
                )}
              </div>
            </div>

            {}
            <div className="modal-desc-box">
              <h4 className="modal-section-title">Description</h4>
              <p className="modal-description-text">{selectedProduct.description}</p>
            </div>

            {}
            {selectedProduct.specs && (
              <div className="modal-specs-box">
                <h4 className="modal-section-title">Key Highlights</h4>
                <div className="specs-grid">
                  {selectedProduct.specs.map((spec, idx) => (
                    <div key={idx} className="spec-item">
                      <span className="spec-bullet">✦</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {}
            <div className="modal-actions-box">
              <div className="quantity-control-wrapper">
                <span className="quantity-label">Quantity:</span>
                <div className="quantity-selector">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || !selectedProduct.inStock}
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={!selectedProduct.inStock}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
                className={`modal-add-cart-btn ${
                  !selectedProduct.inStock
                    ? 'btn-disabled'
                    : isAdded
                    ? 'btn-added'
                    : 'btn-active'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-2 animate-scale" />
                    <span>Added {quantity} to Cart!</span>
                  </>
                ) : !selectedProduct.inStock ? (
                  <span>Item Sold Out</span>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    <span>Add to Cart • ${(selectedProduct.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {}
            <div className="modal-reviews-section">
              <div className="reviews-header">
                <h4 className="modal-section-title">Recent Client Reviews</h4>
                <span className="text-xs text-purple-light">Verified Acquisitions</span>
              </div>

              <div className="reviews-list">
                {mockReviews.map((rev) => (
                  <div key={rev.id} className="review-card glass-panel">
                    <div className="review-top">
                      <div className="review-author">
                        <div className="author-avatar">{rev.avatar}</div>
                        <div>
                          <div className="author-name-row">
                            <span className="author-name">{rev.name}</span>
                            {rev.verified && (
                              <span className="verified-badge">
                                <Check className="w-3 h-3 mr-0.5 text-emerald-400" />
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="review-date">{rev.date}</span>
                        </div>
                      </div>
                      <div className="review-stars flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="review-body">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
