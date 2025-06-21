"use client";
import { FilterIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductsList from "./Product";
import axios from "axios";

type Category = {
  id: string;
  name: string;
  description?: string;
};

type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
};

function SidebarWithFilters() {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  const filters = {
    category: selectedCategory,
    subcategory: selectedSubcategory,
    priceMin: priceRange.min,
    priceMax: priceRange.max,
  };

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

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory) {
        setSubcategories([]);
        setSelectedSubcategory("");
        return;
      }
      try {
        const res = await axios.get(
          `/api/subcategory?categoryId=${selectedCategory}`
        );
        setSubcategories(res.data.subcategories || res.data);
      } catch (error) {
        console.error("Failed to fetch subcategories", error);
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const FilterUI = (
    <>
      <h2 className="text-xl font-bold mt-4">Filters</h2>
      <div className="space-y-2 mt-4">
        <div>
          <label className="font-semibold">Category</label>
          <select
            className="w-full p-2 mt-1 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && subcategories.length > 0 && (
          <div>
            <label className="font-semibold">Subcategory</label>
            <select
              className="w-full p-2 mt-1 border rounded"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="">All</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="font-semibold">Price Range</label>
          <div className="flex gap-2 mt-1">
            <input
              type="number"
              placeholder="Min"
              className="w-full p-2 border rounded"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: +e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full p-2 border rounded"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: +e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex">
      <div className="hidden md:block min-w-[400px] max-w-[400px] min-h-screen overflow-hidden bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
        <div className="p-10">{FilterUI}</div>
      </div>

      <div className="flex-1">
        <div className="md:hidden sticky top-16 z-30 bg-background border-b p-2 flex justify-between items-center">
          <span className="text-lg font-bold">Products</span>
          <Sheet open={isFilterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-4 space-y-4">
              {FilterUI}
            </SheetContent>
          </Sheet>
        </div>

        <div className="p-4">
          <ProductsList filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default SidebarWithFilters;
