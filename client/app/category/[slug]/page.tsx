'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import AnnouncementBar from '../../../components/AnnouncementBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProductCard from '../../../components/ProductCard';
import { PRODUCTS } from '../../../lib/products';
import { ProductCategory } from '../../../lib/types';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SLUG_TO_CATEGORY: Record<string, ProductCategory> = {
  'skincare': 'Skincare',
  'serums': 'Serums',
  'moisturizers': 'Moisturizers',
  'lip-care': 'Lip Care',
  'sunscreen': 'Sunscreen',
  'makeup': 'Makeup',
  'sets-kits': 'Sets & Kits',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Skincare': 'Formulated with clinical-grade botanicals to cleanse, refine, and rejuvenate your skin barrier.',
  'Serums': 'High-potency concentrated elixirs infused with Vitamin C, Ferulic Acid, and Triple Hyaluronic Acid.',
  'Moisturizers': 'Rich peptide creams and barrier-repairing Ceramide whips for 72-hour plush hydration.',
  'Lip Care': 'Melt-on-contact lip butter treatments, oils, and masks with peach nectar and vegan collagen.',
  'Sunscreen': 'Zero-white-cast weightless gel defense against PA++++ UVA/UVB and blue light radiation.',
  'Makeup': 'Satin-finish liquid blushes and glowing lip tints that enhance your natural features.',
  'Sets & Kits': 'Curated beauty ritual sets and limited-edition gift discovery boxes.',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryName = SLUG_TO_CATEGORY[slug] || 'Skincare';

  const categoryProducts = PRODUCTS.filter((p) => p.category === categoryName);

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      {/* Category Hero Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-rose-deep text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs text-rose-gold font-bold mb-4 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Products</span>
          </Link>

          <span className="text-xs font-bold uppercase tracking-widest text-rose-gold block mb-2">
            BEAUTY CATEGORY
          </span>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-3">
            {categoryName}
          </h1>

          <p className="text-xs sm:text-sm text-nude-200 max-w-xl mx-auto">
            {CATEGORY_DESCRIPTIONS[categoryName] || 'Discover formulas tailored for your beauty routine.'}
          </p>
        </div>
      </section>

      {/* Category Product Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-100">
          <span className="text-xs text-brand-700 font-medium">
            Showing <strong className="text-brand-950 font-bold">{categoryProducts.length}</strong> items in <strong>{categoryName}</strong>
          </span>
          <Link href="/shop" className="text-xs font-bold text-brand-950 underline hover:text-brand-600">
            View All Categories
          </Link>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-200 p-8 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-rose-gold mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-brand-950 mb-1">New Formulas Coming Soon</h3>
            <p className="text-xs text-brand-700 mb-6">Check out our best-selling serums in the main shop catalog</p>
            <Link
              href="/shop"
              className="bg-brand-950 text-white text-xs font-bold px-6 py-3 rounded-full shadow hover:bg-brand-800 transition inline-block"
            >
              Explore Shop Catalog
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
