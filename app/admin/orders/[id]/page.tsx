"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [orderStatus, setOrderStatus] = useState("");
  const [orderTrackingId, setOrderTrackingId] = useState("");

 const fetchOrder = useCallback(async () => {
  setLoading(true);
  try {
    const res = await fetch(`/api/orders/${id}`);
    if (!res.ok) throw new Error("Failed to fetch order");
    const data = await res.json();
    setOrder(data.order);
    setOrderStatus(data.order.status);
    setOrderTrackingId(data.order.trackingId || "");
  } catch {
    toast.error("Error loading order");
  } finally {
    setLoading(false);
  }
}, [id]);

  useEffect(() => {
    if (id) {fetchOrder();}
  }, [id, fetchOrder]);

  const handleUpdateOrderStatus = async () => {
  try {
    await axios.put(`/api/orders/${id}/status`, {
      status: orderStatus,
      trackingId: orderStatus === "shipped" ? orderTrackingId : undefined,
    });

    toast.success("Order status updated");
    fetchOrder();
  } catch (error) {
    toast.error("Failed to update order status");
    console.log(error)
  }
};

  if (loading) return <Skeleton className="h-[400px] w-full rounded-xl" />;
  if (!order) return <p className="text-center mt-10 text-red-500">Order not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Order Details</h1>

      {/* Order Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">General Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Order ID:</strong> {order.id}</div>
          <div><strong>Status:</strong> <Badge>{order.status}</Badge></div>
          <div><strong>Total Amount:</strong> ₹{order.totalAmount}</div>
          <div><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</div>
        </CardContent>
      </Card>

      {/* Customer Info */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Customer</CardTitle></CardHeader>
        <CardContent>
          <p><strong>Name:</strong> {order.user?.name}</p>
          <p><strong>Email:</strong> {order.user?.email}</p>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Shipping Address</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {order.shipping?.fullName}</p>
          <p><strong>Phone:</strong> {order.shipping?.mobileNumber}</p>
          <p><strong>Address:</strong> {order.shipping?.houseNo}, {order.shipping?.area}</p>
          <p><strong>City/State:</strong> {order.shipping?.city}, {order.shipping?.state}</p>
          <p><strong>Pincode:</strong> {order.shipping?.pincode}</p>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Products</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {order.orderItems.map((item: any, i: number) => (
            <div key={i} className="flex justify-between">
              <span>{item.product.name} (x{item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Info */}
      {order.payment && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Payment Info</CardTitle></CardHeader>
          <CardContent>
            <p><strong>Method:</strong> {order.payment.paymentMethod}</p>
            <p><strong>Status:</strong> <Badge>{order.payment.paymentStatus}</Badge></p>
            <p><strong>Amount:</strong> ₹{order.payment.paymentAmount}</p>
            <p><strong>Date:</strong> {new Date(order.payment.paymentDate).toLocaleString()}</p>
          </CardContent>
        </Card>
      )}

      {/* Order Status Update */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Update Order Status</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          {orderStatus === "shipped" && (
            <Input
              placeholder="Tracking ID"
              value={orderTrackingId}
              onChange={(e) => setOrderTrackingId(e.target.value)}
            />
          )}
          <Button onClick={handleUpdateOrderStatus}>Update Order Status</Button>
        </CardContent>
      </Card>

      {/* Shipping Status Update */}
    </div>
  );
};

export default OrderDetailsPage;
