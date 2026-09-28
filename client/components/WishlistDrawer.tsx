'use client';

import React from 'react';
import { useStore } from '../lib/context/StoreContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-brand-950/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-brand-100 animate-slide-left">
          
          {/* Header */}
          <div className="p-5 border-b border-brand-100 flex items-center justify-between bg-nude-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-deep fill-rose-deep" />
              <h2 className="font-serif text-xl font-bold text-brand-950">Your Wishlist</h2>
              <span className="bg-rose-blush text-rose-deep text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-gold/30">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full text-brand-700 hover:bg-brand-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length > 0 ? (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 bg-nude-50/80 rounded-2xl border border-brand-100 group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-brand-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 text-left">
                    <span className="text-[10px] font-bold text-brand-500 uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-950 truncate">
                      {product.name}
                    </h4>
                    <p className="font-serif font-bold text-sm text-brand-950 mt-1">
                      ${product.price}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        toggleWishlist(product);
                      }}
                      className="p-2 bg-brand-950 text-white rounded-full hover:bg-brand-800 transition shadow"
                      title="Move to Cart"
                    >
                      <ShoppingBag className="w-4 h-4 text-rose-300" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-2 text-brand-400 hover:text-rose-deep transition"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-brand-500">
                <Heart className="w-12 h-12 text-rose-gold/40 mx-auto mb-3" />
                <p className="font-serif font-bold text-lg text-brand-950 mb-1">Your wishlist is empty</p>
                <p className="text-xs text-brand-600 mb-6">Explore our collection to save your favorite formulas</p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-brand-950 text-white text-xs font-bold px-6 py-3 rounded-full shadow hover:bg-brand-800 transition"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
