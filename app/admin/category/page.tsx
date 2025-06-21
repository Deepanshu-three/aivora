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
import { toast } from "sonner";

// Schema for category and subcategory
const addCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

const addSubcategorySchema = z.object({
  name: z.string().min(1, "Subcategory name is required"),
  categoryId: z.string().min(1, "Select a parent category"),
});

type Category = {
  id: string;
  name: string;
  description?: string | null;
};

export default function AddCategory() {
  const [categories, setCategories] = useState<Category[]>([]);

  const categoryForm = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const subcategoryForm = useForm<z.infer<typeof addSubcategorySchema>>({
    resolver: zodResolver(addSubcategorySchema),
    defaultValues: {
      name: "",
      categoryId: "",
    },
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onCategorySubmit = async () => {
    const data = categoryForm.getValues();
    try {
      const res = await axios.post("/api/category", data);
      toast.success(res.data.message || "Category created successfully");
      categoryForm.reset();
      fetchCategories();
    } catch (err) {
      toast.error("Error creating category");
    }
  };

  const onSubcategorySubmit = async () => {
    const data = subcategoryForm.getValues();
    try {
      const res = await axios.post("/api/subcategory", data);
      toast.success("Subcategory added successfully");
      subcategoryForm.reset();
      fetchCategories();
    } catch (err) {
      toast.error("Error creating subcategory");
    }
  };

  return (
    <div className="w-full mx-auto mt-10 max-w-2xl bg-white p-8 md:p-12 border border-[#0C6170] shadow-xl rounded-xl space-y-10 flex flex-col">
      {/* Category Form */}
      <Form {...categoryForm}>
        <form
          onSubmit={categoryForm.handleSubmit(onCategorySubmit)}
          className="space-y-6 w-full"
        >
          <h2 className="text-2xl font-semibold text-center text-[#0C6170]">
            Add New Category
          </h2>

          <FormField
            control={categoryForm.control}
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
            control={categoryForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Category Description (optional)"
                    {...field}
                  />
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

      {/* Subcategory Form */}
      <Form {...subcategoryForm}>
        <form
          onSubmit={subcategoryForm.handleSubmit(onSubcategorySubmit)}
          className="space-y-6 w-full"
        >
          <h2 className="text-2xl font-semibold text-center text-[#0C6170]">
            Add Subcategory
          </h2>

          <FormField
            control={subcategoryForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory Name</FormLabel>
                <FormControl>
                  <Input placeholder="Subcategory Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={subcategoryForm.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full p-2 border rounded bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Add Subcategory
          </Button>
        </form>
      </Form>

      {/* Existing categories list */}
      <div>
        <h3 className="text-xl font-semibold text-[#0C6170] mb-4">
          Existing Categories
        </h3>
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
                  <p className="text-gray-600 text-sm mt-1">
                    {category.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
