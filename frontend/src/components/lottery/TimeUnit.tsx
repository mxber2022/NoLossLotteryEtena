import { motion } from 'framer-motion';

interface TimeUnitProps {
  value: number;
  label: string;
}

export function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-blue-500 text-white rounded-lg p-4 w-20 h-20 flex items-center justify-center text-3xl font-bold"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <p className="text-gray-600 mt-2 font-medium">{label}</p>
    </div>
  );
}