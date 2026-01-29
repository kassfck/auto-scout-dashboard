import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarImage } from "@/data/cars";
import { motion, AnimatePresence } from "framer-motion";

interface CarImageGalleryProps {
  images: CarImage[];
  carName: string;
}

const CarImageGallery = ({ images, carName }: CarImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = () => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-card border border-border">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex].src}
            alt={`${carName} - ${images[selectedIndex].label}`}
            className="w-full h-full object-cover"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

        {/* Navigation Arrows */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Button
            variant="dark"
            size="icon"
            className="rounded-full"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="dark"
            size="icon"
            className="rounded-full"
            onClick={handleNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-border">
          <span className="text-sm text-foreground">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className={`grid gap-2 ${images.length <= 5 ? 'grid-cols-5' : 'grid-cols-6'}`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > selectedIndex ? 1 : -1);
              setSelectedIndex(index);
            }}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === selectedIndex
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            }`}
          >
            <img
              src={image.src}
              alt={`${carName} - ${image.label}`}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 transition-opacity ${
                index === selectedIndex ? "bg-transparent" : "bg-background/30"
              }`}
            />
            <span className="absolute bottom-1 left-1 right-1 text-[10px] text-center text-foreground bg-background/70 backdrop-blur-sm rounded px-1 py-0.5 truncate">
              {image.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarImageGallery;
