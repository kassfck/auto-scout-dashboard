import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

const FavoritesPage = () => {
  const { favorites } = useApp();

  const favoriteCars = cars.filter((car) => favorites.includes(car.id));

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient-gold">Избранное</span>
          </h1>
          <p className="text-muted-foreground">
            Автомобили, которые вы добавили в избранное
          </p>
        </motion.div>

        {favoriteCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Нет избранных автомобилей
            </h3>
            <p className="text-muted-foreground mb-6">
              Добавьте автомобили в избранное, чтобы вернуться к ним позже
            </p>
            <Link to="/catalog">
              <Button variant="gold">Перейти в каталог</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
