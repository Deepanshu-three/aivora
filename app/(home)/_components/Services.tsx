'use client';

import React from 'react';
import { Truck, RefreshCcw, Clock, ShieldCheck } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: <Truck className="w-8 h-8 text-blue-600" />,
    title: 'Free Shipping',
    description: 'Above ₹5000',
  },
  {
    id: 2,
    icon: <RefreshCcw className="w-8 h-8 text-green-600" />,
    title: 'Money Back',
    description: '30 Days Guarantee',
  },
  {
    id: 3,
    icon: <Clock className="w-8 h-8 text-purple-600" />,
    title: '24/7 Support',
    description: 'Always here to help',
  },
  {
    id: 4,
    icon: <ShieldCheck className="w-8 h-8 text-red-600" />,
    title: 'Secure Payment',
    description: 'Powered by Razorpay',
  },
];

const Services = () => {
  return (
    <section className="bg-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ id, icon, title, description }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
