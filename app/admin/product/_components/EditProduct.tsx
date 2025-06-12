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
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  brand?: string;
  manufacture?: string;
  dimensions?: string;
  weight?: string;
  title?: string;
  name: string;
  price: number;
  stock: number;
  addInfo: string;
  description: string;
  productImage?: string;
  category?: {
    id: string;
    name: string;
  };
};

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
  product: Product | null;
};

export default function EditProductModal({
  isOpen,
  onClose,
  onProductUpdated,
  product,
}: EditProductModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      addInfo: "",
      title: "",
      description: "",
      brand: "",
      dimensions: "",
      weight: "",
      manufacture: "",
      price: 0,
      stock: 0,
      productImages: [],
      category: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name || "",
        description: product.description || "",
        addInfo: product.addInfo || "",
        price: product.price || 0,
        stock: product.stock || 0,
        productImages: product.productImage ? [product.productImage] : [],
        category: product.category?.id || "",
        brand: product.brand || "",
        dimensions: product.dimensions || "",
        weight: product.weight || "",
        manufacture: product.manufacture || "",
        title: product.title || "",
      });
    }
  }, [product, form]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/category");
        setCategories(res.data.categories || res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async () => {
    setIsSubmitting(true);
    const data = form.getValues();

    try {
      let uploadedImageUrls: string[] = [];

      if (data.productImages && data.productImages.length > 0) {
        const imageFormData = new FormData();

        data.productImages.forEach((file: File) => {
          imageFormData.append("files", file); // name must match backend field
        });

        const imageUploadRes = await axios.post("/api/upload", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Assuming your backend returns an array of image URLs
        uploadedImageUrls = imageUploadRes.data.imageUrls;
      }

      const productPayload = {
        name: data.name,
        description: data.description,
        addInfo: data.addInfo,
        price: data.price,
        stock: data.stock,
        productImage: uploadedImageUrls,
        category: data.category,
        brand: data.brand,
        manufacture: data.manufacture,
        title: data.title,
        weight: data.weight,
        dimensions: data.dimensions,
      };

      if (product?.id) {
        await axios.put(`/api/products/${product.id}`, productPayload);
        toast.success("Product updated successfully");
      }

      onProductUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-[#0C6170]">
            Edit Product
          </h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product Title" {...field} />
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
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Product Brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manufacture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Manufacture</FormLabel>
                <FormControl>
                  <Input placeholder="Product Manufacture" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimensions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Dimensions</FormLabel>
                <FormControl>
                  <Input placeholder="Product Dimensions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Weight</FormLabel>
                <FormControl>
                  <Input placeholder="Product Dimensions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Info</FormLabel>
                <FormControl>
                  <Textarea placeholder="Additional Info" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Stock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border px-3 py-2 rounded-md"
                  >
                    <option value="">Select category</option>
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

          <FormField
            control={form.control}
            name="productImages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files : null)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Product"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
}
