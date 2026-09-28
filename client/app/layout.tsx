import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '../lib/context/StoreContext';
import ToastContainer from '../components/ToastContainer';
import CartDrawer from '../components/CartDrawer';
import WishlistDrawer from '../components/WishlistDrawer';
import ProductQuickViewModal from '../components/ProductQuickViewModal';

export const metadata: Metadata = {
  title: 'SheeStuff Store | Luxury Cosmetics, Skincare & Beauty Formulas',
  description: 'Discover clinical-grade botanical skincare, vitamin C radiance serums, ceramide barrier moisturizers, and silk lip butters. Cruelty-free & dermatologist approved.',
  keywords: ['skincare', 'cosmetics', 'serum', 'vitamin c', 'beauty', 'sheestuff', 'moisturizer', 'lip balm', 'sunscreen'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-rose-gold selection:text-white">
        <StoreProvider>
          {children}
          <CartDrawer />
          <WishlistDrawer />
          <ProductQuickViewModal />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
