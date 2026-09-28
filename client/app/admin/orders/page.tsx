'use client';

import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, Clock, Truck, Search, ShieldCheck } from 'lucide-react';
import { useStore } from '../../../lib/context/StoreContext';

interface MockOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  total: number;
  date: string;
  paymentStatus: 'PAID' | 'PENDING';
  orderStatus: 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  itemsCount: number;
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: '1',
    orderNumber: 'SS-849102',
    customerName: 'Elena Vance',
    email: 'eleanor@example.com',
    total: 102.00,
    date: 'Today, 09:15 AM',
    paymentStatus: 'PAID',
    orderStatus: 'PROCESSING',
    itemsCount: 2,
  },
  {
    id: '2',
    orderNumber: 'SS-739201',
    customerName: 'Sophia Miller',
    email: 'sophia@example.com',
    total: 54.00,
    date: 'Yesterday',
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    itemsCount: 1,
  },
  {
    id: '3',
    orderNumber: 'SS-628194',
    customerName: 'Camilla Chen',
    email: 'camilla@example.com',
    total: 156.00,
    date: '2 days ago',
    paymentStatus: 'PAID',
    orderStatus: 'DELIVERED',
    itemsCount: 3,
  },
];

export default function AdminOrdersPage() {
  const { showToast } = useStore();
  const [orders, setOrders] = useState<MockOrder[]>(MOCK_ORDERS);

  const updateOrderStatus = (id: string, newStatus: 'PROCESSING' | 'SHIPPED' | 'DELIVERED') => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          showToast(`Order ${o.orderNumber} updated to ${newStatus}`);
          return { ...o, orderStatus: newStatus };
        }
        return o;
      })
    );
  };

  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-[#B47A9A]/30 pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#00030E]">Customer Orders Manager</h1>
        <p className="text-xs text-[#5E3A5C]">View customer orders, verify payment status, and dispatch tracking</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#B47A9A]/30 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#B47A9A]/30 text-[#5E3A5C] uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Order #</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Fulfillment Status</th>
              <th className="py-3 px-3 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3E9EC]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[#F3E9EC]/50 transition">
                <td className="py-3.5 px-3 font-mono font-bold text-[#00030E]">{order.orderNumber}</td>
                <td className="py-3.5 px-3">
                  <p className="font-bold text-[#00030E]">{order.customerName}</p>
                  <p className="text-[10px] text-[#5E3A5C]">{order.email}</p>
                </td>
                <td className="py-3.5 px-3 text-[#2C1B2F]">{order.date}</td>
                <td className="py-3.5 px-3 font-serif font-bold text-[#00030E]">${order.total.toFixed(2)}</td>
                <td className="py-3.5 px-3">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    order.orderStatus === 'DELIVERED'
                      ? 'bg-blue-100 text-blue-800'
                      : order.orderStatus === 'SHIPPED'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className="bg-[#F3E9EC] border border-[#B47A9A]/30 rounded-xl px-2.5 py-1 font-bold text-xs text-[#00030E]"
                  >
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Mark Shipped</option>
                    <option value="DELIVERED">Mark Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
