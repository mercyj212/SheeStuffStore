'use client';

import React, { useState } from 'react';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import PromoBanner from '../components/PromoBanner';
import ReviewsSection from '../components/ReviewsSection';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { ProductCategory } from '../lib/types';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    // Scroll smoothly to catalog section
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-nude-50">
      <Hero />

      <TrustBadges />

      <CategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <PromoBanner />

      <ProductGrid
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
      />

      <ReviewsSection />

      <Newsletter />

      <Footer />
    </main>
  );
}
