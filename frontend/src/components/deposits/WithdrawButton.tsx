import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { InfoTooltip } from "../ui/InfoTooltip";

interface WithdrawButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant: "initiate" | "complete";
}

export function WithdrawButton({
  children,
  isLoading,
  variant,
  ...props
}: WithdrawButtonProps) {
  const variants = {
    initiate: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      hoverBackground: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
      icon: (
        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      ),
    },
    complete: {
      background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      hoverBackground: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
      icon: (
        <FiCheck className="ml-2 group-hover:scale-110 transition-transform" />
      ),
    },
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`
        group w-full py-3 px-6 rounded-lg font-medium text-white
        shadow-lg hover:shadow-xl transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-default
        flex items-center justify-center
      `}
        style={{
          background: variants[variant].background,
          backgroundSize: "200% 200%",
        }}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <span>{children}</span>
            {variants[variant].icon}
          </div>
        )}
      </motion.button>
    </>
  );
}
