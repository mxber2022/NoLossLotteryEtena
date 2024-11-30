import { useMemo } from "react";
import { ethers } from "ethers";

export function useProvider() {
  return useMemo(() => {
    if (typeof window.ethereum !== "undefined") {
      return new ethers.BrowserProvider(window.ethereum);
    }
    return null;
  }, []);
}
