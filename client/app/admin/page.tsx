'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { PRODUCTS } from '../../lib/products';
import { ShoppingBag, DollarSign, Package, Users, Plus, CheckCircle, Clock, Search, ShieldCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  const [productsList, setProductsList] = useState(PRODUCTS);

  const toggleStock = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const totalRevenue = 14850.00;
  const totalOrders = 342;

  return (
    <div className="min-h-screen flex flex-col bg-nude-50">
      <Navbar />

      {/* Admin Header */}
      <section className="bg-brand-950 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-gold/20 text-rose-gold text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SHEESTUFF STORE ADMIN PORTAL</span>
            </div>
            <h1 className="font-serif text-3xl font-bold">Store Management Dashboard</h1>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-rose-gold text-white font-bold text-xs px-6 py-3.5 rounded-full shadow hover:bg-rose-deep transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Beauty Product</span>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full space-y-10 text-left">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-brand-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-brand-500 font-bold uppercase tracking-wider">Total Sales</p>
              <p className="font-serif text-2xl font-bold text-brand-950">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-blush text-rose-deep flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-brand-500 font-bold uppercase tracking-wider">Total Orders</p>
              <p className="font-serif text-2xl font-bold text-brand-950">{totalOrders}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-900 flex items-center justify-center font-bold">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-brand-500 font-bold uppercase tracking-wider">Active Products</p>
              <p className="font-serif text-2xl font-bold text-brand-950">{productsList.length}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-brand-500 font-bold uppercase tracking-wider">Registered Customers</p>
              <p className="font-serif text-2xl font-bold text-brand-950">1,240</p>
            </div>
          </div>
        </div>

        {/* Product Inventory Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-brand-100 pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-950">Product Inventory Manager</h2>
              <p className="text-xs text-brand-500">Toggle availability and view stock pricing</p>
            </div>
            <Link
              href="/admin/products/new"
              className="text-xs font-bold text-brand-950 hover:underline"
            >
              + Add Product
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-200 text-brand-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-2">Product</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2">Price</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {productsList.map((product) => (
                  <tr key={product.id} className="hover:bg-nude-50/50">
                    <td className="py-3 px-2 flex items-center gap-3">
                      <img src={product.image} alt="" className="w-10 h-10 object-cover rounded-xl" />
                      <div>
                        <p className="font-bold text-brand-950">{product.name}</p>
                        <p className="text-[10px] text-brand-500">{product.volume}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium text-brand-800">{product.category}</td>
                    <td className="py-3 px-2 font-serif font-bold text-brand-950">${product.price}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => toggleStock(product.id)}
                        className="text-[11px] font-bold text-brand-950 hover:underline"
                      >
                        {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
