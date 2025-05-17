"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export default function Component() {
  const videoIds = [
    "ryLH9qRIk1o",
    "yvqANkgRNrM",
    "w4KZunN1ntc",
    "jyIcC9X6CF8",
    "26kVdehOJms",
    "LqwlJ_fMK_Q",
    "_f6Sld1E-dU",
    "M5bxe7ogaCQ",
    "Ec6Gfbhfyys",
    "DVM7VddDGP4",
    "bZm5vPhTGE8",
    "_HGBCzYyu1Y",
    "lbFKDNOYW3w",
    "mlUA2lnmi-g",
    "BL_15zvGPiE",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-4 text-primary drop-shadow-md">
        🎥 Our Videos
      </h1>
      <p className="text-center text-lg md:text-xl mb-10 text-muted-foreground">
        Check out our latest 3D printing tutorials, product showcases, and behind-the-scenes footage!
      </p>
      <ScrollArea className="h-[calc(100vh-200px)] pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoIds.map((videoId) => (
            <motion.div
              key={videoId}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden shadow-md border border-muted bg-background"
            >
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
