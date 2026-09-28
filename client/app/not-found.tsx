'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3E9EC] text-[#00030E]">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-12">
        <div className="w-16 h-16 rounded-3xl bg-[#00030E] text-[#B47A9A] flex items-center justify-center mb-6 shadow-xl border border-[#B47A9A]/30">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#5E3A5C] block mb-1">
          404 PAGE NOT FOUND
        </span>

        <h1 className="font-serif text-4xl font-bold text-[#00030E] mb-3">
          Formula Not Found
        </h1>

        <p className="text-xs text-[#2C1B2F] mb-8 leading-relaxed">
          The beauty page or product route you are looking for has moved or does not exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#00030E] text-[#F3E9EC] font-bold text-xs px-8 py-4 rounded-full shadow-lg hover:bg-[#2C1B2F] transition"
        >
          <ArrowLeft className="w-4 h-4 text-[#B47A9A]" />
          <span>Return to SheeStuff Home</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
