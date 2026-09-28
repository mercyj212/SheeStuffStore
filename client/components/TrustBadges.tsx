'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Leaf, RefreshCw, Truck } from 'lucide-react';

const BADGES = [
  {
    icon: Sparkles,
    title: 'Clean & Vegan',
    desc: '100% Cruelty-Free certified ingredients',
  },
  {
    icon: ShieldCheck,
    title: 'Dermatologist Tested',
    desc: 'Clinically safe for hyper-sensitive skin',
  },
  {
    icon: Leaf,
    title: 'Eco Packaging',
    desc: 'Recyclable glass & sustainable cartons',
  },
  {
    icon: RefreshCw,
    title: '30-Day Guarantee',
    desc: '100% refund if you do not fall in love',
  },
  {
    icon: Truck,
    title: 'Fast Dispatch',
    desc: 'Orders ship within 24 hours guaranteed',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-nude-50 border-y border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {BADGES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-200/80 shadow-sm flex items-center justify-center text-brand-950 mb-3 hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-rose-gold" />
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-950">{item.title}</h4>
                <p className="text-[11px] text-brand-600 max-w-[160px] mt-0.5">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
