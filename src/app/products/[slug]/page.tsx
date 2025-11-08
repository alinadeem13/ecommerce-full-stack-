"use client";

import { addToCart } from "@/store/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";

interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    createdAt: string;
}

export default function ProductPage() {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useDispatch();


    const { data, isLoading, error } = useQuery<Product>({
        queryKey: ["product", slug],
        queryFn: async () => {
            const res = await fetch(`/api/products/${slug}`);
            if (!res.ok) throw new Error("Failed to fetch product");
            return res.json();
        },
    });

    if (isLoading) return <p className="p-8 text-center">Loading product...</p>;
    if (error || !data)
        return <p className="p-8 text-center text-red-500">Product not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <img
                    src={data.image}
                    alt={data.title}
                    className="rounded-lg shadow-md w-full h-80 object-cover"
                />
                <div>
                    <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
                    <p className="text-gray-600 mb-4">{data.description}</p>
                    <p className="text-2xl font-semibold mb-6">
                        ${(data.price / 100).toFixed(2)}
                    </p>
                    <button
                        onClick={() =>
                            dispatch(
                                addToCart({
                                    id: data.id,
                                    title: data.title,
                                    price: data.price,
                                    image: data.image,
                                    slug: data.slug,
                                    quantity: 1,
                                })
                            )
                        }
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
