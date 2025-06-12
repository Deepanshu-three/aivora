"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import axios from "axios";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

type CartItemWithProduct = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images?: {
      id: string;
      url: string;
    }[];
  };
};

export default function Cart() {
  const [open, setOpen] = useState(false); // Default to closed
  const {
    cartItems,
    fetchCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    // Convert price to number (if it's string)
    const price =
      typeof item.product.price === "string"
        ? parseFloat(item.product.price)
        : item.product.price;

    return total + price * item.quantity;
  }, 0);

  return (
    <>
      {/* Toggle Cart Button */}
      <div className="p-4">
        <div className="relative inline-block">
          <Button onClick={() => setOpen(true)} variant="ghost">
            <ShoppingCartIcon className="w-5 h-5" />
          </Button>

          {cartCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full"
              variant="destructive"
            >
              {cartCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Cart Panel */}
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartItems.map(
                            (
                              productItem: CartItemWithProduct,
                              index: number
                            ) => (
                              <li key={productItem.id} className="flex py-6">
                                <div className="w-24 h-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt="product image"
                                    src={
                                      productItem.product.images?.[0]?.url ||
                                      "/placeholder.jpg"
                                    }
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link
                                          href={`/products/${productItem.product.id}`}
                                        >
                                          {productItem.product.name}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        {typeof productItem.product.price ===
                                        "number"
                                          ? productItem.product.price.toFixed(2)
                                          : productItem.product.price}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-500">
                                      <button
                                        type="button"
                                        className="px-2 py-1 border rounded cursor-pointer"
                                        onClick={() =>
                                          decrementQuantity(
                                            productItem.product.id
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <p>Qty {productItem.quantity}</p>
                                      <button
                                        type="button"
                                        className="px-2 py-1 border rounded cursor-pointer"
                                        onClick={() =>
                                          incrementQuantity(
                                            productItem.product.id
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() =>
                                          removeFromCart(productItem.product.id)
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{totalPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
