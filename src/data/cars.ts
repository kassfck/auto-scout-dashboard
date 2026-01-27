import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  pricePerDay: number;
  seats: number;
  maxSpeed: number;
  fuelConsumption: number;
  transmission: "Автомат" | "Механика";
  engine: string;
  horsepower: number;
  year: number;
  description: string;
  features: string[];
}

export const cars: Car[] = [
  {
    id: "1",
    name: "Phantom Limousine",
    brand: "Rolls-Royce",
    category: "Лимузин",
    image: car1,
    pricePerDay: 2500,
    seats: 20,
    maxSpeed: 240,
    fuelConsumption: 18,
    transmission: "Автомат",
    engine: "6.75L V12",
    horsepower: 563,
    year: 2024,
    description: "Rolls-Royce Phantom Limousine — вершина автомобильной роскоши. Этот эксклюзивный лимузин создан для тех, кто ценит непревзойдённый комфорт и престиж. Идеально подходит для свадеб, торжественных мероприятий и VIP-трансферов.",
    features: ["Массаж сидений", "Климат-контроль 4 зоны", "Панорамная крыша", "Аудиосистема Bespoke", "Холодильник", "TV экраны"],
  },
  {
    id: "2",
    name: "Escalade ESV",
    brand: "Cadillac",
    category: "Внедорожник",
    image: car2,
    pricePerDay: 1800,
    seats: 7,
    maxSpeed: 210,
    fuelConsumption: 15.5,
    transmission: "Автомат",
    engine: "6.2L V8",
    horsepower: 420,
    year: 2024,
    description: "Cadillac Escalade ESV — символ американской роскоши и мощи. Просторный салон, передовые технологии и внушительный внешний вид делают его идеальным выбором для деловых поездок и семейных путешествий.",
    features: ["AKG аудиосистема", "Super Cruise", "Night Vision", "Массаж сидений", "Пневмоподвеска", "Беспроводная зарядка"],
  },
  {
    id: "3",
    name: "S-Class Maybach",
    brand: "Mercedes-Benz",
    category: "Седан",
    image: car3,
    pricePerDay: 2200,
    seats: 4,
    maxSpeed: 250,
    fuelConsumption: 12,
    transmission: "Автомат",
    engine: "4.0L V8 Biturbo",
    horsepower: 503,
    year: 2024,
    description: "Mercedes-Maybach S-Class — эталон бизнес-класса. Сочетание немецкой инженерии и непревзойдённого комфорта для самых требовательных клиентов. Идеален для деловых встреч и трансферов.",
    features: ["Burmester 4D", "MBUX", "Массаж сидений", "Шторки на окнах", "Подогрев подлокотников", "Ароматизация салона"],
  },
  {
    id: "4",
    name: "7 Series M760i",
    brand: "BMW",
    category: "Седан",
    image: car4,
    pricePerDay: 1900,
    seats: 5,
    maxSpeed: 305,
    fuelConsumption: 11,
    transmission: "Автомат",
    engine: "6.6L V12",
    horsepower: 610,
    year: 2024,
    description: "BMW 7 Series M760i — спортивная роскошь в премиум-сегменте. Мощный V12 двигатель в сочетании с изысканным интерьером создаёт незабываемые впечатления от каждой поездки.",
    features: ["Bowers & Wilkins Diamond", "Gesture Control", "Sky Lounge", "Лазерные фары", "Массаж сидений", "xDrive"],
  },
  {
    id: "5",
    name: "Continental GT",
    brand: "Bentley",
    category: "Купе",
    image: car5,
    pricePerDay: 2800,
    seats: 4,
    maxSpeed: 333,
    fuelConsumption: 14,
    transmission: "Автомат",
    engine: "6.0L W12",
    horsepower: 659,
    year: 2024,
    description: "Bentley Continental GT — воплощение британской элегантности и спортивного характера. Ручная сборка, эксклюзивные материалы и невероятная динамика для истинных ценителей.",
    features: ["Naim аудиосистема", "Кожа Mulliner", "Rotating Display", "Массаж сидений", "Керамические тормоза", "All-wheel steering"],
  },
  {
    id: "6",
    name: "Panamera Turbo S",
    brand: "Porsche",
    category: "Спорткар",
    image: car6,
    pricePerDay: 2400,
    seats: 4,
    maxSpeed: 315,
    fuelConsumption: 13,
    transmission: "Автомат",
    engine: "4.0L V8 Biturbo",
    horsepower: 630,
    year: 2024,
    description: "Porsche Panamera Turbo S — спортивный седан без компромиссов. Гоночное наследие Porsche в сочетании с практичностью четырёхдверного кузова. Для тех, кто не готов выбирать между скоростью и комфортом.",
    features: ["Burmester High-End", "Sport Chrono", "PASM", "Керамические тормоза", "Rear-axle steering", "Night Vision"],
  },
];

export const categories = ["Все", "Лимузин", "Внедорожник", "Седан", "Купе", "Спорткар"];
