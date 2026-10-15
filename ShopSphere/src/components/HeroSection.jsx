import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star, Award, TrendingUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export const HeroSection = ({ onShopNowClick }) => {
  const { openProductModal } = useCart();
  
  const featuredProduct = products[0];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-wrapper">
      {}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      <div className="hero-container">
        {}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="w-4 h-4 text-gold mr-2 animate-pulse" />
            <span>Exclusive Spring Collection 2024</span>
          </div>

          <h1 className="hero-title">
            Discover <span className="hero-title-highlight">Luxury</span> Redefined
          </h1>

          <p className="hero-subtitle">
            Curated premium products at unbeatable prices. Experience unparalleled craftsmanship, 
            cutting-edge electronics, and elevated lifestyle essentials.
          </p>

          {}
          <div className="hero-buttons">
            <button
              onClick={() => scrollToSection('products-section')}
              className="btn-primary-gold"
              id="hero-shop-now-btn"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection('categories-section')}
              className="btn-secondary-outline"
            >
              <span>View Collections</span>
            </button>
          </div>

          {}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number gold-gradient-text">10K+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number gold-gradient-text">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number gold-gradient-text">4.9 ★</span>
              <span className="stat-label">5-Star Rated</span>
            </div>
          </div>
        </div>

        {}
        <div className="hero-visual">
          <div className="floating-card-wrapper">
            <div className="floating-product-card glass-panel">
              {}
              <div className="card-top-row">
                <span className="featured-badge">
                  <Award className="w-3.5 h-3.5 mr-1 text-gold" />
                  Staff Pick
                </span>
                <div className="card-rating">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-semibold text-white">4.8</span>
                  <span className="text-xs text-purple-200 ml-1">(2.3k)</span>
                </div>
              </div>

              {}
              <div className="card-image-box">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="card-main-img"
                  loading="eager"
                />
                <div className="live-status-pill">
                  <span className="pulse-dot" />
                  In Stock & Ready to Ship
                </div>
              </div>

              {}
              <div className="card-meta">
                <span className="card-category">{featuredProduct.category}</span>
                <h3 className="card-title">{featuredProduct.name}</h3>
                
                <div className="card-price-row">
                  <div className="price-group">
                    <span className="current-price gold-gradient-text">
                      ${featuredProduct.price.toFixed(2)}
                    </span>
                    <span className="original-price">
                      ${featuredProduct.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => openProductModal(featuredProduct)}
                    className="card-quick-btn"
                    title="Quick preview product"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>

            {}
            <div className="mini-floating-badge badge-discount">
              <span className="badge-highlight">SAVE 21%</span>
              <span className="badge-sub">Limited Time Offer</span>
            </div>

            <div className="mini-floating-badge badge-guarantee">
              <ShieldCheck className="w-5 h-5 text-purple-light mr-2" />
              <div>
                <p className="font-bold text-white text-xs">Authenticity Guaranteed</p>
                <p className="text-[10px] text-purple-200">100% Certified Original</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div id="features-section" className="trust-strip-container">
        <div className="trust-strip glass-panel">
          <div className="trust-item">
            <Zap className="w-6 h-6 text-gold mr-3" />
            <div>
              <h4 className="trust-title">Free Express Shipping</h4>
              <p className="trust-desc">On all orders exceeding $100</p>
            </div>
          </div>

          <div className="trust-item">
            <ShieldCheck className="w-6 h-6 text-purple-light mr-3" />
            <div>
              <h4 className="trust-title">30-Day Money Back</h4>
              <p className="trust-desc">No hassle 100% refund policy</p>
            </div>
          </div>

          <div className="trust-item">
            <Sparkles className="w-6 h-6 text-gold mr-3" />
            <div>
              <h4 className="trust-title">Luxury White-Glove Care</h4>
              <p className="trust-desc">Curated packaging & 24/7 support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
