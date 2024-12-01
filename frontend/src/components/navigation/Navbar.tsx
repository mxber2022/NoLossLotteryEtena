import { useState } from "react";
import { motion } from "framer-motion";
import { useTokenContract } from "../../hooks/useTokenContract";
import { formatAmount } from "../../utils/format";
import { WalletButton } from "./WalletButton";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { balance } = useTokenContract();

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex-1 flex items-center justify-start">
            <motion.div
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Logo className="h-10 w-10" />
              <span className="ml-3 text-xl font-bold font-display bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Magic
              </span>
            </motion.div>
          </div>

          {/* Center section */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50"
            >
              <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Powered by
              </span>
              <motion.span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Ethena & Pyth
              </motion.span>
            </motion.div>
          </div>

          {/* Right section */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            {balance && Number(balance) > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg"
              >
                <span className="text-sm text-gray-600">Balance:</span>
                <span className="font-semibold text-blue-600">
                  {formatAmount(balance)} USDe
                </span>
              </motion.div>
            )}
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
