'use client';

import React from 'react';
import { FEATURED_REVIEWS } from '../lib/products';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            REAL RESULTS, REAL GLOW
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
            Loved by 50,000+ Skin Enthusiasts
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500" />
              ))}
            </div>
            <span className="font-bold text-brand-950 text-sm">4.9 / 5.0</span>
            <span className="text-brand-500 text-xs">(Based on 2,500+ verified customer reviews)</span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-nude-50 rounded-3xl p-8 border border-brand-100/80 shadow-sm flex flex-col justify-between relative hover:shadow-md transition"
            >
              <Quote className="w-10 h-10 text-rose-gold/20 absolute top-6 right-6" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <h3 className="font-serif font-bold text-lg text-brand-950 mb-2">
                  "{review.title}"
                </h3>

                <p className="text-xs text-brand-800 leading-relaxed mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-200/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-brand-950">
                    <span>{review.author}</span>
                    {review.verified && (
                      <span title="Verified Buyer">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-brand-500 block mt-0.5">
                    Purchased: {review.productName}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-brand-600 bg-white px-2.5 py-1 rounded-full border border-brand-100">
                  <ThumbsUp className="w-3 h-3 text-rose-gold" />
                  <span className="text-[11px]">Helpful</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
