import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo } from "react-icons/fi";

interface InfoTooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function InfoTooltip({ text, position = "top" }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="text-gray-500 hover:text-blue-500 transition-colors"
      >
        <FiInfo className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`
              absolute z-50 w-64 p-3 text-sm text-white bg-gray-800 
              rounded-lg shadow-lg ${positionStyles[position]}
            `}
          >
            <div className="relative">
              {text}
              <div
                className={`
                  absolute w-2 h-2 bg-gray-800 transform rotate-45
                  ${
                    position === "top"
                      ? "bottom-[-4px] left-1/2 -translate-x-1/2"
                      : ""
                  }
                  ${
                    position === "bottom"
                      ? "top-[-4px] left-1/2 -translate-x-1/2"
                      : ""
                  }
                  ${
                    position === "left"
                      ? "right-[-4px] top-1/2 -translate-y-1/2"
                      : ""
                  }
                  ${
                    position === "right"
                      ? "left-[-4px] top-1/2 -translate-y-1/2"
                      : ""
                  }
                `}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
