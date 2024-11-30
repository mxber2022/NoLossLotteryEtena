import { motion } from "framer-motion";
import { FiDollarSign, FiAward, FiClock, FiShield } from "react-icons/fi";
import { Card } from "../ui/Card";

const steps = [
  {
    icon: <FiDollarSign className="w-8 h-8" />,
    title: "Deposit USDe",
    description:
      "Deposit your USDe tokens to enter the lottery. Your principal amount is always safe and can be withdrawn.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <FiClock className="w-8 h-8" />,
    title: "Generate Yield",
    description:
      "Your deposits generate yield through staking USDe. This yield forms the prize pool.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: <FiAward className="w-8 h-8" />,
    title: "Weekly Draws",
    description:
      "Every week, one lucky participant wins the yield generated while everyone keeps their deposits.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <FiShield className="w-8 h-8" />,
    title: "No Loss Guarantee",
    description:
      "Your principal is always safe. Only the generated yield is used for prizes.",
    color: "from-green-500 to-green-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function HowItWorks() {
  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          How It Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our No Loss Lottery lets you win prizes without risking your
          principal. Here's how it works:
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
      >
        {steps.map((step, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full">
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 rounded-full bg-gradient-to-r ${step.color} text-white`}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Card className="inline-block">
          <div className="flex items-center space-x-4 text-left">
            <div className="p-4 bg-yellow-100 rounded-full">
              <FiAward className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Ready to Try Your Luck?</h4>
              <p className="text-gray-600">
                Start with as little as 1 USDe and join the next draw!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
