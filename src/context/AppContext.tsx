import React, { createContext, useContext, useState, ReactNode } from "react";
import { Car } from "@/data/cars";

export interface Order {
  id: string;
  car: Car;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "active" | "completed" | "cancelled";
  createdAt: Date;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface AppContextType {
  favorites: string[];
  orders: Order[];
  user: User | null;
  addToFavorites: (carId: string) => void;
  removeFromFavorites: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>({
    name: "Александр Петров",
    email: "alex@example.com",
    phone: "+7 (999) 123-45-67",
  });

  const addToFavorites = (carId: string) => {
    setFavorites((prev) => [...prev, carId]);
  };

  const removeFromFavorites = (carId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== carId));
  };

  const isFavorite = (carId: string) => favorites.includes(carId);

  const addOrder = (order: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        orders,
        user,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addOrder,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
