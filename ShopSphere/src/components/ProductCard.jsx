import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, openProductModal } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    openProductModal(product);
  };

  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.4;
    return (
      <div className="flex items-center text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < fullStars || (i === fullStars && hasHalf)
                ? 'fill-amber-400 text-amber-400'
                : 'text-purple-900 fill-purple-950/40'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <article
      className="product-card glass-panel group"
      onClick={() => openProductModal(product)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openProductModal(product);
        }
      }}
    >
      {}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {}
        <span className="product-category-badge">
          {product.category}
        </span>

        {}
        {discountPercent > 0 && (
          <span className="product-discount-badge">
            -{discountPercent}% OFF
          </span>
        )}

        {}
        <button
          onClick={handleQuickView}
          className="quick-view-hover-btn"
          title="Quick preview details"
          aria-label="Quick View"
        >
          <Eye className="w-4 h-4 mr-1 text-purple-light" />
          <span>Quick View</span>
        </button>

        {}
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span className="out-of-stock-pill">
              <AlertCircle className="w-4 h-4 mr-1.5" />
              Sold Out
            </span>
          </div>
        )}
      </div>

      {}
      <div className="product-card-body">
        {}
        <div className="product-rating-row">
          {renderStars(product.rating)}
          <span className="rating-score">{product.rating.toFixed(1)}</span>
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>

        {}
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {}
        <p className="product-description-clamp">
          {product.description}
        </p>

        {}
        <div className="product-footer-row">
          <div className="product-prices">
            <span className="product-current-price gold-gradient-text">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="product-original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`add-to-cart-btn ${
              !product.inStock
                ? 'btn-disabled'
                : justAdded
                ? 'btn-added'
                : 'btn-active'
            }`}
            title={!product.inStock ? 'Currently out of stock' : 'Add to cart'}
            aria-label={!product.inStock ? 'Out of stock' : `Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 mr-1 animate-scale" />
                <span>Added</span>
              </>
            ) : !product.inStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
