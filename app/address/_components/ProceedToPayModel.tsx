"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/app/schema/addProductSchama";
import axios from "axios";
import { Modal } from "@/components/Modal";
import { shippingAddressSchema } from "@/app/schema/addAddressSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Modal Component with keyboard escape close support and focus trap could be added later if needed

type AddProductModalProps = {
  addressId: string | null;
  // to notify parent to refresh product list
};

export default function ProceedToPayModel({ addressId }: AddProductModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<
    "razorpay" | "cod" | ""
  >("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (addressId == null) {
      toast.error("Please select a shipping address.");
      return;
    }

    setIsModalOpen(true);
  };

  const onPay = () => {
    if (addressId == null) {
      toast.error("Please select a shipping address.");
      return;
    }

    router.push(`/placingorder?addId=${addressId}&mode=${selectedPayment}`);

  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="w-full py-6 text-lg bg-[#0C6170] hover:bg-[#09525c] text-white rounded-xl"
      >
        Proceed to Pay
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-6 p-6">
          <h2 className="text-2xl font-semibold text-center text-[#0C6170]">
            Choose Payment Method
          </h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={selectedPayment === "razorpay"}
                onChange={() => setSelectedPayment("razorpay")}
                className="accent-blue-600"
              />
              <span className="text-lg">Pay with Razorpay</span>
            </label>

            <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={selectedPayment === "cod"}
                onChange={() => setSelectedPayment("cod")}
                className="accent-green-600"
              />
              <span className="text-lg">Cash on Delivery</span>
            </label>
          </div>

          <Button
            type="button"
            onClick={onPay}
            className="w-full py-6 text-lg bg-[#0C6170] hover:bg-[#09525c] text-white rounded-xl"
          >
            Place Order
          </Button>
        </div>
      </Modal>
    </>
  );
}
