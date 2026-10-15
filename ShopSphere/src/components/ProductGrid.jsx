import React, { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { SearchFilter } from './SearchFilter';
import { products } from '../data/products';
import { PackageSearch, RotateCcw } from 'lucide-react';

export const ProductGrid = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy
}) => {
  
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        
        const matchesCategory =
          selectedCategory === 'All' ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();

        
        const query = searchTerm.toLowerCase().trim();
        const matchesSearch =
          query === '' ||
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'rating-desc') {
          return b.rating - a.rating;
        }
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        
        return (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0);
      });
  }, [searchTerm, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('default');
  };

  return (
    <section id="products-section" className="product-grid-section">
      <div className="section-header">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Our Curated Collection</span>
          <h2 className="section-title">
            Exceptional Quality, <span className="gradient-text">Designed to Elevate</span>
          </h2>
        </div>
      </div>

      {}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filteredProducts.length}
      />

      {}
      {filteredProducts.length > 0 ? (
        <div className="product-cards-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        
        <div className="empty-results-box glass-panel">
          <div className="empty-icon-circle">
            <PackageSearch className="w-12 h-12 text-purple-light" />
          </div>
          <h3 className="empty-title">No matching products found</h3>
          <p className="empty-description">
            We couldn't find any items matching "{searchTerm}" 
            {selectedCategory !== 'All' ? ` in category "${selectedCategory}"` : ''}.
            Try modifying your search or clearing your active filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="empty-reset-btn"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
