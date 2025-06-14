"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-green-50 via-white to-green-100 text-center">
      {/* Animated Tick Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-green-600"
      >
        <CheckCircle2 className="w-24 h-24 text-green-500 drop-shadow-lg" />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold mt-6 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Order Placed Successfully!
      </motion.h1>

      {/* Message Paragraphs */}
      <motion.p
        className="text-gray-600 mt-4 text-base md:text-lg max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Thank you for shopping with us. Your order is now being processed. You’ll receive a confirmation shortly.
      </motion.p>

      <motion.p
        className="text-gray-600 mt-2 text-sm md:text-base max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        You can track your order status from the <strong>My Orders</strong> page.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-6 flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link href="/myorders">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl shadow transition"
          >
            Go to My Orders
          </motion.button>
        </Link>

        <Link href="/">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-xl shadow transition"
          >
            Go to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
