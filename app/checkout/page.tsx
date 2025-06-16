"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { shippingAddressSchema } from "../schema/addAddressSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import Script from "next/script";
import { createOrder } from "../util/createOrder";
import { useRouter } from "next/navigation";

type address = {
  id: string;
  fullName: string;
  mobileNumber: string;
  pincode: string;
  houseNo: string;
  area: string;
  city: string;
  state: string;
  userId: string;
};

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const router = useRouter()

  return (
    <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto min-h-screen">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Summary - Left */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Cart Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.product.images?.[0]?.url || "/placeholder.jpg"
                        }
                        alt={item.product.name}
                        className="w-20 h-20 rounded-md object-cover border"
                      />
                      <div>
                        <h4 className="font-medium text-lg">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-right">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary - Right */}
        <div className="w-full lg:w-[380px]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span>₹{total > 1000 ? 0 : 60}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>₹{total > 1000 ? total : total + 60}</span>
              </div>
              <Button
                onClick={() => {router.push("/address")}}
                className="w-full mt-4 text-lg py-6"
              >
                Proceed to Pay
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
