import { ethers } from "ethers";
import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CONTRACT_ADDRESSES, TOKEN_ABI } from "../config/contracts";
import toast from "react-hot-toast";
import { abi } from "./abi";

const abi_ERC20 = [
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
    stateMutability: "nonpayable",
  },
  {
    constant: true,
    inputs: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "remaining",
        type: "uint256",
      },
    ],
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [
      {
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    type: "function",
    stateMutability: "view",
  },
];

export function useTokenContract() {
  const provider = useMemo(() => {
    if (typeof window.ethereum !== "undefined") {
      return new ethers.BrowserProvider(window.ethereum);
    }
    return null;
  }, []);

  const usdeContract = useMemo(() => {
    if (!provider) return null;
    return new ethers.Contract(
      CONTRACT_ADDRESSES.sepolia.usde,
      abi_ERC20,
      provider
    );
  }, [provider]);

  const { data: balance, refetch: refetchBalance } = useQuery(
    ["usdeBalance"],
    async () => {
      if (!usdeContract || !window.ethereum) return "0";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length === 0) return "0";

      const balance = await usdeContract.balanceOf(accounts[0]);
      console.log("balance: ", balance);
      return ethers.formatEther(balance);
    }
  );

  const approveUsde = useCallback(
    async (amount: string) => {
      if (!usdeContract || !provider) {
        throw new Error("Contract or provider not available");
      }

      try {
        const toastId = toast.loading("Approving USDe...");
        const signer = await provider.getSigner();
        //const contract = usdeContract.connect(signer);

        const new_con = new ethers.Contract(
          CONTRACT_ADDRESSES.sepolia.usde,
          abi_ERC20,
          signer
        );

        const parsedAmount = ethers.parseEther(amount);
        const tx = await new_con.approve(
          CONTRACT_ADDRESSES.sepolia.lottery,
          parsedAmount
        );

        await tx.wait();
        toast.dismiss(toastId);
        toast.success("Approval successful!");
      } catch (error: any) {
        console.error("Approval error:", error);
        toast.error(error.message || "Failed to approve USDe");
        throw error;
      }
    },
    [usdeContract, provider]
  );

  const checkAllowance = useCallback(
    async (amount: string) => {
      if (!usdeContract || !window.ethereum) return false;

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length === 0) return false;

      const allowance = await usdeContract.allowance(
        accounts[0],
        CONTRACT_ADDRESSES.sepolia.lottery
      );

      console.log("allowance", allowance);

      return allowance;
    },
    [usdeContract]
  );

  return {
    balance,
    approveUsde,
    checkAllowance,
    refetchBalance,
  };
}
