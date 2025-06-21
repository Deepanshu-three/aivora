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

// Modal Component with keyboard escape close support and focus trap could be added later if needed

type Category = {
  id: string;
  name: string;
  description?: string;
};

type AddProductModalProps = {
  onProductAdded: () => void; // to notify parent to refresh product list
};

export default function AddProductModal({
  onProductAdded,
}: AddProductModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subcategories, setSubcategories] = useState<Category[]>([]); // or a specific SubCategory type
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

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
      material: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/category"); // Adjust URL as needed
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
        description: data.description || "",
        addInfo: data.addInfo || "",
        price: data.price,
        stock: data.stock,
        productImages: uploadedImageUrls,
        category: data.category,
        subCategory: selectedSubCategory || "", // ✅ Include this
        brand: data.brand,
        manufacture: data.manufacture,
        title: data.title,
        dimensions: data.dimensions,
        weight: data.weight,
        material: data.material,
      };

      await axios.post("/api/products", productPayload);

      form.reset();
      onProductAdded();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading product", error);
      // toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = async (
  e: React.ChangeEvent<HTMLSelectElement>,
  onChange: (value: string) => void
) => {
  const selected = e.target.value;
  onChange(selected);
  setSelectedCategory(selected);

  try {
    const res = await axios.get(`/api/subcategory?categoryId=${selected}`);
    setSubcategories(res.data.subcategories || []);
  } catch (err) {
    console.error("Failed to fetch subcategories", err);
    setSubcategories([]);
  }
};


  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Add New Product
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <h2 className="text-2xl font-semibold text-center text-[#0C6170]">
              Add New Product
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
                    <Textarea placeholder="Product Description" {...field} />
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
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Material</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Material" {...field} />
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
                    <Textarea placeholder="Additional information" {...field} />
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
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? 0 : parseFloat(val));
                        }}
                      />
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
                      <Input
                        type="number"
                        placeholder="Stock quantity"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? 0 : parseInt(val, 10));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="productImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        field.onChange(files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           <FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <FormControl>
        <select
          {...field}
          className="w-full border border-gray-300 rounded px-3 py-2"
          onChange={(e) => handleCategoryChange(e, field.onChange)} // ✅ Clean
        >
          <option value="" disabled>
            Select a category
          </option>
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
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={!selectedCategory || subcategories.length === 0}
          onChange={(e) => {
            field.onChange(e.target.value); // update form state
            setSelectedSubCategory(e.target.value); // update local state if needed
          }}
        >
          <option value="">Select a subcategory</option>
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


            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </Form>
      </Modal>
    </>
  );
}
