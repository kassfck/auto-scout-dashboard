import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20">
      <div className="text-center px-4">
        <h1 className="font-display text-8xl font-bold text-gradient-gold mb-4">404</h1>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
          Страница не найдена
        </h2>
        <p className="text-muted-foreground mb-8">
          К сожалению, запрашиваемая страница не существует
        </p>
        <Link to="/">
          <Button variant="gold" size="lg">
            <Home className="w-5 h-5 mr-2" />
            На главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
