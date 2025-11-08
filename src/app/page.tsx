"use client";

import { useQuery } from "@tanstack/react-query";


interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
}

export default function Home() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded shadow hover:shadow-lg transition"
        >
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
          <h2 className="mt-2 font-bold text-lg">{product.title}</h2>
          <p className="text-gray-600 mt-1">{product.description}</p>
          <p className="mt-2 font-semibold">${(product.price / 100).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
