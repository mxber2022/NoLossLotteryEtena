import { useQuery, useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useContract } from "./useContract";
import { CONTRACT_ADDRESSES, LOTTERY_ABI } from "../config/contracts";
import { useProvider } from "./useProvider";
import toast from "react-hot-toast";

export function useUserDeposits() {
  const provider = useProvider();
  const contract = useContract(CONTRACT_ADDRESSES.sepolia.lottery, LOTTERY_ABI);

  const { data: userDeposit, refetch: refetchDeposit } = useQuery(
    ["userDeposit"],
    async () => {
      if (!contract || !window.ethereum) return "0";

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length === 0) return "0";

        const deposit = await contract.userDeposits(accounts[0]);
        return ethers.formatUnits(deposit, 18);
      } catch (error) {
        console.error("Error fetching user deposit:", error);
        return "0";
      }
    },
    {
      enabled: !!contract && !!window.ethereum,
      retry: 2,
      refetchInterval: 10000,
    }
  );

  const initiateWithdrawal = useMutation(async () => {
    if (!contract || !provider) throw new Error("Contract not initialized");

    try {
      const signer = await provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      const tx = await contractWithSigner.initiateWithdrawal({
        gasLimit: 300000,
      });

      toast.loading("Initiating withdrawal...");
      await tx.wait();

      toast.success(
        "Withdrawal initiated! Please wait for the cooldown period."
      );
      refetchDeposit();
    } catch (error: any) {
      console.error("Withdrawal initiation error:", error);
      toast.error(error.message || "Failed to initiate withdrawal");
      throw error;
    }
  });

  const completeWithdrawal = useMutation(async () => {
    if (!contract || !provider) throw new Error("Contract not initialized");

    try {
      const signer = await provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      const tx = await contractWithSigner.completeWithdrawal({
        gasLimit: 300000,
      });

      toast.loading("Completing withdrawal...");
      await tx.wait();

      toast.success("Withdrawal completed successfully!");
      refetchDeposit();
    } catch (error: any) {
      console.error("Withdrawal completion error:", error);
      toast.error(error.message || "Failed to complete withdrawal");
      throw error;
    }
  });

  return {
    userDeposit,
    initiateWithdrawal,
    completeWithdrawal,
    refetchDeposit,
  };
}
