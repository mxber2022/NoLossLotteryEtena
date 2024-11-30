// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  sepolia: {
    lottery: "0x17A3F3986E1CEcA2143a2b21F6209950162894aa",
    usde: "0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696",
    susde: "0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b",
  },
};

// Token ABIs
export const TOKEN_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
];

// Contract ABIs
export const LOTTERY_ABI = [
  // State variables
  "function enrollmentStart() view returns (uint256)",
  "function enrollmentEnd() view returns (uint256)",
  "function totalDeposits() view returns (uint256)",
  "function participants(uint256) view returns (address)",
  "function lastDrawTime() view returns (uint256)",
  "function calculateTotalInterest() view returns (uint256)",
  "function userDeposits(address) view returns (uint256)",
  "function participants() view returns (uint256)",
  "function getParticipantsCount() view returns (uint256)",

  // User functions
  "function deposit(uint256 amount)",
  "function initiateWithdrawal()",
  "function completeWithdrawal()",

  // Events
  "event DepositMade(address indexed user, uint256 amount)",
  "event WithdrawalInitiated(address indexed user, uint256 amount)",
  "event WithdrawalCompleted(address indexed user, uint256 amount)",
  "event PrizeDistributed(address indexed winner, uint256 amount)",
];
