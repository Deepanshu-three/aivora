"use client";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
  FilterIcon,
} from "lucide-react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductsList from "./Product";

const routes = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "workflows", label: "Workflows", icon: Layers2Icon },
  { href: "credentials", label: "Credentials", icon: ShieldCheckIcon },
  { href: "billing", label: "Billing", icon: CoinsIcon },
];

function SidebarWithFilters() {
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) =>
        pathname === `/${route.href}` || pathname.startsWith(`/${route.href}`)
    ) || routes[0];

  const [isFilterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex">
      {/* Desktop Sidebar Filters */}
      <div className="hidden md:block min-w-[400px] max-w-[400px] min-h-screen overflow-hidden bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate ">
        <div className="mt-20 p-10">
          <h1 className="text-2xl font-bold text-center mb-4">Filters</h1>
          <div className="space-y-2">
            <p>🔘 Filter A</p>
            <p>🔘 Filter B</p>
            <p>🔘 Filter C</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile Filter Trigger */}
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
              <h2 className="text-xl font-bold">Filters</h2>
              <div className="space-y-2">
                <p>🔘 Filter A</p>
                <p>🔘 Filter B</p>
                <p>🔘 Filter C</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Page Content */}
        <div className="p-4 pt-20 md:p-28">
          <ProductsList />
        </div>
      </div>
    </div>
  );
}

export default SidebarWithFilters;
