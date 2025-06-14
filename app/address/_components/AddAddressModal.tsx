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

// Modal Component with keyboard escape close support and focus trap could be added later if needed


type AddAddressModalProps = {
  onAddressAdded: () => void; // to notify parent to refresh product list
};

export default function AddAddressModal({
  onAddressAdded,
}: AddAddressModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const onSubmit = async (data: z.infer<typeof shippingAddressSchema>) => {
    try {
      await axios.post("/api/address", data);
      toast.success("Address saved successfully!");
      onAddressAdded();
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address.");
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Add New Address
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                    <Input placeholder="Enter your Mobile number" {...field} />
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
      </Modal>
    </>
  );
}
