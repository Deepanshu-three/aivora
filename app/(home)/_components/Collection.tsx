import { ForwardIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Collection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-16 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-900">
        Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[600px]">
        {/* Left Large Card */}
        <div
          className="bg-gray-200  overflow-hidden flex flex-col rounded-md
  transition-transform duration-300 ease-in-out transform hover:scale-105 
  hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        >
          <div className="flex-1 relative">
            <Image
              src="/home/arm.png"
              alt="Arm Image"
              fill
              className="object-contain w-full h-full rounded-t-xl"
            />
          </div>
          <div className="p-6 space-y-2 bg-gray-200">
            <span className="text-2xl font-semibold text-gray-800">
              Robotic Parts
            </span>
            <div className="flex items-center space-x-2 text-blue-600 underline">
              <span>Collection</span>
              <ForwardIcon className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Right Two Stacked Cards */}
        <div className="flex flex-col gap-2">
          {[
            { src: "/home/drone.png", label: "Drone" },
            { src: "/home/ic.png", label: "IC Chip" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-200 overflow-hidden flex-1 flex flex-col rounded-md
  transition-transform duration-300 ease-in-out transform hover:scale-105 
  hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <div className="flex-1 relative">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-contain w-full h-full rounded-t-xl"
                />
              </div>
              <div className="p-6 space-y-2 bg-gray-200">
                <span className="text-2xl font-semibold text-gray-800">
                  {item.label}
                </span>
                <div className="flex items-center space-x-2 text-blue-600 underline">
                  <span>Collection</span>
                  <ForwardIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
