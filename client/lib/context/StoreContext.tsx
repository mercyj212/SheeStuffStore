'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductShade } from '../types';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  quickViewProduct: Product | null;
  toasts: Toast[];
  discountCode: string;
  discountPercentage: number;
  
  // Actions
  addToCart: (product: Product, quantity?: number, shade?: ProductShade) => void;
  removeFromCart: (productId: string, shadeName?: string) => void;
  updateQuantity: (productId: string, quantity: number, shadeName?: string) => void;
  clearCart: () => void;
  
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  
  showToast: (message: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;
  
  cartSubtotal: number;
  cartTotal: number;
  totalCartItems: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // LocalStorage Persistence
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sheestuff_cart');
      const savedWishlist = localStorage.getItem('sheestuff_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Error loading stored state', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sheestuff_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sheestuff_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, shade?: ProductShade) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedShade?.name === shade?.name
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedShade: shade || product.shades?.[0] }];
      }
    });

    showToast(`Added ${product.name} to your cart! ✨`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, shadeName?: string) => {
    setCart((prev) => 
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedShade?.name === shadeName)
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, shadeName?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, shadeName);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedShade?.name === shadeName) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist ❤️`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const applyDiscountCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SHEE15' || cleanCode === 'GLOW15' || cleanCode === 'WELCOME15') {
      setDiscountCode(cleanCode);
      setDiscountPercentage(15);
      showToast('🎉 Promo code SHEE15 applied! 15% OFF your order.');
      return true;
    } else if (cleanCode === 'SHEE20') {
      setDiscountCode(cleanCode);
      setDiscountPercentage(20);
      showToast('🌟 Special code applied! 20% OFF your order.');
      return true;
    } else {
      showToast('Invalid discount code. Try SHEE15 for 15% off!', 'info');
      return false;
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setDiscountPercentage(0);
    showToast('Discount code removed', 'info');
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartTotal = cartSubtotal * (1 - discountPercentage / 100);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        quickViewProduct,
        toasts,
        discountCode,
        discountPercentage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsWishlistOpen,
        setQuickViewProduct,
        applyDiscountCode,
        removeDiscountCode,
        showToast,
        removeToast,
        cartSubtotal,
        cartTotal,
        totalCartItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
