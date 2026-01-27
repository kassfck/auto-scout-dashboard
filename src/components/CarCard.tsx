import { Link } from "react-router-dom";
import { Heart, Users, Gauge, Fuel } from "lucide-react";
import { Car } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
  index?: number;
}

const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useApp();
  const favorite = isFavorite(car.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/car/${car.id}`}>
        <div className="group relative bg-gradient-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 shadow-card hover:shadow-gold">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={car.image}
              alt={`${car.brand} ${car.name}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 bg-background/50 backdrop-blur-sm hover:bg-background/80"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favorite ? "fill-primary text-primary" : "text-foreground"
                }`}
              />
            </Button>

            {/* Category Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
              <span className="text-xs font-medium text-primary">{car.category}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5">
            <div className="mb-3">
              <p className="text-muted-foreground text-sm">{car.brand}</p>
              <h3 className="font-display text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {car.name}
              </h3>
            </div>

            {/* Specs */}
            <div className="flex items-center gap-4 mb-4 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm">{car.seats}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-primary" />
                <span className="text-sm">{car.maxSpeed} км/ч</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Fuel className="w-4 h-4 text-primary" />
                <span className="text-sm">{car.fuelConsumption} л</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-primary font-bold text-xl md:text-2xl">
                  ${car.pricePerDay.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-sm">/день</span>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
