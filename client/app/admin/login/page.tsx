'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../../../lib/context/StoreContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useStore();

  const [email, setEmail] = useState('admin@sheestuffstore.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      // Validate credentials (Demo credentials: admin@sheestuffstore.com / admin123)
      if (
        (email.trim() === 'admin@sheestuffstore.com' || email.trim() === 'admin') &&
        (password === 'admin123' || password === 'sheestuff2026')
      ) {
        localStorage.setItem('sheestuff_admin_auth', 'authenticated_admin_session_token');
        showToast('🔓 Admin login successful! Welcome to SheeStuff Portal.');
        router.push('/admin');
      } else {
        setErrorMsg('Invalid email or password. Use default: admin@sheestuffstore.com / admin123');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#00030E] via-[#0B0E1A] to-[#2C1B2F] text-[#F3E9EC] relative overflow-hidden">
      
      {/* Background Glow graphics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B47A9A]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-[#B47A9A]/30 shadow-2xl relative z-10 text-left">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2C1B2F] via-[#5E3A5C] to-[#B47A9A] flex items-center justify-center text-white mx-auto shadow-lg border border-[#B47A9A]/40">
            <Sparkles className="w-7 h-7 text-[#F3E9EC] animate-pulse" />
          </div>
          
          <span className="text-xs font-bold uppercase tracking-widest text-[#B47A9A] block">
            SHEESTUFF STORE
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">
            Admin Portal Access
          </h1>
          <p className="text-xs text-[#F3E9EC]/70">
            Sign in with authorized administrator credentials
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-xs text-rose-200 text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#F3E9EC] mb-1">Admin Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B47A9A]" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#00030E]/80 border border-[#B47A9A]/30 rounded-2xl py-3 pl-10 pr-4 text-[#F3E9EC] focus:outline-none focus:ring-2 focus:ring-[#B47A9A]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#F3E9EC] mb-1">Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B47A9A]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#00030E]/80 border border-[#B47A9A]/30 rounded-2xl py-3 pl-10 pr-10 text-[#F3E9EC] focus:outline-none focus:ring-2 focus:ring-[#B47A9A]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B47A9A] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Fill Info Box */}
          <div className="p-3 bg-[#2C1B2F]/60 rounded-2xl border border-[#B47A9A]/20 text-[11px] text-[#F3E9EC]/80 space-y-1">
            <div className="flex items-center gap-1 font-bold text-[#B47A9A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Demo Credentials Preset:</span>
            </div>
            <p><strong>Email:</strong> admin@sheestuffstore.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#B47A9A] text-[#00030E] hover:bg-white font-bold py-4 rounded-2xl shadow-lg transition text-xs active:scale-98 mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
