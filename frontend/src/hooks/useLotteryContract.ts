import { ethers } from "ethers";
import { useCallback, useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CONTRACT_ADDRESSES, LOTTERY_ABI } from "../config/contracts";
import { useTokenContract } from "./useTokenContract";
import { abi } from "./abi";

export function useLotteryContract() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const { approveUsde, checkAllowance, refetchBalance } = useTokenContract();

  const provider = useMemo(() => {
    if (typeof window.ethereum !== "undefined") {
      // return new ethers.JsonRpcProvider(
      //   "https://eth-sepolia.g.alchemy.com/v2/kaFl069xyvy3np41aiUXwjULZrF67--t"
      // );
      return new ethers.BrowserProvider(window.ethereum);
    }
    return null;
  }, []);

  const contract = useMemo(() => {
    if (!provider) return null;
    return new ethers.Contract(
      CONTRACT_ADDRESSES.sepolia.lottery,
      LOTTERY_ABI,
      provider
    );
  }, [provider]);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask to use this application");
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Rest of the hook implementation remains the same...
  const { data: lotteryState, refetch } = useQuery(
    ["lotteryState"],
    async () => {
      if (!contract) throw new Error("No contract instance");

      try {
        const [
          enrollmentStart,
          enrollmentEnd,
          totalDeposits,
          participants,
          lastDrawTime,
          // interestEarned,
        ] = await Promise.all([
          contract.enrollmentStart(),
          contract.enrollmentEnd(),
          contract.totalDeposits(),
          contract.getParticipantsCount(),
          contract.lastDrawTime(),
          // contract.calculateTotalInterest(),
        ]);

        return {
          enrollmentStart: Number(enrollmentStart),
          enrollmentEnd: Number(enrollmentEnd),
          totalDeposits: ethers.formatEther(totalDeposits),
          totalParticipants: participants,
          lastDrawTime: Number(lastDrawTime),
          // prizePool: ethers.formatEther(interestEarned),
        };
      } catch (error) {
        console.log("contract; ", contract);
        console.error("Error fetching lottery state:", error);
        return null;
      }
    }
  );

  const deposit = useMutation(async (amount: string) => {
    if (!contract) throw new Error("No contract instance");

    try {
      const signer = await provider?.getSigner();
      if (!signer) {
        await connectWallet();
        throw new Error("Please connect your wallet first");
      }

      // Check and handle token approval
      const hasAllowance = await checkAllowance(amount);
      console.log("hasAllowance: ", hasAllowance.toString());
      if (hasAllowance.toString() < amount) {
        await approveUsde(amount);
        // toast.loading("Approving USDe...");
      }

      const contractWithSigner = contract.connect(signer);
      const parsedAmount = ethers.parseEther(amount);

      const tx = await contractWithSigner.deposit(parsedAmount);
      await tx.wait();

      toast.success("Deposit successful!");
      refetch();
      refetchBalance();
    } catch (error: any) {
      console.error("Deposit error:", error);
      toast.error(error.message || "Failed to deposit. Please try again.");
      throw error;
    }
  });

  return {
    lotteryState,
    deposit,
    connectWallet,
    isConnecting,
    account,
    refetch,
  };
}
