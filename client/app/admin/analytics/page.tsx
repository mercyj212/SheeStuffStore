'use client';

import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const categoriesBreakdown = [
    { category: 'Serums', percentage: 42, revenue: 6237.00 },
    { category: 'Moisturizers', percentage: 28, revenue: 4158.00 },
    { category: 'Lip Care', percentage: 16, revenue: 2376.00 },
    { category: 'Sunscreen', percentage: 14, revenue: 2079.00 },
  ];

  return (
    <div className="space-y-8 text-left">
      <div className="border-b border-[#B47A9A]/30 pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#00030E]">Sales Analytics & Revenue Reports</h1>
        <p className="text-xs text-[#5E3A5C]">Real-time customer conversion, category share, and growth metrics</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#B47A9A]/30 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5E3A5C]">
            <span>Monthly Revenue</span>
            <span className="flex items-center text-emerald-600 font-bold gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +24.8%
            </span>
          </div>
          <p className="font-serif text-3xl font-bold text-[#00030E]">$14,850.00</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#B47A9A]/30 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5E3A5C]">
            <span>Average Order Value (AOV)</span>
            <span className="flex items-center text-emerald-600 font-bold gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +12.4%
            </span>
          </div>
          <p className="font-serif text-3xl font-bold text-[#00030E]">$43.42</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#B47A9A]/30 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5E3A5C]">
            <span>Store Conversion Rate</span>
            <span className="flex items-center text-emerald-600 font-bold gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +3.8%
            </span>
          </div>
          <p className="font-serif text-3xl font-bold text-[#00030E]">3.85%</p>
        </div>
      </div>

      {/* Category Sales Breakdown Bars */}
      <div className="bg-white rounded-3xl p-8 border border-[#B47A9A]/30 shadow-sm space-y-6">
        <h2 className="font-serif text-xl font-bold text-[#00030E]">Category Revenue Share</h2>
        <div className="space-y-4">
          {categoriesBreakdown.map((item) => (
            <div key={item.category} className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold text-[#00030E]">
                <span>{item.category}</span>
                <span>${item.revenue.toLocaleString()} ({item.percentage}%)</span>
              </div>
              <div className="w-full h-3 bg-[#F3E9EC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5E3A5C] to-[#B47A9A] rounded-full transition-all duration-700"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
