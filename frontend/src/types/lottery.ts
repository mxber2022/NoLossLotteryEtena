export interface LotteryState {
  enrollmentStart: number;
  enrollmentEnd: number;
  totalDeposits: string;
  totalParticipants: number;
  userDeposit: string;
  isParticipant: boolean;
  lastDrawTime: number;
  prizePool: string;
}

export interface WithdrawalRequest {
  susdeAmount: string;
  cooldownStart: number;
}

export interface UserStats {
  depositAmount: string;
  isParticipant: boolean;
  withdrawalRequest: WithdrawalRequest | null;
}
