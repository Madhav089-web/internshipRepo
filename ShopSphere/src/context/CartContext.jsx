import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const LOCAL_STORAGE_KEY = 'shopsphere_cart_items';

export const CartProvider = ({ children }) => {
  
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart items from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [lastOrderDetails, setLastOrderDetails] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart items to localStorage', e);
    }
  }, [cartItems]);

  
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.inStock) return;
    const addQty = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + addQty,
        };
        return updated;
      } else {
        return [...prevItems, { ...product, quantity: addQty }];
      }
    });

    showToast(`Added ${addQty}x "${product.name}" to your cart`);
  };

  
  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.name}" from cart`);
    }
  };

  
  const updateQuantity = (id, newQty) => {
    const qty = parseInt(newQty, 10);
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  
  const clearCart = () => {
    setCartItems([]);
    showToast('Cart cleared');
  };

  
  const getCartTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getShippingFee = () => {
    const subtotal = getCartTotal();
    if (cartItems.length === 0) return 0;
    return subtotal >= 100 ? 0 : 9.99;
  };

  const getGrandTotal = () => {
    return getCartTotal() + getShippingFee();
  };

  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  
  const openCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  
  const generateOrderNumber = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `ORD-2024-${randomDigits}`;
  };

  
  const placeOrder = (customerData) => {
    const newOrderNumber = generateOrderNumber();
    const orderData = {
      orderNumber: newOrderNumber,
      customer: customerData,
      items: [...cartItems],
      subtotal: getCartTotal(),
      shipping: getShippingFee(),
      grandTotal: getGrandTotal(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setOrderNumber(newOrderNumber);
    setLastOrderDetails(orderData);
    setOrderConfirmed(true);
    setIsCheckoutOpen(false);
    setCartItems([]); 
    showToast(`Order ${newOrderNumber} placed successfully!`);
  };

  
  const resetOrder = () => {
    setOrderConfirmed(false);
    setOrderNumber('');
    setLastOrderDetails(null);
  };

  const value = {
    cartItems,
    isCartOpen,
    isCheckoutOpen,
    orderConfirmed,
    orderNumber,
    lastOrderDetails,
    selectedProduct,
    isProductModalOpen,
    toastMessage,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getShippingFee,
    getGrandTotal,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    openProductModal,
    closeProductModal,
    placeOrder,
    resetOrder,
    showToast
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
