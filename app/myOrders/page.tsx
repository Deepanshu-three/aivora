"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems: {
    product: {
      name: string;
      images: {
        url: string;
      }[];
    };
  }[];
}

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

const fetchOrders = async () => {
  try {
    const res = await axios.get("/api/orders/user");
    setOrders(res.data.orders);
  } catch (error) {
    console.error("Failed to fetch orders", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (loading) return <Skeleton className="h-48 w-full rounded-xl" />;

  if (orders.length === 0)
    return <p className="text-center text-gray-500 mt-20">You haven't placed any orders yet.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const firstItem = order.orderItems[0];
          const imageUrl = firstItem?.product.images[0]?.url || "/placeholder.jpg";

          return (
            <Link key={order.id} href={`/myOrders/${order.id}`}>
              <Card className="hover:shadow-lg transition rounded-xl cursor-pointer my-4">
                <div className="flex items-center p-4 gap-4">
                  <img
                    src={imageUrl}
                    alt="Product"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg font-medium">
                      {firstItem?.product.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Order ID: <span className="text-gray-500">{order.id}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Placed on:{" "}
                      <span className="text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="outline"
                      className="capitalize border-gray-300 text-gray-700"
                    >
                      {order.status}
                    </Badge>
                    <p className="text-sm font-semibold text-gray-800">
                      ₹{order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrdersPage;
