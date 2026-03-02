"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Category, Product } from "@/lib/products";
import { CATEGORY_LABELS, PRODUCTS } from "@/lib/products";
import { useStore } from "@/components/store/useStore";

type CategoryFilter = "all" | Category;

const categoryFromSearch = (value: string | null): CategoryFilter => {
  if (value === "men" || value === "women" || value === "kids") return value;
  return "all";
};

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useStore();

  const activeCategory = categoryFromSearch(searchParams.get("category"));

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return PRODUCTS;
    return PRODUCTS.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: CategoryFilter) => {
    const href =
      category === "all"
        ? "/#products"
        : `/?category=${encodeURIComponent(category)}#products`;
    router.push(href);
  };

  const handleAddToBag = (event: React.MouseEvent, product: Product) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
              New season · SS26
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Curated looks for{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
                men, women, & kids
              </span>
              .
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Build a wardrobe that works around you. Premium fabrics, relaxed
              silhouettes, and elevated essentials designed to move from work to
              weekend without missing a beat.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#products"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:translate-y-0.5 hover:bg-emerald-300"
              >
                Shop the collection
              </Link>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-50 backdrop-blur transition hover:bg-white/10"
              >
                Explore lookbook
              </Link>
              <p className="text-xs text-slate-400 sm:ml-2">
                Free delivery over $80 · Easy returns
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-sky-500/10 to-fuchsia-500/10 blur-3xl" />
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/50 backdrop-blur-md sm:grid-cols-2 sm:p-5">
              <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Men
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">
                    Layers built to last
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  Tailored outerwear, smart casual shirts, and everyday denim.
                </p>
              </div>
              <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-br from-fuchsia-700 via-rose-500 to-amber-400 p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-rose-100">
                    Women
                  </p>
                  <p className="mt-1 text-sm font-semibold text-rose-50">
                    Effortless silhouettes
                  </p>
                </div>
                <p className="text-xs text-rose-100/90">
                  Statement dresses, elevated basics, and refined accessories.
                </p>
              </div>
              <div className="flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-400 to-lime-400 p-4 sm:col-span-2">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-950/80">
                      Kids
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-950">
                      Playproof comfort
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-950/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-950">
                    Cotton-rich
                  </span>
                </div>
                <p className="text-xs text-slate-900/80">
                  Colorful sets and soft layers built for every playground
                  adventure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mt-14 space-y-6 sm:mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                Discover your next staple
              </h2>
              <p className="mt-1 max-w-md text-xs text-slate-400 sm:text-sm">
                Browse handpicked pieces for men, women, and kids. Tap any card
                to open product details.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>In-stock and ready to ship</span>
            </div>
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1 text-xs sm:text-sm">
            {CATEGORY_LABELS.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={[
                    "whitespace-nowrap rounded-full px-4 py-1.5 font-medium transition",
                    isActive
                      ? "bg-emerald-400 text-slate-950 shadow shadow-emerald-500/40"
                      : "text-slate-200 hover:bg-white/10",
                  ].join(" ")}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-md shadow-black/40 transition hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-emerald-500/30"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950/40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={product.id <= 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-2 text-[0.7rem]">
                    <span className="rounded-full bg-black/35 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-100 backdrop-blur">
                      {product.category === "men"
                        ? "Men"
                        : product.category === "women"
                          ? "Women"
                          : "Kids"}
                    </span>
                    {product.tag && (
                      <span className="rounded-full bg-white/85 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-sm">
                        {product.tag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tap to view details, sizing, and style notes.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-emerald-300">
                      {product.price}
                    </p>
                    <button
                      type="button"
                      onClick={(event) => handleAddToBag(event, product)}
                      className="rounded-full border border-emerald-300/50 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200 transition group-hover:bg-emerald-300 group-hover:text-slate-950"
                    >
                      Add to bag
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Aurora Threads. For demo use only.</p>
          <p className="text-[0.7rem]">
            Built with Next.js, React Compiler, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </>
  );
}

