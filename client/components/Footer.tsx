'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Instagram, Facebook, Twitter, Heart, ShieldCheck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-nude-100 pt-16 pb-12 border-t border-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-900">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <img
                src="/logo-light.png"
                alt="SheeStuffstore Logo"
                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <p className="text-xs text-nude-300 max-w-sm leading-relaxed">
              SheeStuff Store brings you clinical-grade botanical skincare and high-performance cosmetics. Formulated with zero cruelty, zero toxins, and 100% natural radiance.
            </p>

            <div className="flex items-center gap-3 text-nude-300">
              <a href="#" className="p-2 rounded-full bg-brand-900 hover:bg-rose-gold hover:text-white transition" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-brand-900 hover:bg-rose-gold hover:text-white transition" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-brand-900 hover:bg-rose-gold hover:text-white transition" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white mb-4">Shop Collection</h4>
            <ul className="space-y-2 text-xs text-nude-300">
              <li><Link href="#catalog" className="hover:text-rose-gold transition">Vitamin C Serums</Link></li>
              <li><Link href="#catalog" className="hover:text-rose-gold transition">Moisture Barrier Creams</Link></li>
              <li><Link href="#catalog" className="hover:text-rose-gold transition">Silk Lip Butters</Link></li>
              <li><Link href="#catalog" className="hover:text-rose-gold transition">Invisible SPF 50 Gel</Link></li>
              <li><Link href="#promo" className="hover:text-rose-gold transition">The Golden Hour Kit</Link></li>
            </ul>
          </div>

          {/* Help & Service */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white mb-4">Customer Care</h4>
            <ul className="space-y-2 text-xs text-nude-300">
              <li><a href="#" className="hover:text-rose-gold transition">Track Your Order</a></li>
              <li><a href="#" className="hover:text-rose-gold transition">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-rose-gold transition">Skin Type Quiz</a></li>
              <li><a href="#" className="hover:text-rose-gold transition">FAQ & Help Center</a></li>
              <li><a href="#" className="hover:text-rose-gold transition">Contact Beauty Experts</a></li>
            </ul>
          </div>

          {/* Guarantee & Contact */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white mb-4">Our Commitment</h4>
            <ul className="space-y-2.5 text-xs text-nude-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cruelty-Free Certified</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-gold" />
                <span>Dermatologist Approved</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-rose-300" />
                <span>Secure SSL Payments</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-nude-400">
          <p>© 2026 SheeStuff Store Inc. All rights reserved. Crafted with precision & beauty.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
