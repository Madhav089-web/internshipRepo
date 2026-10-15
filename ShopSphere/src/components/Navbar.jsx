import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = ({ onNavigate }) => {
  const { getCartCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Products', href: '#products-section' },
    { label: 'Categories', href: '#categories-section' },
    { label: 'Why Us', href: '#features-section' },
    { label: 'About', href: '#about-section' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'navbar-scrolled'
            : 'navbar-default'
        }`}
      >
        <div className="navbar-container">
          {}
          <a
            href="#hero"
            className="brand-logo"
            onClick={(e) => handleLinkClick(e, '#hero')}
          >
            <span className="logo-gem">💎</span>
            <span className="logo-text">
              Shop<span className="text-highlight">Sphere</span>
            </span>
          </a>

          {}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {}
          <div className="nav-actions">
            <button
              onClick={openCart}
              className="cart-btn"
              aria-label={`Shopping Cart with ${cartCount} items`}
              title="Open shopping cart"
            >
              <div className="cart-icon-wrapper">
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="cart-badge animate-bounce-short">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="cart-btn-label">Cart</span>
            </button>

            {}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <div className="mobile-links-container">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-purple-light" />
                </a>
              ))}
              <div className="mobile-menu-divider" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="mobile-cart-btn"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span>View Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
