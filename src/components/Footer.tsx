import { Link } from "react-router-dom";
import { Car, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-gradient-gold">Premium</span>
                <span className="text-foreground">Drive</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Премиальный сервис аренды автомобилей. Роскошь и комфорт для особых моментов вашей жизни.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Навигация</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Главная
              </Link>
              <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Каталог
              </Link>
              <Link to="/favorites" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Избранное
              </Link>
              <Link to="/orders" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Мои заказы
              </Link>
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Контакты</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+79991234567" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +7 (999) 123-45-67
              </a>
              <a href="mailto:info@premiumdrive.ru" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4 text-primary" />
                info@premiumdrive.ru
              </a>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                Москва, ул. Тверская, 1
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Мы в соцсетях</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 PremiumDrive. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
