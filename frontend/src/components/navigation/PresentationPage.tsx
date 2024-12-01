import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiDollarSign,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
} from "react-icons/fi";

const features = [
  {
    icon: <FiShield className="w-8 h-8" />,
    title: "No-Loss Guarantee",
    description:
      "Users never lose their principal amount, making it a risk-free lottery system",
  },
  {
    icon: <FiTrendingUp className="w-8 h-8" />,
    title: "Yield Generation",
    description:
      "Deposits generate yield through Ethereum staking, creating the prize pool",
  },
  {
    icon: <FiDollarSign className="w-8 h-8" />,
    title: "$300B+ Market",
    description:
      "Targeting the massive global lottery market with a revolutionary approach",
  },
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: "Weekly Prizes",
    description:
      "Regular prize draws from accumulated yield, increasing engagement",
  },
];

const stats = [
  { label: "Global Lottery Market", value: "$300B+" },
  { label: "DeFi TVL", value: "$50B+" },
  { label: "Target Users", value: "100M+" },
  { label: "Weekly Prizes", value: "52/year" },
];

export function PresentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                No Loss Lottery
              </span>
            </h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              A revolutionary DeFi lottery system where players never lose their
              principal while earning chances to win big.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-medium text-lg"
            >
              Learn More <FiArrowRight />
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the future of lottery systems where everyone's a winner
              through yield generation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-medium text-lg"
            >
              Launch App
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
