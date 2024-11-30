import { motion } from 'framer-motion';
import { useLotteryContract } from '../../hooks/useLotteryContract';
import { shortenAddress } from '../../utils/format';

export function WalletButton() {
  const { connectWallet, isConnecting, account } = useLotteryContract();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
      onClick={connectWallet}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Connecting...
        </span>
      ) : account ? (
        <span className="flex items-center space-x-2">
          <span className="h-2 w-2 bg-green-400 rounded-full"></span>
          <span>{shortenAddress(account)}</span>
        </span>
      ) : (
        'Connect Wallet'
      )}
    </motion.button>
  );
}