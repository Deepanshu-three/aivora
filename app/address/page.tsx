"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import axios from "axios";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import AddAddressModal from "./_components/AddAddressModal";
import ProceedToPayModal from "./_components/ProceedToPayModel";

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

const AddressPage = () => {
  const { cartItems } = useCart();
  const [addresses, setAddressed] = useState<address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );


  const router = useRouter();

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

  const saveAddress = async () => {
    fetchAddresses();
    router.refresh();
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
    <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto min-h-screen">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Address Section */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Select Saved Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
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
                        <p className="text-base font-semibold text-gray-900">
                          {addr.fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.houseNo}, {addr.area}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-sm text-gray-600">
                          Phone: {addr.mobileNumber}
                        </p>
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
                <p className="text-muted-foreground">
                  No saved addresses found.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <AddAddressModal
              onAddressAdded={saveAddress}
            />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-[420px]">
          <Card className="h-fit shadow-xl">
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
              <ProceedToPayModal
                addressId={selectedAddressId}
                
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
