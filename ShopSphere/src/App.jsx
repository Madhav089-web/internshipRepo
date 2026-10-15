import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderConfirmation } from './components/OrderConfirmation';
import {
  Sparkles,
  Shield,
  CreditCard,
  Truck,
  Heart,
  Github,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import './App.css';

const MainAppContent = () => {
  const { toastMessage } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div className="app-container">
      {}
      {toastMessage && (
        <div className="toast-notification animate-bounce-short">
          <Sparkles className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <Navbar />

      {}
      <HeroSection />

      {}
      <main className="main-content">
        <ProductGrid
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </main>

      {}
      <ProductModal />
      <CartSidebar />
      <CheckoutForm />
      <OrderConfirmation />

      {}
      <footer id="about-section" className="app-footer glass-panel">
        <div className="footer-container">
          <div className="footer-top-grid">
            {}
            <div className="footer-col brand-col">
              <a href="#hero" className="brand-logo footer-logo">
                <span className="logo-gem">💎</span>
                <span className="logo-text">
                  Shop<span className="text-highlight">Sphere</span>
                </span>
              </a>
              <p className="footer-bio">
                The premier digital destination for curated luxury electronics, haute fashion, 
                and bespoke lifestyle accessories. Crafted with modern glassmorphism aesthetics.
              </p>
              <div className="footer-badges">
                <span className="footer-pill">
                  <Shield className="w-3.5 h-3.5 mr-1 text-gold" /> 100% Authentic
                </span>
                <span className="footer-pill">
                  <Truck className="w-3.5 h-3.5 mr-1 text-purple-light" /> Fast Dispatch
                </span>
              </div>
            </div>

            {}
            <div className="footer-col">
              <h4 className="footer-heading">Collections</h4>
              <ul className="footer-links">
                <li>
                  <button onClick={() => { setSelectedCategory('Electronics'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    Electronics & Audio
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('Fashion'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    Designer Fashion
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('Sports'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    Athletic & Fitness
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('Home'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    Home & Living
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedCategory('Books'); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    Hardcover Books
                  </button>
                </li>
              </ul>
            </div>

            {}
            <div className="footer-col">
              <h4 className="footer-heading">VIP Concierge</h4>
              <ul className="footer-links">
                <li><a href="#features-section">Shipping & Delivery</a></li>
                <li><a href="#features-section">30-Day Returns</a></li>
                <li><a href="#features-section">Authenticity Guarantee</a></li>
                <li><a href="#hero">Customer Testimonials</a></li>
                <li><a href="#about-section">Terms of Service</a></li>
              </ul>
            </div>

            {}
            <div className="footer-col newsletter-col">
              <h4 className="footer-heading">VIP Newsletter</h4>
              <p className="newsletter-text">
                Receive private invitations to limited batch drops and seasonal reductions.
              </p>
              {newsletterSubscribed ? (
                <div className="newsletter-success">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />
                  <span>Welcome to the VIP circle!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your VIP email..."
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p className="copyright-text">
              © {new Date().getFullYear()} ShopSphere Inc. All rights reserved. Built with React & Vite.
            </p>
            <div className="demo-disclaimer-tag">
              <span className="disclaimer-dot" />
              <span>Simulated E-Commerce Platform for Educational & Demonstration Purposes</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
