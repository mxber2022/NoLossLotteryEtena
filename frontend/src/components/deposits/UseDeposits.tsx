import { motion } from "framer-motion";
import { useUserDeposits } from "../../hooks/useUserDeposits";
import { formatAmount } from "../../utils/format";
import { Card } from "../ui/Card";
import { WithdrawButton } from "./WithdrawButton";
import { InfoTooltip } from "../ui/InfoTooltip";

export function UserDeposits() {
  const { userDeposit, initiateWithdrawal, completeWithdrawal } =
    useUserDeposits();
  const hasDeposits = Number(userDeposit) > 0;

  return (
    <Card className="max-w-md mx-auto mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Your Deposits
          </h3>
          <motion.div
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-gray-600">Current Deposit:</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              {formatAmount(userDeposit || "0")} USDe
            </span>
          </motion.div>
        </div>

        {hasDeposits ? (
          <div className="space-y-4">
            <WithdrawButton
              onClick={() => initiateWithdrawal.mutate()}
              isLoading={initiateWithdrawal.isLoading}
              variant="initiate"
            >
              Initiate Withdrawal
            </WithdrawButton>
            {/* 
            <WithdrawButton
              onClick={() => completeWithdrawal.mutate()}
              isLoading={completeWithdrawal.isLoading}
              variant="complete"
            >
              Complete Withdrawal
            </WithdrawButton> */}

            <motion.p
              className="text-sm text-gray-500 text-center p-3 bg-blue-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ⚠️Withdrawal requires a cooldown period after initiation
              <InfoTooltip
                text="⚠️ Withdrawing your deposit will remove you from the lottery round"
                position="right"
              />
            </motion.p>
          </div>
        ) : (
          <motion.p
            className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            You haven't made any deposits yet
          </motion.p>
        )}
      </motion.div>
    </Card>
  );
}
