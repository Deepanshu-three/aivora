"use client";

import { useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import Script from "next/script";


export default function PlacingOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addressId = searchParams.get("addId");
  const mode = searchParams.get("mode");

  const { clearCart } = useCart();
  // 🔁 Get current userId (replace this with actual logic if using Clerk/Auth)

  useEffect(() => {
    const placeOrder = async () => {
      if (!addressId || !mode) {
        toast.error("Missing order information.");
        router.push("/");
        return;
      }

      if (mode === "cod") {
        try {
          const res = await axios.post("/api/placeOrder", {
            addressId,
            paymentMode: "cod",
          });

          if (res.data.success) {
            toast.success("Order placed successfully!");
            router.push("/orderSuccessfull");
            clearCart();
          } else {
            toast.error("Failed to place order.");
            router.push("/");
          }
        } catch (error) {
          toast.error("Something went wrong.");
          router.push("/");
          console.log(error)
        }
      } else if (mode === "razorpay") {
        try {
          const res = await axios.get("/api/createOrder");
          const apiData = res.data;

          if (
            apiData.error ||
            !apiData.id ||
            !apiData.amount ||
            !apiData.currency
          ) {
            toast.error("Error initializing Razorpay order");
            router.push("/checkout");
            return;
          }

          const razorpay = new (window as any).Razorpay({
            key: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID,
            amount: apiData.amount,
            currency: apiData.currency,
            name: "Aivore",
            description: "Transaction for creating the order",
            order_id: apiData.id,
            handler: async function (response: {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            }) {
              try {
                // Step 1: Verify payment
                const verifyRes = await axios.post("/api/verifyOrder", {
                  orderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  amount: apiData.amount,
                });

                if (!verifyRes.data.isOk) {
                  toast.error("Payment verification failed.");
                  router.push("/checkout");
                  return;
                }

                // Step 2: Place order
                const placeOrder = await axios.post("/api/placeOrder", {
                  addressId,
                  paymentMode: "razorpay",
                  transactionId: response.razorpay_payment_id,
                });

                if (placeOrder.data.success) {
                  toast.success("Order placed successfully!");
                  router.push("/orderSuccessfull");
                } else {
                  toast.error("Order placement failed after payment.");
                  router.push("/checkout");
                }
              } catch (err) {
                console.error(err);
                toast.error("Verification or order placement failed.");
                router.push("/checkout");
              }
            },
            prefill: {
              name: apiData.name || "",
              email: apiData.email || "",
              contact: apiData.contact || "",
            },
            theme: {
              color: "#3399cc",
            },
            modal: {
              ondismiss: () => {
                toast.info("Payment popup closed.");
                router.push("/checkout");
              },
            },
          });

          razorpay.open();
        } catch (error) {
          console.error("Error creating Razorpay order:", error);
          toast.error("Something went wrong while creating Razorpay order.");
          router.push("/checkout");
        }
      }
    };

    placeOrder();
  }, [addressId, mode, router]);

  if (mode !== "cod" && mode !== "razorpay") {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <h1 className="text-lg font-medium mb-4">Placing your Order...</h1>
      <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
