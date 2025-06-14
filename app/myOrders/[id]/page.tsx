"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OrderItem {
  product: {
    name: string;
    price: number;
    images: { url: string }[];
  };
  quantity: number;
  price: number;
}

interface Shipping {
  fullName: string;
  mobileNumber: string;
  pincode: string;
  houseNo: string;
  area: string;
  city: string;
  state: string;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  trackingId?: string;
  createdAt: string;
  orderItems: OrderItem[];
  user: {
    name: string;
    email: string;
  };
  shipping?: Shipping;
}

const OrderDetailsPage = () => {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}/details`);
      const data = await res.json();
      setOrder(data.order);
    } catch (error) {
      console.error("Failed to fetch order", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-64 w-96 rounded-xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Order not found or something went wrong.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <Link href="/myOrders" className="text-sm text-gray-600 hover:text-black">
            <ArrowLeft className="inline-block mr-1 h-4 w-4" />
            Back to Orders
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Order #{order.id}
            </CardTitle>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
              <div>
                Status:{" "}
                <Badge variant="outline" className="capitalize">
                  {order.status}
                </Badge>
              </div>
              <div>
                Payment:{" "}
                <Badge variant="outline" className="capitalize">
                  {order.paymentStatus}
                </Badge>
              </div>
              {order.trackingId && (
                <div>
                  Tracking ID:{" "}
                  <span className="font-medium">{order.trackingId}</span>
                </div>
              )}
              <div>
                Date:{" "}
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* User Details */}
            <div className="border p-4 rounded-md bg-white shadow-sm">
              <h2 className="text-lg font-medium mb-2">Customer Details</h2>
              <p className="text-sm text-gray-700">Name: {order.user.name}</p>
              <p className="text-sm text-gray-700">Email: {order.user.email}</p>
            </div>

            {/* Shipping Info */}
            {order.shipping && (
              <div className="border p-4 rounded-md bg-white shadow-sm">
                <h2 className="text-lg font-medium mb-2">Shipping Address</h2>
                <p className="text-sm text-gray-700">{order.shipping.fullName}</p>
                <p className="text-sm text-gray-700">
                  {order.shipping.houseNo}, {order.shipping.area}
                </p>
                <p className="text-sm text-gray-700">
                  {order.shipping.city}, {order.shipping.state} -{" "}
                  {order.shipping.pincode}
                </p>
                <p className="text-sm text-gray-700">
                  Phone: {order.shipping.mobileNumber}
                </p>
              </div>
            )}

            {/* Ordered Items */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Items</h2>
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border p-4 rounded-md bg-white shadow-sm"
                >
                  <img
                    src={item.product.images[0]?.url || "/placeholder.jpg"}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="text-base font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-end pt-4 border-t">
              <p className="text-lg font-semibold text-gray-900">
                Total: ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
