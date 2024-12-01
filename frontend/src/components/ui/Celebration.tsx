import { useEffect } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface CelebrationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function Celebration({ isVisible, onComplete }: CelebrationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Congratulations!
              </h2>
              <p className="text-gray-600 mb-4">
                Your deposit was successful! You're now entered into the
                lottery.
              </p>
              <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-sm font-medium text-blue-600"
              >
                Good luck! 🍀
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
