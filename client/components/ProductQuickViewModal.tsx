'use client';

import React, { useState } from 'react';
import { useStore } from '../lib/context/StoreContext';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { ProductShade } from '../lib/types';

export default function ProductQuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    quickViewProduct?.shades?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'howTo' | 'ingredients'>('benefits');
  const [isAdding, setIsAdding] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity, selectedShade || product.shades?.[0]);
    setTimeout(() => {
      setIsAdding(false);
      setQuickViewProduct(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brand-100 p-6 md:p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-nude-50 hover:bg-brand-100 text-brand-900 transition z-20"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-nude-100 border border-brand-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badges?.map((badge, idx) => (
                <span
                  key={idx}
                  className="absolute top-3 left-3 bg-brand-950 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Thumbnail switcher if secondary image exists */}
            {product.secondaryImage && (
              <div className="flex gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border-2 border-brand-950 cursor-pointer"
                />
                <img
                  src={product.secondaryImage}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-brand-200 opacity-70 hover:opacity-100 cursor-pointer"
                />
              </div>
            )}

            {/* Guarantee trust points */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-brand-800 bg-nude-50 p-3 rounded-xl border border-brand-100">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Organic & Clean</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-rose-gold" />
                <span>Fast Express Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product details */}
          <div className="space-y-5 text-left">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-brand-600 font-bold uppercase tracking-wider">{product.category}</span>
                <span className="text-brand-500 font-medium">{product.volume}</span>
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
                {product.name}
              </h2>
              
              <p className="text-xs text-brand-700 italic mt-1">{product.tagline}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-brand-950">{product.rating}</span>
                <span className="text-xs text-brand-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-brand-950">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-brand-400 line-through font-medium">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold text-rose-deep bg-rose-blush px-2 py-0.5 rounded-full">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            <p className="text-xs text-brand-800 leading-relaxed">
              {product.description}
            </p>

            {/* Shades Selector (If present) */}
            {product.shades && product.shades.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-brand-950 mb-2">
                  Select Shade: <span className="text-brand-600 font-normal">{selectedShade?.name || product.shades[0].name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.shades.map((shade, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedShade(shade)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        (selectedShade?.name || product.shades?.[0].name) === shade.name
                          ? 'border-brand-950 scale-110 shadow-md ring-2 ring-rose-gold/30'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: shade.colorHex }}
                      title={shade.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action buttons */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-brand-200 rounded-full px-3 py-1.5 bg-nude-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center font-bold text-brand-900 hover:text-brand-600"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center font-bold text-brand-900 hover:text-brand-600"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-950 text-nude-50 hover:bg-brand-800 py-3.5 px-6 rounded-full font-semibold text-xs shadow-lg transition active:scale-98"
              >
                {isAdding ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-rose-300" />
                    <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-full border border-brand-200 transition ${
                  isLiked ? 'bg-rose-blush text-rose-deep border-rose-gold' : 'hover:bg-brand-100 text-brand-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-deep' : ''}`} />
              </button>
            </div>

            {/* Detail Tabs */}
            <div className="border-t border-brand-100 pt-4">
              <div className="flex items-center gap-6 border-b border-brand-100 pb-2 text-xs font-bold text-brand-900">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`${activeTab === 'benefits' ? 'text-brand-600 border-b-2 border-brand-600 pb-2 -mb-2.5' : 'text-brand-400'}`}
                >
                  Key Benefits
                </button>
                <button
                  onClick={() => setActiveTab('howTo')}
                  className={`${activeTab === 'howTo' ? 'text-brand-600 border-b-2 border-brand-600 pb-2 -mb-2.5' : 'text-brand-400'}`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`${activeTab === 'ingredients' ? 'text-brand-600 border-b-2 border-brand-600 pb-2 -mb-2.5' : 'text-brand-400'}`}
                >
                  Ingredients
                </button>
              </div>

              <div className="pt-3 text-xs text-brand-800">
                {activeTab === 'benefits' && (
                  <ul className="space-y-1.5">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-rose-gold flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'howTo' && (
                  <p className="leading-relaxed">{product.howToUse}</p>
                )}

                {activeTab === 'ingredients' && (
                  <p className="leading-relaxed text-[11px] text-brand-600 font-mono">
                    {product.ingredients.join(', ')}
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
