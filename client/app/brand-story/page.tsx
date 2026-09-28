'use client';

import React from 'react';
import Link from 'next/link';
import AnnouncementBar from '../../components/AnnouncementBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Sparkles, Heart, ShieldCheck, Leaf, Award, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';

const MILESTONES = [
  {
    year: '2024',
    title: 'The Botanical Vision',
    desc: 'Founded in Beverly Hills with a mission to purge synthetic fillers, parabens, and artificial dyes from luxury skincare routines.',
  },
  {
    year: '2025',
    title: 'Clinical & Sensitive Skin Validation',
    desc: 'Collaborated with leading dermatologists to refine our 15% Vitamin C & Triple Hyaluronic Acid complex for zero irritation.',
  },
  {
    year: '2026',
    title: 'The SheeStuff Store Era',
    desc: 'Unveiling our complete line of clean, high-performance skincare, silk lip butters, and barrier repair moisturizers worldwide.',
  },
];

export default function BrandStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3E9EC]">
      <AnnouncementBar />
      <Navbar />

      {/* Brand Story Hero Banner */}
      <section className="bg-gradient-to-br from-[#00030E] via-[#0B0E1A] to-[#2C1B2F] text-[#F3E9EC] py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B47A9A]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5E3A5C]/40 border border-[#B47A9A]/40 text-[#B47A9A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR JOURNEY & HERITAGE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            The Brand Story of <br />
            <span className="italic text-[#B47A9A]">SheeStuff Store</span>
          </h1>

          <p className="text-xs sm:text-base text-[#F3E9EC]/90 max-w-2xl mx-auto leading-relaxed">
            Where clinical scientific rigor meets the pure, restorative power of organic botanicals. Built for those who demand uncompromising radiance for their skin.
          </p>
        </div>
      </section>

      {/* Main Narrative Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 flex-1 w-full text-left">
        
        {/* Section 1: The Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5E3A5C] block">
              THE BEGINNING
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#00030E]">
              Born Out of a Quest for Pure Bio-Availability
            </h2>

            <p className="text-xs sm:text-sm text-[#2C1B2F] leading-relaxed">
              SheeStuff Store was created with a straightforward realization: most beauty products on the market were diluted with water, synthetic silicones, and harsh artificial fragrances that masked symptoms rather than nourishing the lipid moisture barrier.
            </p>

            <p className="text-xs sm:text-sm text-[#2C1B2F] leading-relaxed">
              We set out to formulate skincare differently. By pairing wild-harvested botanicals with active clinical compounds like L-Ascorbic Acid, Niacinamide, and Ferulic Acid at therapeutic levels, we created formulas that penetrate deeply without disrupting skin pH.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-bold text-[#00030E]">
              <div className="flex items-center gap-2 bg-white p-3.5 rounded-2xl border border-[#B47A9A]/30 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#B47A9A]" />
                <span>100% Clean Actives</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3.5 rounded-2xl border border-[#B47A9A]/30 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#B47A9A]" />
                <span>Zero Toxin Fillers</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000"
                alt="SheeStuff Botanical Laboratory"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00030E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif font-bold text-lg">Beverly Hills Formulation Lab</p>
                <p className="text-xs text-[#B47A9A]">Where clinical purity is tested and perfected daily</p>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2: Core Brand Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#B47A9A]/30 shadow-sm space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5E3A5C]">
              THE STANDARDS
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#00030E]">
              Our Three Unshakable Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="bg-[#F3E9EC] p-6 rounded-2xl border border-[#B47A9A]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2C1B2F] text-[#B47A9A] flex items-center justify-center mx-auto shadow">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#00030E]">1. Organic Sourcing</h3>
              <p className="text-xs text-[#2C1B2F] leading-relaxed">
                We ethically harvest Bulgarian Rose Hydrosol, Wild Orchids, and Jojoba Butters directly from organic farms.
              </p>
            </div>

            <div className="bg-[#F3E9EC] p-6 rounded-2xl border border-[#B47A9A]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2C1B2F] text-[#B47A9A] flex items-center justify-center mx-auto shadow">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#00030E]">2. Dermatologist Tested</h3>
              <p className="text-xs text-[#2C1B2F] leading-relaxed">
                Every product undergoes rigorous patch testing on hyper-sensitive skin to guarantee zero redness or pore clogging.
              </p>
            </div>

            <div className="bg-[#F3E9EC] p-6 rounded-2xl border border-[#B47A9A]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2C1B2F] text-[#B47A9A] flex items-center justify-center mx-auto shadow">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#00030E]">3. Earth-First Glass</h3>
              <p className="text-xs text-[#2C1B2F] leading-relaxed">
                Packaged in UV-protective frosted glass bottles and 100% biodegradable cartons to minimize environmental footprint.
              </p>
            </div>

          </div>
        </div>

        {/* Section 3: Brand Timeline / Milestones */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5E3A5C]">
              HERITAGE TIMELINE
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#00030E]">
              Our Journey of Innovation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MILESTONES.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-[#B47A9A]/30 shadow-sm relative group hover:border-[#5E3A5C] transition">
                <span className="font-serif text-4xl font-bold text-[#5E3A5C] block mb-2">
                  {item.year}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#00030E] mb-2">{item.title}</h3>
                <p className="text-xs text-[#2C1B2F] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Founder's Quote */}
        <div className="bg-[#0B0E1A] text-[#F3E9EC] rounded-3xl p-8 sm:p-14 border border-[#B47A9A]/30 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
          <Quote className="w-12 h-12 text-[#B47A9A]/20 mx-auto mb-4" />
          
          <p className="font-serif text-lg sm:text-2xl italic leading-relaxed mb-6 text-white">
            "Your skin deserves formulas that celebrate its natural resilience rather than masking it under synthetic layers. SheeStuff Store is our love letter to authentic, glowing beauty."
          </p>

          <div>
            <p className="font-serif font-bold text-base text-[#B47A9A]">Eleanor Vance</p>
            <p className="text-xs text-[#F3E9EC]/70 uppercase tracking-widest mt-0.5">Founder & Lead Botanical Chemist</p>
          </div>
        </div>

        {/* Section 5: Call to Action */}
        <div className="text-center pt-6 space-y-4">
          <h2 className="font-serif text-3xl font-bold text-[#00030E]">
            Experience the SheeStuff Difference
          </h2>
          <p className="text-xs sm:text-sm text-[#2C1B2F] max-w-md mx-auto">
            Discover our complete range of clean serums, moisturizers, and lip balms today.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#00030E] text-[#F3E9EC] font-bold text-xs px-8 py-4 rounded-full shadow-lg hover:bg-[#2C1B2F] transition"
          >
            <span>Shop All Beauty Formulas</span>
            <ArrowRight className="w-4 h-4 text-[#B47A9A]" />
          </Link>
        </div>

      </section>

      <Footer />
    </div>
  );
}
