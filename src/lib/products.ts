export type Category = "men" | "women" | "kids";

export type Product = {
  id: number;
  name: string;
  category: Category;
  price: string;
  tag?: string;
  image: string;
};

export const CATEGORY_LABELS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Structured Denim Jacket",
    category: "men",
    price: "$89",
    tag: "New",
    image: "/products/men-denim-jacket.jpg",
  },
  {
    id: 2,
    name: "Relaxed Fit Hoodie",
    category: "men",
    price: "$59",
    tag: "Bestseller",
    image: "/products/men-hoodie.webp",
  },
  {
    id: 3,
    name: "Tailored Chino Pants",
    category: "men",
    price: "$72",
    image: "/products/men-chinos.webp",
  },
  {
    id: 4,
    name: "Satin Wrap Dress",
    category: "women",
    price: "$109",
    tag: "Occasion",
    image: "/products/women-wrap-dress.webp",
  },
  {
    id: 5,
    name: "Everyday Linen Shirt",
    category: "women",
    price: "$64",
    image: "/products/women-linen-shirt.webp",
  },
  {
    id: 6,
    name: "High-Rise Wide Jeans",
    category: "women",
    price: "$79",
    tag: "Trending",
    image: "/products/women-wide-jeans.webp",
  },
  {
    id: 7,
    name: "Soft Cotton Hoodie",
    category: "kids",
    price: "$39",
    image: "/products/kids-hoodie.webp",
  },
  {
    id: 8,
    name: "Patterned Joggers",
    category: "kids",
    price: "$32",
    tag: "Play",
    image: "/products/kids-joggers.webp",
  },
  {
    id: 9,
    name: "Organic Logo Tee",
    category: "kids",
    price: "$24",
    image: "/products/kids-tee.webp",
  },
];

export const getProductById = (id: number) =>
  PRODUCTS.find((product) => product.id === id) ?? null;

