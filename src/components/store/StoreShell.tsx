"use client";

import type { FormEvent, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { getInitials, parsePrice } from "@/lib/store-utils";

import { useStore } from "./useStore";

type AuthMode = "login" | "signup";

const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M7.5 20.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm11 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
      className="fill-current"
    />
    <path
      d="M3.25 4.75a.75.75 0 0 0 0 1.5h1.57l1.54 8.47a1.75 1.75 0 0 0 1.73 1.46h9.12a1.75 1.75 0 0 0 1.7-1.33l1.28-5.3A1.25 1.25 0 0 0 20 8H8.21l-.3-1.66A1.75 1.75 0 0 0 6.2 4.75H3.25Z"
      className="fill-current"
    />
  </svg>
);

export function StoreShell({ children }: { children: ReactNode }) {
  const {
    user,
    cartLines,
    cartCount,
    cartSubtotal,
    login,
    logout,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);

  const checkoutDisabled = cartCount === 0;

  const openCheckout = () => {
    if (checkoutDisabled) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const placeOrder = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setIsCongratsOpen(true);
  };

  const handleAuthSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nameRaw = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!email) return;
    if (authMode === "signup" && !nameRaw) return;

    const fallbackName = email.split("@")[0]?.replace(/[._-]+/g, " ") || "User";
    const name = authMode === "signup" ? nameRaw : nameRaw || fallbackName;
    login({ name, email });
    setIsAuthOpen(false);
  };

  const cartLinesWithTotals = useMemo(() => {
    return cartLines.map((line) => ({
      ...line,
      total: parsePrice(line.product.price) * line.quantity,
    }));
  }, [cartLines]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-xs font-semibold text-slate-950 shadow-lg">
              AT
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-slate-50">
                Aurora Threads
              </p>
              <p className="text-xs text-slate-400">
                Everyday style for every body
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
              <Link
                href="/#products"
                className="rounded-full bg-white/5 px-4 py-1.5 text-xs tracking-wide text-slate-100 ring-1 ring-white/10 backdrop-blur hover:bg-white/10"
              >
                New Arrivals
              </Link>
              <Link
                href="/?category=men#products"
                className="text-slate-300 transition hover:text-emerald-300"
              >
                Men
              </Link>
              <Link
                href="/?category=women#products"
                className="text-slate-300 transition hover:text-emerald-300"
              >
                Women
              </Link>
              <Link
                href="/?category=kids#products"
                className="text-slate-300 transition hover:text-emerald-300"
              >
                Kids
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              {user ? (
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className="hidden h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[0.7rem] font-semibold text-slate-50 backdrop-blur transition hover:bg-white/10 sm:inline-flex"
                  aria-label="Open profile"
                  title={user.name}
                >
                  {getInitials(user.name)}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setIsAuthOpen(true);
                  }}
                  className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-50 backdrop-blur transition hover:bg-white/10 sm:inline-flex"
                >
                  Login
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-200 shadow-sm shadow-emerald-500/30 transition hover:bg-emerald-300 hover:text-slate-950"
                aria-label="Open cart"
              >
                <CartIcon className="h-3.5 w-3.5" />
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 text-[0.7rem] font-bold text-slate-950">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {children}

      {isAuthOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setIsAuthOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/70"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-50">
                  {authMode === "login" ? "Login" : "Sign up"}
                </p>
                <p className="text-xs text-slate-400">
                  Demo-only {authMode === "login" ? "login" : "signup"}. No
                  real account needed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthOpen(false)}
                className="rounded-full bg-white/5 p-1.5 text-xs text-slate-300 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 flex rounded-full bg-white/5 p-1 text-[0.7rem] font-medium text-slate-300">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 rounded-full px-3 py-1 ${
                  authMode === "login"
                    ? "bg-emerald-400 text-slate-950"
                    : "text-slate-300"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`flex-1 rounded-full px-3 py-1 ${
                  authMode === "signup"
                    ? "bg-emerald-400 text-slate-950"
                    : "text-slate-300"
                }`}
              >
                Sign up
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400"
                  required={authMode === "signup"}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400"
                  required
                />
              </div>
              {authMode === "signup" && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Confirm password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                    className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-emerald-400"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow shadow-emerald-500/40 hover:bg-emerald-300"
              >
                {authMode === "login" ? "Continue" : "Create account"} (demo)
              </button>
            </form>
          </div>
        </div>
      )}

      {isProfileOpen && user && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setIsProfileOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/70"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-50">Profile</p>
                <p className="text-xs text-slate-400">Demo profile.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="rounded-full bg-white/5 p-1.5 text-xs text-slate-300 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-sm font-semibold text-slate-950">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-50">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-400">{user.email}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-50 hover:bg-white/10"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                }}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow shadow-emerald-500/40 hover:bg-emerald-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-end bg-black/60"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="h-full w-full max-w-xs border-l border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/70 sm:max-w-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-50">Your bag</p>
                <p className="text-xs text-slate-400">
                  {cartCount === 0
                    ? "You haven’t added anything yet."
                    : `${cartCount} item${cartCount > 1 ? "s" : ""} in your bag.`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full bg-white/5 p-1.5 text-xs text-slate-300 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto pb-6">
              {cartLinesWithTotals.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Tap &quot;Add to bag&quot; on any product to see it here.
                </p>
              ) : (
                cartLinesWithTotals.map((line) => (
                  <div
                    key={line.product.id}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-50">
                          {line.product.name}
                        </p>
                        <p className="text-[0.7rem] text-slate-400">
                          {line.product.category === "men"
                            ? "Men"
                            : line.product.category === "women"
                              ? "Women"
                              : "Kids"}{" "}
                          · {line.product.price}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.product.id)}
                        className="rounded-full bg-white/5 px-2 py-1 text-[0.7rem] font-semibold text-slate-200 hover:bg-white/10"
                        aria-label="Remove item"
                        title="Remove"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(line.product.id, -1)}
                          disabled={line.quantity <= 1}
                          className="h-6 w-6 rounded-full bg-white/5 text-xs font-semibold text-slate-50 disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-5 text-center text-xs font-semibold text-slate-50">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(line.product.id, 1)}
                          className="h-6 w-6 rounded-full bg-white/5 text-xs font-semibold text-slate-50 hover:bg-white/10"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-emerald-200">
                        ${line.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-semibold text-slate-50">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={openCheckout}
                disabled={checkoutDisabled}
                className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow shadow-emerald-500/40 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Checkout (demo)
              </button>
            </div>
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setIsCheckoutOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/70"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-50">Checkout</p>
                <p className="text-xs text-slate-400">
                  Demo checkout — no payments are processed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="rounded-full bg-white/5 p-1.5 text-xs text-slate-300 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Items</span>
                <span className="font-semibold text-slate-50">{cartCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-semibold text-slate-50">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Account</span>
                <span className="font-semibold text-slate-50">
                  {user ? user.email : "Guest (demo)"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-50 hover:bg-white/10"
              >
                Back
              </button>
              <button
                type="button"
                onClick={placeOrder}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow shadow-emerald-500/40 hover:bg-emerald-300"
              >
                Place order (demo)
              </button>
            </div>
          </div>
        </div>
      )}

      {isCongratsOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setIsCongratsOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/70"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-50">
                  Congratulations!
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Your order has been placed successfully (demo).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCongratsOpen(false)}
                className="rounded-full bg-white/5 p-1.5 text-xs text-slate-300 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                <Image
                  src="/products/celebration.png"
                  alt="Order confirmation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-50">
                  Thanks for shopping with Aurora Threads.
                </p>
                <p className="text-[0.7rem] text-slate-400">
                  Want more? Browse the latest drops.
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                href="/#products"
                onClick={() => setIsCongratsOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow shadow-emerald-500/40 hover:bg-emerald-300"
              >
                Continue shopping
              </Link>
              <button
                type="button"
                onClick={() => setIsCongratsOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-50 hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

