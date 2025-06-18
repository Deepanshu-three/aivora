"use client"
import { Clock, DollarSign, Printer, Upload, Users, Zap } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { Card, CardContent } from '@/components/ui/card'

const CuttingEdge = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
     <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Cutting-Edge Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Printer,
                title: "Custom 3D Printing",
                description:
                  "Bring your designs to life with our state-of-the-art 3D printing technology, capable of handling complex geometries and various materials.",
              },
              {
                icon: Upload,
                title: "Easy Design Upload",
                description:
                  "Seamlessly upload your 3D models through our user-friendly platform and get instant quotes for printing your creations.",
              },
              {
                icon: Users,
                title: "Expert Consultation",
                description:
                  "Our team of experienced designers and engineers provide professional advice to optimize your designs for the best 3D printing results.",
              },
              {
                icon: Zap,
                title: "Rapid Prototyping",
                description:
                  "Accelerate your product development with our quick turnaround times on functional prototypes and concept models.",
              },
              {
                icon: Clock,
                title: "On-Demand Manufacturing",
                description:
                  "Scale your production with our on-demand 3D printing services, perfect for small batch runs or customized products.",
              },
              {
                icon: DollarSign,
                title: "Competitive Pricing",
                description:
                  "Enjoy cost-effective solutions for your 3D printing needs without compromising on quality or precision.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default CuttingEdge