import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 300,
      }}
      className={`
        bg-white rounded-xl shadow-lg p-6 border border-gray-100
        hover:shadow-2xl transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
