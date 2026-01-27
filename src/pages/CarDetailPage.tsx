import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Users, Gauge, Fuel, Cog, Calendar, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SpecBadge from "@/components/SpecBadge";
import BookingForm from "@/components/BookingForm";
import { cars } from "@/data/cars";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { useState } from "react";

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useApp();

  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Автомобиль не найден
          </h1>
          <Button variant="gold" onClick={() => navigate("/catalog")}>
            Вернуться в каталог
          </Button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(car.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car.id);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-card border border-border">
              <img
                src={car.image}
                alt={`${car.brand} ${car.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              
              {/* Navigation Arrows */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Button variant="dark" size="icon" className="rounded-full">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button variant="dark" size="icon" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </div>

              {/* Favorite Button */}
              <Button
                variant="dark"
                size="icon"
                onClick={handleFavoriteClick}
                className="absolute top-4 right-4 rounded-full"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorite ? "fill-primary text-primary" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6">
              <SpecBadge icon={Users} label="Мест" value={`${car.seats}`} />
              <SpecBadge icon={Gauge} label="Скорость" value={`${car.maxSpeed} км/ч`} />
              <SpecBadge icon={Fuel} label="Расход" value={`${car.fuelConsumption} л`} />
              <SpecBadge icon={Cog} label="Коробка" value={car.transmission} />
              <SpecBadge icon={Zap} label="Мощность" value={`${car.horsepower} л.с.`} />
              <SpecBadge icon={Calendar} label="Год" value={`${car.year}`} />
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-6">
              <p className="text-primary font-medium mb-1">{car.brand}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {car.name}
              </h1>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                <span className="text-sm font-medium text-primary">{car.category}</span>
              </div>
            </div>

            {/* Price */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-border mb-6">
              <p className="text-muted-foreground text-sm mb-1">Стоимость аренды</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  ${car.pricePerDay.toLocaleString()}
                </span>
                <span className="text-muted-foreground">/день</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Описание
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Engine */}
            <div className="mb-6">
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Двигатель
              </h3>
              <p className="text-foreground font-medium">{car.engine}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Особенности
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Button */}
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button variant="gold" size="xl" className="w-full">
                  Забронировать
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">
                    Бронирование {car.brand} {car.name}
                  </DialogTitle>
                </DialogHeader>
                <BookingForm car={car} onClose={() => setIsBookingOpen(false)} />
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
