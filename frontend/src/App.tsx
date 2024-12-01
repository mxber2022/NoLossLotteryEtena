import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { LotteryStats } from "./components/lottery/LotteryStats";
import { DepositForm } from "./components/lottery/DepositForm";
import { Timer } from "./components/Timer";
import { LotteryHeader } from "./components/lottery/LotteryHeader";
import { Navbar } from "./components/navigation/Navbar";
import { useLotteryContract } from "./hooks/useLotteryContract";
import { UserDeposits } from "./components/deposits/UseDeposits";
import { HowItWorks } from "./components/info/HowitWorks";
import { HeroSection } from "./components/lottery/HeroSection";

const queryClient = new QueryClient();

function LotteryApp() {
  const { lotteryState } = useLotteryContract();

  if (!lotteryState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      {/* <LotteryHeader /> */}
      <HeroSection />
      <HowItWorks />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Time Until Enrollment Ends
          </h2>
          <Timer endTime={lotteryState.enrollmentEnd} />
        </motion.div>

        <LotteryStats stats={lotteryState} />

        <div className="mt-12">
          <DepositForm />
          <UserDeposits />
        </div>
      </main>

      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.img
              src="/lottery.svg"
              alt="Logo"
              className="h-8 w-8"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-gray-600 text-center">
              © 2023 No Loss Lottery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LotteryApp />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
