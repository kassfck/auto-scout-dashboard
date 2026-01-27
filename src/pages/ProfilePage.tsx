import { User, Mail, Phone, Edit2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user, setUser, orders, favorites } = useApp();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleSave = () => {
    setUser({
      ...user!,
      ...formData,
    });
    setIsEditing(false);
    toast({
      title: "Профиль обновлён",
      description: "Ваши данные успешно сохранены",
    });
  };

  const stats = [
    { label: "Заказов", value: orders.length },
    { label: "В избранном", value: favorites.length },
    { label: "Активных", value: orders.filter((o) => o.status === "active").length },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Мой <span className="text-gradient-gold">профиль</span>
          </h1>
          <p className="text-muted-foreground">
            Управляйте своими данными
          </p>
        </motion.div>

        {/* Avatar and Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-card rounded-2xl border border-border p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-3xl font-display font-bold">
              {user?.name.charAt(0) || "U"}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {user?.name || "Гость"}
              </h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Личные данные
            </h3>
            <Button
              variant={isEditing ? "gold" : "goldOutline"}
              size="sm"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                "Сохранить"
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-1" />
                  Редактировать
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Имя
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="bg-muted border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Телефон
              </Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="bg-muted border-border"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Button variant="outline" className="w-full text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Выйти из аккаунта
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
