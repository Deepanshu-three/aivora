"use client";

import ClientLottie from "@/components/ClientLottie";
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-6 sm:px-12 md:px-24 text-center overflow-hidden"
    >
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
          Turn your innovative ideas into reality with our cutting-edge solutions.
          Whether you want to explore our products or create a custom design,
          we’re here to help you bring your vision to life.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl px-4">
          <Button
            variant="default"
            size="lg"
            className="flex-1"
            onClick={() => alert("Show all products clicked")}
          >
            Show All Products
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => alert("Custom design clicked")}
          >
            Give Your Custom Design
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
