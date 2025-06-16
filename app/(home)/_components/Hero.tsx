"use client";

import ClientLottie from "@/components/ClientLottie";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-6 sm:px-12 md:px-24 text-center overflow-hidden ">
      <div className="max-w-4xl w-full flex flex-col items-center justify-center">
        {/* Animation */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[4/3] mb-6">
          <ClientLottie />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          INNOVATE YOUR IDEAS
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl px-4">
          Turn your innovative ideas into reality with our cutting-edge
          solutions. Whether you want to explore our products or create a custom
          design, we’re here to help you bring your vision to life.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl px-4 mx-auto mb-10">
          <Link href="/products" className="flex-1">
            <Button
              variant="default"
              size="lg"
              className="w-full rounded-2xl shadow-md cursor-pointer transition duration-200 hover:shadow-lg hover:bg-primary/90"
            >
              Show All Products
            </Button>
          </Link>

          <Link href="/custom" className="flex-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-2xl shadow-md cursor-pointer transition duration-200 hover:shadow-lg border-primary text-primary hover:bg-primary/10"
              onClick={() => alert("Custom design clicked")}
            >
              Give Your Custom Design
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
