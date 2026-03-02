"use client";

import type { ReactNode } from "react";
import { createContext, useEffect, useMemo, useState } from "react";

import type { Product } from "@/lib/products";
import { parsePrice } from "@/lib/store-utils";

export type User = {
  name: string;
  email: string;
};

export type CartLine = {
  product: Product;
  quantity: number;
};

type StoreContextValue = {
  user: User | null;
  cartLines: CartLine[];
  cartCount: number;
  cartSubtotal: number;
  login: (user: User) => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = "aurora_threads_store_v1";

const safeParseJson = (raw: string) => {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setHydrated(true);
      return;
    }

    const parsed = safeParseJson(raw);
    if (!parsed || typeof parsed !== "object") {
      setHydrated(true);
      return;
    }

    const obj = parsed as { user?: unknown; cartLines?: unknown };

    if (
      obj.user &&
      typeof obj.user === "object" &&
      typeof (obj.user as any).name === "string" &&
      typeof (obj.user as any).email === "string"
    ) {
      setUser({ name: (obj.user as any).name, email: (obj.user as any).email });
    }

    if (Array.isArray(obj.cartLines)) {
      const normalized = obj.cartLines
        .filter(Boolean)
        .map((line: any) => {
          const qty = Number(line?.quantity);
          const product = line?.product as Product | undefined;
          if (!product || typeof product.id !== "number") return null;
          return { product, quantity: Number.isFinite(qty) ? Math.max(1, qty) : 1 };
        })
        .filter(Boolean) as CartLine[];
      setCartLines(normalized);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user,
        cartLines,
      }),
    );
  }, [user, cartLines, hydrated]);

  const cartCount = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.quantity, 0),
    [cartLines],
  );

  const cartSubtotal = useMemo(() => {
    return cartLines.reduce((sum, line) => {
      return sum + parsePrice(line.product.price) * line.quantity;
    }, 0);
  }, [cartLines]);

  const value = useMemo<StoreContextValue>(
    () => ({
      user,
      cartLines,
      cartCount,
      cartSubtotal,
      login: (nextUser) => setUser(nextUser),
      logout: () => setUser(null),
      addToCart: (product) => {
        setCartLines((prev) => {
          const existingIndex = prev.findIndex(
            (line) => line.product.id === product.id,
          );
          if (existingIndex === -1) return [...prev, { product, quantity: 1 }];
          return prev.map((line, index) =>
            index === existingIndex
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          );
        });
      },
      updateCartQuantity: (productId, delta) => {
        setCartLines((prev) =>
          prev
            .map((line) =>
              line.product.id === productId
                ? { ...line, quantity: Math.max(1, line.quantity + delta) }
                : line,
            )
            .filter((line) => line.quantity > 0),
        );
      },
      removeFromCart: (productId) => {
        setCartLines((prev) =>
          prev.filter((line) => line.product.id !== productId),
        );
      },
      clearCart: () => setCartLines([]),
    }),
    [user, cartLines, cartCount, cartSubtotal],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

