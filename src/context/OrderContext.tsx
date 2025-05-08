import { createContext, useState, useContext, ReactNode } from 'react';
import { OrderItem } from '../types/types';
import { mockOrders } from '../data/mockData';

interface OrderContextType {
  orders: OrderItem[];
  addOrder: (order: OrderItem) => void;
  getNextOrderCode: (orderName: string) => string;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);

  const getNextOrderCode = (orderName: string) => {
    let prefix: string;
    let counter: number = 1;
    
    switch(orderName) {
      case 'Bone graft':
      case 'boneGraft':
        prefix = 'BG';
        break;
      case 'รักษารากฟัน':
      case 'rootCanal':
        prefix = 'RT';
        break;
      case 'ผ่าตัดเหงือก':
      case 'gumSurgery':
        prefix = 'GS';
        break;
      default:
        prefix = 'OR';
    }
    
    // Find highest existing counter for this prefix
    const existingCodes = orders
      .filter(order => order.code.startsWith(prefix))
      .map(order => {
        const numPart = order.code.substring(prefix.length);
        return parseInt(numPart, 10);
      })
      .filter(num => !isNaN(num));
    
    if (existingCodes.length > 0) {
      counter = Math.max(...existingCodes) + 1;
    }
    
    // Format with leading zeros (e.g., BG001)
    return `${prefix}${counter.toString().padStart(3, '0')}`;
  };

  const addOrder = (order: OrderItem) => {
    setOrders([...orders, order]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getNextOrderCode }}>
      {children}
    </OrderContext.Provider>
  );
};