"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Modal } from "@/components/Modal";
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
        className="w-full py-6 text-lg text-white rounded-xl cursor-pointer"
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
            className="w-full py-6 text-lg cursor-pointer text-white rounded-xl"
          >
            Place Order
          </Button>
        </div>
      </Modal>
    </>
  );
}
