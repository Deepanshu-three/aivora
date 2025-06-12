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
  const [addresses, setAddressed] = useState<address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("/api/address");
      setAddressed(res.data.addresses);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load saved addresses.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      pincode: "",
      houseNo: "",
      area: "",
      city: "",
      state: "",
    },
  });

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address.");
      return;
    }
    // Here you would call your order placing API
    toast.success("Order placed successfully!");
    console.log("Placing order with address:", selectedAddressId);
  };

  const saveAddress = async (data: z.infer<typeof shippingAddressSchema>) => {
    try {
      await axios.post("/api/address", data);
      toast.success("Address saved successfully!");
      fetchAddresses();
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address.");
    }
  };

const handleDeleteAddress = async (id: string) => {
  try {
    await axios.delete(`/api/address/${id}`);
    toast.success("Address deleted successfully");
    fetchAddresses();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete address");
  }
};

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Cart Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images?.[0]?.url || "/placeholder.jpg"}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  ₹{item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    <Card>
  <CardHeader>
    <CardTitle>Select Saved Address</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {addresses.length > 0 ? (
      addresses.map((addr) => (
        <div
          key={addr.id}
          className={`relative p-4 border rounded-xl transition-colors duration-200 ${
            selectedAddressId === addr.id
              ? "border-blue-500 bg-blue-50"
              : "hover:border-gray-300"
          }`}
        >
          <div className="flex items-start gap-4">
            <input
              type="radio"
              name="selectedAddress"
              value={addr.id}
              checked={selectedAddressId === addr.id}
              onChange={() => setSelectedAddressId(addr.id)}
              className="mt-1 accent-blue-600"
            />
            <div className="flex-1 space-y-1">
              <p className="text-base font-semibold text-gray-900">{addr.fullName}</p>
              <p className="text-sm text-gray-600">
                {addr.houseNo}, {addr.area}
              </p>
              <p className="text-sm text-gray-600">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-sm text-gray-600">Phone: {addr.mobileNumber}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteAddress(addr.id)}
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-muted-foreground">No saved addresses found.</p>
    )}
  </CardContent>
</Card>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(saveAddress)}
                className="space-y-6 w-full"
              >
                <h2 className="text-2xl font-semibold text-center text-[#0C6170]">
                  Add New Address
                </h2>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Pincode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="houseNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House/Flat No.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your house or flat number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full Area" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Save Address
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{total > 1000 ? 0 : 60}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>   
              <span>₹{total > 1000 ? total : total + 60}</span>
            </div>
            <Button onClick={handlePlaceOrder} className="w-full mt-4">
              Proceed To Pay
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
