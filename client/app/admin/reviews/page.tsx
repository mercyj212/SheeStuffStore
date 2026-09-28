'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, Trash2, ShieldCheck } from 'lucide-react';
import { useStore } from '../../../lib/context/StoreContext';

const MOCK_ADMIN_REVIEWS = [
  {
    id: '1',
    author: 'Elena Vance',
    rating: 5,
    date: '2 days ago',
    title: 'Literally my holy grail serum!',
    comment: 'My skin cleared up and hyperpigmentation faded in 2 weeks. Unreal glow!',
    productName: 'Luminary Glow Serum',
    approved: true,
  },
  {
    id: '2',
    author: 'Sophia K.',
    rating: 5,
    date: '1 week ago',
    title: 'Obsessed with the texture',
    comment: 'Absorbs instantly and smells so fresh!',
    productName: 'Velvet Petal Deep Dew Cream',
    approved: true,
  },
];

export default function AdminReviewsPage() {
  const { showToast } = useStore();
  const [reviews, setReviews] = useState(MOCK_ADMIN_REVIEWS);

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review removed from catalog');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-[#B47A9A]/30 pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#00030E]">Customer Reviews Queue</h1>
        <p className="text-xs text-[#5E3A5C]">Approve, moderate, or remove verified customer feedback</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-3xl border border-[#B47A9A]/30 shadow-sm flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="font-bold text-xs text-[#00030E]">{review.author}</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Verified Buyer
                </span>
              </div>
              <p className="font-serif font-bold text-sm text-[#00030E]">"{review.title}"</p>
              <p className="text-xs text-[#2C1B2F] leading-relaxed">{review.comment}</p>
              <p className="text-[11px] text-[#5E3A5C]">Product: <strong>{review.productName}</strong> • {review.date}</p>
            </div>

            <button
              onClick={() => deleteReview(review.id)}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
              title="Delete review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
