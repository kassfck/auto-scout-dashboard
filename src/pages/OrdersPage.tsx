import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

const OrdersPage = () => {
  const { orders } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активный</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Завершён</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Отменён</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Мои <span className="text-gradient-gold">заказы</span>
          </h1>
          <p className="text-muted-foreground">
            История ваших бронирований
          </p>
        </motion.div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-card rounded-2xl border border-border p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Car Image */}
                  <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={order.car.image}
                      alt={`${order.car.brand} ${order.car.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="text-muted-foreground text-sm">{order.car.brand}</p>
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {order.car.name}
                        </h3>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>
                          {format(order.startDate, "d MMM", { locale: ru })} -{" "}
                          {format(order.endDate, "d MMM yyyy", { locale: ru })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-muted-foreground text-sm">Итого: </span>
                        <span className="text-primary font-bold text-xl">
                          ${order.totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <Link to={`/car/${order.car.id}`}>
                        <Button variant="goldOutline" size="sm">
                          Подробнее
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Нет заказов
            </h3>
            <p className="text-muted-foreground mb-6">
              Вы ещё не бронировали автомобили
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

export default OrdersPage;
