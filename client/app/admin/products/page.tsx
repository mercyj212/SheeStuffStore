'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '../../../lib/products';
import { Plus, Search, Trash2, Edit, Check, Eye } from 'lucide-react';
import { useStore } from '../../../lib/context/StoreContext';

export default function AdminProductsPage() {
  const { showToast } = useStore();
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState('');

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.inStock;
          showToast(`${p.name} marked as ${nextState ? 'IN STOCK' : 'OUT OF STOCK'}`);
          return { ...p, inStock: nextState };
        }
        return p;
      })
    );
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B47A9A]/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#00030E]">Product Inventory Catalog</h1>
          <p className="text-xs text-[#5E3A5C]">Manage products, update prices, and control stock availability</p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-[#00030E] text-[#F3E9EC] hover:bg-[#2C1B2F] font-bold text-xs px-6 py-3.5 rounded-2xl shadow transition"
        >
          <Plus className="w-4 h-4 text-[#B47A9A]" />
          <span>Add New Beauty Product</span>
        </Link>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#B47A9A]/30 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5E3A5C]" />
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F3E9EC] border border-[#B47A9A]/30 rounded-xl py-2 pl-10 pr-4 text-xs text-[#00030E] focus:ring-1 focus:ring-[#B47A9A]"
          />
        </div>
        <span className="text-xs text-[#5E3A5C] font-semibold hidden sm:inline">
          Showing {filtered.length} products
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#B47A9A]/30 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#B47A9A]/30 text-[#5E3A5C] uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Formula</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Price</th>
              <th className="py-3 px-3">Stock Status</th>
              <th className="py-3 px-3 text-right">Inventory Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3E9EC]">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-[#F3E9EC]/50 transition">
                <td className="py-3.5 px-3 flex items-center gap-3">
                  <img src={product.image} alt="" className="w-12 h-12 object-cover rounded-xl border border-[#B47A9A]/30" />
                  <div>
                    <Link href={`/product/${product.id}`} className="font-serif font-bold text-sm text-[#00030E] hover:underline">
                      {product.name}
                    </Link>
                    <p className="text-[10px] text-[#5E3A5C]">{product.volume}</p>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-semibold text-[#2C1B2F]">{product.category}</td>
                <td className="py-3.5 px-3 font-serif font-bold text-sm text-[#00030E]">${product.price}.00</td>
                <td className="py-3.5 px-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => toggleStock(product.id)}
                    className="bg-[#00030E] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl hover:bg-[#2C1B2F] transition"
                  >
                    {product.inStock ? 'Set Out of Stock' : 'Set In Stock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
