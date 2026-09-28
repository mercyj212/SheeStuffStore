'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AnnouncementBar from '../../../components/AnnouncementBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProductCard from '../../../components/ProductCard';
import { PRODUCTS } from '../../../lib/products';
import { useStore } from '../../../lib/context/StoreContext';
import { ProductShade, ProductReview } from '../../../lib/types';
import { 
  Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, 
  ChevronRight, ArrowLeft, RefreshCw, MessageSquare, ThumbsUp, Plus
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();
  const isLiked = isInWishlist(product.id);

  const [selectedShade, setSelectedShade] = useState<ProductShade | undefined>(
    product.shades?.[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'howTo' | 'ingredients' | 'reviews'>('benefits');
  const [isAdding, setIsAdding] = useState(false);

  // Write Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, title: '', comment: '' });
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(product.reviewsList || []);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity, selectedShade || product.shades?.[0]);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedShade || product.shades?.[0]);
    router.push('/checkout');
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.author && newReview.comment) {
      const added: ProductReview = {
        id: `rev-${Date.now()}`,
        author: newReview.author,
        rating: newReview.rating,
        date: 'Just now',
        title: newReview.title || 'Great product!',
        comment: newReview.comment,
        verified: true,
        helpfulCount: 0,
      };
      setLocalReviews([added, ...localReviews]);
      setShowReviewModal(false);
      setNewReview({ author: '', rating: 5, title: '', comment: '' });
      showToast('Thank you! Your review has been published ✨');
    }
  };

  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <nav className="flex items-center gap-2 text-xs text-brand-600">
          <Link href="/" className="hover:text-brand-950">Home</Link>
          <ChevronRight className="w-3 h-3 text-brand-400" />
          <Link href="/shop" className="hover:text-brand-950">Shop</Link>
          <ChevronRight className="w-3 h-3 text-brand-400" />
          <Link href={`/category/${product.category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} className="hover:text-brand-950">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-brand-400" />
          <span className="font-bold text-brand-950 truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-nude-100 border border-brand-100 group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-950 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow transition ${
                  isLiked ? 'bg-rose-blush text-rose-deep' : 'bg-white/80 text-brand-900 hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-deep' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              <img
                src={product.image}
                alt=""
                onClick={() => setSelectedImage(product.image)}
                className={`w-20 h-20 object-cover rounded-2xl border-2 cursor-pointer transition ${
                  selectedImage === product.image ? 'border-brand-950 shadow-md' : 'border-brand-200 opacity-60 hover:opacity-100'
                }`}
              />
              {product.secondaryImage && (
                <img
                  src={product.secondaryImage}
                  alt=""
                  onClick={() => setSelectedImage(product.secondaryImage!)}
                  className={`w-20 h-20 object-cover rounded-2xl border-2 cursor-pointer transition ${
                    selectedImage === product.secondaryImage ? 'border-brand-950 shadow-md' : 'border-brand-200 opacity-60 hover:opacity-100'
                  }`}
                />
              )}
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-100 text-center text-xs text-brand-800">
              <div className="p-3 bg-nude-50 rounded-2xl border border-brand-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <p className="font-bold">100% Organic</p>
                <p className="text-[10px] text-brand-500">Pure Botanicals</p>
              </div>
              <div className="p-3 bg-nude-50 rounded-2xl border border-brand-100">
                <Truck className="w-5 h-5 text-rose-gold mx-auto mb-1" />
                <p className="font-bold">Free Shipping</p>
                <p className="text-[10px] text-brand-500">Orders over $50</p>
              </div>
              <div className="p-3 bg-nude-50 rounded-2xl border border-brand-100">
                <RefreshCw className="w-5 h-5 text-brand-700 mx-auto mb-1" />
                <p className="font-bold">30-Day Guarantee</p>
                <p className="text-[10px] text-brand-500">No questions asked</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-brand-600 font-bold uppercase tracking-wider">{product.category}</span>
                <span className="text-brand-500 font-semibold">{product.volume}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
                {product.name}
              </h1>

              <p className="text-sm text-brand-700 italic mt-1">{product.tagline}</p>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="font-bold text-brand-950 text-sm">{product.rating}</span>
                <span className="text-xs text-brand-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-4 p-4 bg-nude-50 rounded-2xl border border-brand-100">
              <span className="font-serif text-4xl font-bold text-brand-950">${product.price}.00</span>
              {product.originalPrice && (
                <span className="text-base text-brand-400 line-through font-medium">
                  ${product.originalPrice}.00
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold text-rose-deep bg-rose-blush px-3 py-1 rounded-full border border-rose-gold/30">
                  Save ${product.originalPrice - product.price} (Special Price)
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-brand-800 leading-relaxed">
              {product.description}
            </p>

            {/* Shades selector if available */}
            {product.shades && product.shades.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-brand-950">
                  Shade Option: <span className="text-brand-600 font-semibold">{selectedShade?.name || product.shades[0].name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.shades.map((shade, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedShade(shade)}
                      className={`w-9 h-9 rounded-full border-2 transition-transform ${
                        (selectedShade?.name || product.shades?.[0].name) === shade.name
                          ? 'border-brand-950 scale-110 ring-2 ring-rose-gold/40'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: shade.colorHex }}
                      title={shade.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-brand-200 rounded-full bg-nude-50 px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 text-center font-bold text-brand-900 hover:text-brand-500"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-brand-950">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 text-center font-bold text-brand-900 hover:text-brand-500"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-950 text-nude-50 hover:bg-brand-800 py-4 px-6 rounded-full font-bold text-xs shadow-lg transition active:scale-98"
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
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-rose-gold text-white font-bold text-xs py-4 rounded-full shadow hover:bg-rose-deep transition"
              >
                Instant Buy Now (Fast Checkout)
              </button>
            </div>

            {/* Detailed Tabs */}
            <div className="border-t border-brand-100 pt-6">
              <div className="flex items-center gap-6 border-b border-brand-100 pb-3 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`${activeTab === 'benefits' ? 'text-brand-950 border-b-2 border-brand-950 pb-3 -mb-3.5' : 'text-brand-400'}`}
                >
                  Key Benefits
                </button>
                <button
                  onClick={() => setActiveTab('howTo')}
                  className={`${activeTab === 'howTo' ? 'text-brand-950 border-b-2 border-brand-950 pb-3 -mb-3.5' : 'text-brand-400'}`}
                >
                  How to Apply
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`${activeTab === 'ingredients' ? 'text-brand-950 border-b-2 border-brand-950 pb-3 -mb-3.5' : 'text-brand-400'}`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`${activeTab === 'reviews' ? 'text-brand-950 border-b-2 border-brand-950 pb-3 -mb-3.5' : 'text-brand-400'}`}
                >
                  Reviews ({localReviews.length})
                </button>
              </div>

              <div className="pt-4 text-xs text-brand-800 leading-relaxed">
                {activeTab === 'benefits' && (
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-rose-gold flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'howTo' && <p>{product.howToUse}</p>}

                {activeTab === 'ingredients' && (
                  <p className="font-mono text-[11px] text-brand-600">
                    {product.ingredients.join(', ')}
                  </p>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-brand-950">Customer Rating ({product.rating} / 5)</span>
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="bg-brand-950 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Write a Review</span>
                      </button>
                    </div>

                    {localReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-nude-50 rounded-2xl border border-brand-100">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-brand-950">{rev.author}</span>
                          <div className="flex text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="font-bold text-xs text-brand-900 mb-0.5">{rev.title}</p>
                        <p className="text-[11px] text-brand-700">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-brand-950 mb-6 text-left">
              You May Also Love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-brand-100 text-left">
            <h3 className="font-serif text-xl font-bold text-brand-950 mb-4">Write a Product Review</h3>
            <form onSubmit={handleAddReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-900 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sophia K."
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2 text-brand-950"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-900 mb-1">Star Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2 font-bold text-brand-950"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-brand-900 mb-1">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Glowing skin in 3 days!"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2 text-brand-950"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-900 mb-1">Your Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details about texture, results, and application..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full bg-nude-50 border border-brand-200 rounded-xl px-4 py-2 text-brand-950"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-nude-100 text-brand-800 font-bold py-3 rounded-full hover:bg-brand-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-950 text-white font-bold py-3 rounded-full hover:bg-brand-800"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
