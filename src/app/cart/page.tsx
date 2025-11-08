"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";

export default function CartPage() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartItems.length === 0)
        return <p className="p-8 text-center text-gray-600">Your cart is empty.</p>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border p-4 rounded">
                        <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                        <div className="flex-1 ml-4">
                            <h2 className="font-semibold">{item.title}</h2>
                            <p className="text-gray-600">${(item.price / 100).toFixed(2)}</p>
                            <div className="flex items-center mt-2 space-x-2">
                                <button
                                    className="px-2 bg-gray-200 rounded"
                                    onClick={() =>
                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                                    }
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="px-2 bg-gray-200 rounded"
                                    onClick={() =>
                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            className="text-red-500 font-semibold"
                            onClick={() => dispatch(removeFromCart(item.id))}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-bold">Total: ${(total / 100).toFixed(2)}</p>
                <div className="space-x-4">
                    <button
                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => dispatch(clearCart())}
                    >
                        Clear Cart
                    </button>
                    <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
