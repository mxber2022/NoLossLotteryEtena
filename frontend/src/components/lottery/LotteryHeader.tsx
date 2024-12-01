import { motion } from 'framer-motion';

export function LotteryHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          No Loss Lottery
        </h1>
        <p className="mt-2 text-gray-600">
          Earn interest while participating in the lottery - Your principal is always safe!
        </p>
      </div>
    </motion.header>
  );
}