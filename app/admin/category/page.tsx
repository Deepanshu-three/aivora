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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const addCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

const addSubcategorySchema = z.object({
  name: z.string().min(1, "Subcategory name is required"),
  categoryId: z.string().min(1, "Select a parent category"),
});

type SubCategory = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  description?: string | null;
  subCategories: SubCategory[];
};

export default function CategoryPage() {
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
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onCategorySubmit = async () => {
    const data = categoryForm.getValues();
    try {
      await axios.post("/api/category", data);
      toast.success("Category created");
      categoryForm.reset();
      fetchCategories();
    } catch {
      toast.error("Error creating category");
    }
  };

  const onSubcategorySubmit = async () => {
    const data = subcategoryForm.getValues();
    try {
      await axios.post("/api/subcategory", data);
      toast.success("Subcategory created");
      subcategoryForm.reset();
      fetchCategories();
    } catch {
      toast.error("Error creating subcategory");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete("/api/category", { data: { id } });
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Error deleting category");
    }
  };

  const handleDeleteSubcategory = async (id: string) => {
    try {
      await axios.delete("/api/subcategory", { data: { id } });
      toast.success("Subcategory deleted");
      fetchCategories();
    } catch {
      toast.error("Error deleting subcategory");
    }
  };

  return (
    <div className="w-full mx-auto mt-10 max-w-5xl bg-white p-6 md:p-10 border border-[#0C6170] shadow-xl rounded-xl space-y-12">
      {/* Add Category Form */}
      <Form {...categoryForm}>
        <form
          onSubmit={categoryForm.handleSubmit(onCategorySubmit)}
          className="space-y-6"
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

      {/* Add Subcategory Form */}
      <Form {...subcategoryForm}>
        <form
          onSubmit={subcategoryForm.handleSubmit(onSubcategorySubmit)}
          className="space-y-6"
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

      {/* Category Table with Subcategories */}
      <div>
        <h3 className="text-xl font-semibold text-[#0C6170] mb-4">
          Category List
        </h3>

        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="border rounded-md overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Subcategories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description || "-"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="flex gap-2">
                            View
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Subcategories</DropdownMenuLabel>
                          {category.subCategories?.length > 0 ? (
                            category.subCategories.map((sub) => (
                              <DropdownMenuItem
                                key={sub.id}
                                className="flex justify-between items-center group"
                              >
                                <span>{sub.name}</span>
                                <button
                                  onClick={() => handleDeleteSubcategory(sub.id)}
                                  className="text-red-500 text-xs group-hover:underline"
                                >
                                  Delete
                                </button>
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <DropdownMenuItem disabled>
                              No subcategories
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
