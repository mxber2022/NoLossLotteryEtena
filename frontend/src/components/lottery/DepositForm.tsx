import { useState } from "react";
import { motion } from "framer-motion";
import { useLotteryContract } from "../../hooks/useLotteryContract";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Celebration } from "../ui/celebration";

export function DepositForm() {
  const [amount, setAmount] = useState("");
  const { deposit } = useLotteryContract();
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await deposit.mutateAsync(amount);
    setShowCelebration(true);
    setAmount("");
  };

  return (
    <>
      <Card className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Join the Lottery
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Amount (USDe)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="1"
                  step="1"
                  required
                />
                <span className="absolute right-4 top-3 text-gray-400">
                  USDe
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Minimum deposit: 1 USDe
              </p>
            </div>
            <Button type="submit" isLoading={deposit.isLoading}>
              Deposit & Join Lottery
            </Button>
          </form>
        </motion.div>
      </Card>

      <Celebration
        isVisible={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
    </>
  );
}
