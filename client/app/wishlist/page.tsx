'use client';

import React from 'react';
import Link from 'next/link';
import AnnouncementBar from '../../components/AnnouncementBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../lib/context/StoreContext';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full text-left">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-1">
              YOUR SAVED FORMULAS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
              Wishlist ({wishlist.length})
            </h1>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-950 hover:text-brand-600 underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-200 p-8 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-rose-gold/40 mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-brand-950 mb-1">Your wishlist is empty</h3>
            <p className="text-xs text-brand-700 mb-6">Explore our beauty collection to save your favorite formulas</p>
            <Link
              href="/shop"
              className="bg-brand-950 text-white text-xs font-bold px-8 py-4 rounded-full shadow hover:bg-brand-800 transition inline-block"
            >
              Explore Catalog
            </Link>
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
}
