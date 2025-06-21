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
  subcategory?: {
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
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
      subcategory: "",
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
        subcategory: product.subcategory?.id || "",
        brand: product.brand || "",
        dimensions: product.dimensions || "",
        weight: product.weight || "",
        manufacture: product.manufacture || "",
        title: product.title || "",
      });

      if (product.category?.id) {
        setSelectedCategory(product.category.id);
        axios
          .get(`/api/subcategory?categoryId=${product.category.id}`)
          .then((res) => {
            setSubcategories(res.data.subcategories || res.data);
          })
          .catch((err) => console.error("Error fetching subcategories", err));
      }
    }
  }, [product, form]);

  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => setCategories(res.data.categories || res.data))
      .catch((error) => console.error("Failed to fetch categories", error));
  }, []);

  const onSubmit = async () => {
    setIsSubmitting(true);
    const data = form.getValues();

    try {
      let uploadedImageUrls: string[] = [];

      if (data.productImages && data.productImages.length > 0) {
        const imageFormData = new FormData();
        data.productImages.forEach((file: File) => {
          imageFormData.append("files", file);
        });

        const imageUploadRes = await axios.post("/api/upload", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

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
        subcategory: data.subcategory || null,
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

          {/* All existing form fields */}
          {/* ... */}

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
                    onChange={async (e) => {
                      const selected = e.target.value;
                      field.onChange(selected);
                      setSelectedCategory(selected);
                      try {
                        const res = await axios.get(
                          `/api/subcategory?categoryId=${selected}`
                        );
                        setSubcategories(res.data.subcategories || res.data);
                        form.setValue("subcategory", "");
                      } catch (err) {
                        console.error("Failed to fetch subcategories", err);
                        setSubcategories([]);
                      }
                    }}
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
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border px-3 py-2 rounded-md"
                    disabled={!selectedCategory || subcategories.length === 0}
                  >
                    <option value="">Select subcategory</option>
                    {subcategories.map((subcat) => (
                      <option key={subcat.id} value={subcat.id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
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
