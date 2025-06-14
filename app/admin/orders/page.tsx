// File: app/admin/orders/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Order = {
  id: string;
  status: string;
  createdAt: string;
  totalAmount: string
  user: { name: string };
  orderItems: {
    quantity: number;
    product: { name: string };
  }[];
};

const PAGE_LIMIT = 10;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchOrders = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?page=${pageNumber}&limit=${PAGE_LIMIT}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table className="w-full min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No orders found.</TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>Rs. {order.totalAmount}</TableCell>
                <TableCell>
                  <span className={`rounded px-2 py-1 text-sm font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "delivered"
                      ? "bg-green-200 text-green-800"
                      : order.status === "shipped"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-gray-200 text-gray-800"
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                  >
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
        <span>Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
        <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
      </div>
    </div>
  );
}
