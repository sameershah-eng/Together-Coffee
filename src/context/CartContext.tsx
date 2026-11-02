import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { MenuItem, formatPrice } from '../data/menu';

export interface CartOptionChoice {
  groupLabel: string;
  optionName: string;
  priceDelta: number;
}

export interface CartItem {
  cartItemId: string; // unique key combining item id and options
  menuItemId: string;
  name: string;
  unitPrice: number; // base price + options priceDelta
  quantity: number;
  image: string;
  options: CartOptionChoice[];
  specialInstructions?: string;
}

export type OrderType = 'Collection' | 'Dine in';

export interface CartState {
  items: CartItem[];
  orderType: OrderType;
  customerName: string;
  pickupTime: string;
  specialNotes: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: MenuItem; options: CartOptionChoice[]; quantity?: number; specialInstructions?: string } }
  | { type: 'UPDATE_QTY'; payload: { cartItemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { cartItemId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ORDER_TYPE'; payload: OrderType }
  | { type: 'SET_CUSTOMER_NAME'; payload: string }
  | { type: 'SET_PICKUP_TIME'; payload: string }
  | { type: 'SET_SPECIAL_NOTES'; payload: string }
  | { type: 'LOAD_STATE'; payload: CartState };

const STORAGE_KEY = 'together_coffee_cart_v1';

const initialState: CartState = {
  items: [],
  orderType: 'Collection',
  customerName: '',
  pickupTime: '',
  specialNotes: '',
};

function generateCartItemId(menuItemId: string, options: CartOptionChoice[]): string {
  const sortedOpts = [...options]
    .sort((a, b) => a.groupLabel.localeCompare(b.groupLabel))
    .map(o => `${o.groupLabel}:${o.optionName}`)
    .join('|');
  return `${menuItemId}_${sortedOpts}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'ADD_ITEM': {
      const { item, options, quantity = 1, specialInstructions } = action.payload;
      const optionsDelta = options.reduce((sum, opt) => sum + opt.priceDelta, 0);
      const unitPrice = item.price + optionsDelta;
      const cartItemId = generateCartItemId(item.id, options);

      const existingIndex = state.items.findIndex(i => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
          specialInstructions: specialInstructions || updatedItems[existingIndex].specialInstructions,
        };
        return { ...state, items: updatedItems };
      }

      const newItem: CartItem = {
        cartItemId,
        menuItemId: item.id,
        name: item.name,
        unitPrice,
        quantity,
        image: item.image,
        options,
        specialInstructions,
      };

      return { ...state, items: [...state.items, newItem] };
    }

    case 'UPDATE_QTY': {
      const { cartItemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(i => i.cartItemId !== cartItemId),
        };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartItemId === cartItemId ? { ...i, quantity } : i
        ),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(i => i.cartItemId !== action.payload.cartItemId),
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'SET_ORDER_TYPE':
      return { ...state, orderType: action.payload };

    case 'SET_CUSTOMER_NAME':
      return { ...state, customerName: action.payload };

    case 'SET_PICKUP_TIME':
      return { ...state, pickupTime: action.payload };

    case 'SET_SPECIAL_NOTES':
      return { ...state, specialNotes: action.payload };

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (item: MenuItem, options?: CartOptionChoice[], quantity?: number, specialInstructions?: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  setCustomerName: (name: string) => void;
  setPickupTime: (time: string) => void;
  setSpecialNotes: (notes: string) => void;
  getItemQuantity: (menuItemId: string) => number;
  getWhatsAppOrderUrl: () => string;
  lastAddedTime: number;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedTime, setLastAddedTime] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Safe localStorage read on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: 'LOAD_STATE', payload: parsed });
        }
      }
    } catch (e) {
      console.warn('Failed to read cart from localStorage', e);
    }
  }, []);

  // Safe localStorage write on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [state]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const addItem = (
    item: MenuItem,
    options: CartOptionChoice[] = [],
    quantity: number = 1,
    specialInstructions?: string
  ) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { item, options, quantity, specialInstructions },
    });
    setLastAddedTime(Date.now());
    setToastMessage(`Added "${item.name}" to cart`);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QTY', payload: { cartItemId, quantity } });
  };

  const removeItem = (cartItemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { cartItemId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setOrderType = (type: OrderType) => {
    dispatch({ type: 'SET_ORDER_TYPE', payload: type });
  };

  const setCustomerName = (name: string) => {
    dispatch({ type: 'SET_CUSTOMER_NAME', payload: name });
  };

  const setPickupTime = (time: string) => {
    dispatch({ type: 'SET_PICKUP_TIME', payload: time });
  };

  const setSpecialNotes = (notes: string) => {
    dispatch({ type: 'SET_SPECIAL_NOTES', payload: notes });
  };

  const getItemQuantity = (menuItemId: string): number => {
    return state.items
      .filter(i => i.menuItemId === menuItemId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  const getWhatsAppOrderUrl = (): string => {
    const lines = [
      `Hi Together Coffee! I'd like to place an order:`,
      ``,
      ...state.items.map(item => {
        const optsText = item.options.length > 0 
          ? ` (${item.options.map(o => o.optionName).join(', ')})`
          : '';
        const itemTotal = formatPrice(item.unitPrice * item.quantity);
        return `• ${item.quantity}× ${item.name}${optsText} – ${itemTotal}`;
      }),
      ``,
      `*Total: ${formatPrice(subtotal)}*`,
      `Order Type: ${state.orderType}${state.pickupTime ? ` (${state.pickupTime})` : ''}`,
      state.customerName ? `Name: ${state.customerName}` : '',
      state.specialNotes ? `Notes: ${state.specialNotes}` : '',
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/447778324873?text=${message}`;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        setOrderType,
        setCustomerName,
        setPickupTime,
        setSpecialNotes,
        getItemQuantity,
        getWhatsAppOrderUrl,
        lastAddedTime,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
