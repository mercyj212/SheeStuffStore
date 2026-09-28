'use client';

import React, { useState } from 'react';
import { Product } from '../lib/types';
import { useStore } from '../lib/context/StoreContext';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden border border-brand-100/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Top Media Container */}
      <div className="relative aspect-square overflow-hidden bg-nude-100 cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        
        {/* Main Product Image */}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badges?.map((badge, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
                badge.includes('OFF') || badge.includes('SAVE')
                  ? 'bg-rose-deep'
                  : badge.includes('BEST')
                  ? 'bg-brand-950'
                  : 'bg-brand-600'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-transform duration-200 z-10 shadow ${
            isLiked
              ? 'bg-rose-50 text-rose-deep scale-110'
              : 'bg-white/80 text-brand-700 hover:bg-white hover:text-brand-950 hover:scale-110'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-deep' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-brand-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="pointer-events-auto inline-flex items-center gap-2 bg-white text-brand-950 text-xs font-bold px-4 py-2.5 rounded-full shadow-lg hover:bg-nude-50 transform translate-y-2 group-hover:translate-y-0 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-rose-gold" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Category & Ratings */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-brand-500 font-semibold uppercase tracking-wider text-[11px]">
            {product.category}
          </span>
          
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-brand-950">{product.rating}</span>
            <span className="text-brand-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 
          onClick={() => setQuickViewProduct(product)}
          className="font-serif font-bold text-base sm:text-lg text-brand-950 group-hover:text-brand-600 transition-colors line-clamp-1 cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs text-brand-700 line-clamp-1 mt-1 mb-3">
          {product.tagline}
        </p>

        {/* Shades preview if available */}
        {product.shades && product.shades.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-[11px] text-brand-500 font-medium">Shades:</span>
            <div className="flex items-center gap-1">
              {product.shades.map((shade, idx) => (
                <span
                  key={idx}
                  title={shade.name}
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: shade.colorHex }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-brand-50 flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-brand-950">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-brand-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Quick Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
              isAdding
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-100 text-brand-950 hover:bg-brand-950 hover:text-white'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
