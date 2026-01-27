import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { Car } from "@/data/cars";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface BookingFormProps {
  car: Car;
  onClose?: () => void;
}

const BookingForm = ({ car, onClose }: BookingFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { addOrder, user } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  const days = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
  const totalPrice = days * car.pricePerDay;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast({
        title: "Ошибка",
        description: "Выберите даты аренды",
        variant: "destructive",
      });
      return;
    }

    if (!name || !phone) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    addOrder({
      car,
      startDate,
      endDate,
      totalPrice,
      status: "active",
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      toast({
        title: "Заказ оформлен!",
        description: `${car.brand} ${car.name} забронирован на ${days} дней`,
      });
      onClose?.();
      navigate("/orders");
    }, 1500);
  };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mb-4">
            <Check className="w-10 h-10 text-primary-foreground" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            Заказ оформлен!
          </h3>
          <p className="text-muted-foreground text-center">
            Перенаправляем вас к заказам...
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Дата начала</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Дата окончания</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < (startDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Иванов"
              className="bg-muted border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 123-45-67"
              className="bg-muted border-border"
            />
          </div>

          {days > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-muted/50 border border-border"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Срок аренды:</span>
                <span className="text-foreground font-medium">{days} дней</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Итого:</span>
                <span className="text-primary font-bold text-2xl">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </motion.div>
          )}

          <Button
            type="submit"
            variant="gold"
            size="xl"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
            ) : (
              "Забронировать"
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;
