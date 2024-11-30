import { useMemo } from "react";
import { Contract } from "ethers";
import { useProvider } from "./useProvider";

export function useContract<T extends Contract>(
  address: string,
  abi: any[]
): T | null {
  const provider = useProvider();

  return useMemo(() => {
    if (!provider || !address) return null;
    return new Contract(address, abi, provider) as T;
  }, [provider, address, abi]);
}
