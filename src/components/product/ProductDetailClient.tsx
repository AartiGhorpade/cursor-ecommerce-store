"use client";

import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/products";
import { useStore } from "@/components/store/useStore";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useStore();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <div className="flex items-center justify-between">
        <Link
          href="/#products"
          className="text-xs font-semibold text-slate-300 hover:text-emerald-300"
        >
          ← Back to products
        </Link>
        <p className="text-xs text-slate-500">Product #{product.id}</p>
      </div>

      <section className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/50">
          <div className="relative aspect-[4/3] w-full bg-slate-950/40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-[0.7rem]">
            <span className="rounded-full bg-white/5 px-2 py-0.5 font-semibold uppercase tracking-[0.16em] text-slate-200 ring-1 ring-white/10">
              {product.category}
            </span>
            {product.tag && (
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-semibold uppercase tracking-[0.16em] text-emerald-200 ring-1 ring-emerald-400/30">
                {product.tag}
              </span>
            )}
          </div>

          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              A premium demo product page. In a real store, you’d see fit notes,
              fabric details, size guide, and delivery info here.
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-xs text-slate-400">Price</p>
              <p className="text-2xl font-semibold text-emerald-300">
                {product.price}
              </p>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow shadow-emerald-500/40 hover:bg-emerald-300"
            >
              Add to bag
            </button>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Materials
              </p>
              <p className="mt-1 text-sm">Soft-touch blend (demo)</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Care
              </p>
              <p className="mt-1 text-sm">Cold wash, low heat (demo)</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Shipping
              </p>
              <p className="mt-1 text-sm">Free over $80 (demo)</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Returns
              </p>
              <p className="mt-1 text-sm">30 days (demo)</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

