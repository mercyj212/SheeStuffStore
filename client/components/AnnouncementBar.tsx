'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, Gift } from 'lucide-react';

export default function AnnouncementBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#00030E] text-[#F3E9EC] text-xs py-2.5 px-4 font-medium tracking-wide border-b border-[#2C1B2F]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-[#B47A9A] animate-pulse" />
          <span>
            SPRING BEAUTY SALE: Use code <strong className="text-[#B47A9A] underline font-semibold">SHEE15</strong> for 15% OFF + Free Gift!
          </span>
        </div>

        <div className="flex items-center gap-4 text-[#B47A9A] text-[11px] justify-center">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#B47A9A]" />
            <span className="text-[#F3E9EC]">Free Shipping over $50</span>
          </div>
          <span className="hidden md:inline text-[#5E3A5C]">•</span>
          <div className="flex items-center gap-1">
            <Gift className="w-3.5 h-3.5 text-[#B47A9A]" />
            <span className="text-[#F3E9EC]">Ends in:</span>
            <span className="bg-[#2C1B2F] px-2 py-0.5 rounded text-white font-mono font-bold text-xs border border-[#5E3A5C]">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
