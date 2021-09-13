import { getContract } from "../constants";
import { useWeb3React } from "@web3-react/core";

export const useContract = (address, ABI, withSignerIfPossible = true) => {
  const context = useWeb3React();
  const { chainId, library, account } = context;

  if (!address || !ABI || !library) return null;

  try {
    return getContract(
      address?.[chainId],
      ABI,
      library,
      withSignerIfPossible && account ? account : undefined
    );
  } catch (err) {
    console.error("Failed to get contract", err);
    return null;
  }
};
