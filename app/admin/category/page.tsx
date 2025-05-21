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
import axios from "axios";
import { addCategorySchema } from "@/app/schema/addCategorySchema";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
  description?: string | null;
};

export default function AddCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error("Fetch categories error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async () => {
    const data = form.getValues();

    try {
      const categoryPayload = {
        name: data.name,
        description: data.description || "",
      };

      const res = await axios.post("/api/category", categoryPayload);
      toast.success(res.data.message || "Category saved successfully");
      form.reset();
      // Refresh the category list
      fetchCategories();
    } catch (error) {
      toast.error("Error creating category");
      console.error("Error uploading category", error);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 max-w-2xl bg-white p-8 md:p-12 border border-[#0C6170] shadow-xl rounded-xl space-y-8 flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <h2 className="text-2xl font-semibold text-center text-[#0C6170]">
            Add New Category
          </h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Category Description (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>
      </Form>

      {/* Existing categories list */}
      <div>
        <h3 className="text-xl font-semibold text-[#0C6170] mb-4">Existing Categories</h3>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <ul className="space-y-3 max-h-60 overflow-y-auto border border-gray-300 rounded-md p-4">
            {categories.map((category) => (
              <li
                key={category.id}
                className="p-3 border border-[#0C6170] rounded-md hover:bg-[#0C6170]/10 cursor-pointer"
                title={category.description || ""}
              >
                <strong>{category.name}</strong>
                {category.description && (
                  <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
