import { motion } from "framer-motion";
import { Car } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={onLoadingComplete}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Road */}
      <div className="absolute bottom-1/3 left-0 right-0 h-2 bg-muted">
        <motion.div
          className="absolute inset-y-0 w-full flex items-center"
          animate={{ x: [0, -200] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-12 h-0.5 bg-primary mx-4 rounded-full"
            />
          ))}
        </motion.div>
      </div>

      {/* Car Container */}
      <div className="relative mb-8">
        {/* Speed Lines */}
        <motion.div
          className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col gap-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="h-0.5 bg-gradient-to-r from-transparent via-primary to-primary rounded-full"
              style={{ width: `${30 + i * 10}px` }}
              animate={{ 
                x: [-10, -30],
                opacity: [1, 0]
              }}
              transition={{ 
                duration: 0.4, 
                repeat: Infinity, 
                delay: i * 0.1,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        {/* Animated Car */}
        <motion.div
          className="relative"
          animate={{ 
            y: [0, -3, 0, -2, 0],
            rotate: [0, -0.5, 0, 0.5, 0]
          }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Car Body SVG */}
          <svg
            viewBox="0 0 120 50"
            className="w-32 h-16 md:w-48 md:h-24"
            fill="none"
          >
            {/* Car Body */}
            <motion.path
              d="M15 35 L25 35 L30 25 L45 20 L75 20 L90 25 L95 35 L105 35"
              stroke="url(#goldGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Car Roof */}
            <motion.path
              d="M45 20 L50 12 L70 12 L75 20"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Windows */}
            <motion.path
              d="M52 18 L54 14 L66 14 L68 18"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Front Wheel */}
            <motion.circle
              cx="30"
              cy="38"
              r="8"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "30px 38px" }}
            />
            {/* Rear Wheel */}
            <motion.circle
              cx="90"
              cy="38"
              r="8"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "90px 38px" }}
            />
            {/* Wheel Centers */}
            <circle cx="30" cy="38" r="3" fill="hsl(var(--primary))" />
            <circle cx="90" cy="38" r="3" fill="hsl(var(--primary))" />
            {/* Headlight */}
            <motion.circle
              cx="12"
              cy="32"
              r="2"
              fill="hsl(var(--primary))"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(45, 93%, 47%)" />
                <stop offset="100%" stopColor="hsl(38, 92%, 50%)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Logo and Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">
            <span className="text-gradient-gold">Premium</span>
            <span className="text-foreground">Drive</span>
          </span>
        </div>
        
        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Dust Particles */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-muted-foreground/30"
            initial={{ x: 80, y: 0, opacity: 1 }}
            animate={{ 
              x: 80 + (i * 20) + 50,
              y: [0, -10 - (i * 5), 10 + (i * 3)],
              opacity: [1, 0.5, 0],
              scale: [1, 1.5, 0.5]
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
