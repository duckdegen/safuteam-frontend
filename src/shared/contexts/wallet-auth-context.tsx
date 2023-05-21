import { createContext } from "react";

interface WalletAuthCtx {
  isConnected: boolean;
  isSignedIn: boolean;
  address: string | undefined;
  isLoading: boolean;
}

export const WalletAuthContext = createContext<WalletAuthCtx>({
  isConnected: false,
  isSignedIn: false,
  address: undefined,
  isLoading: false,
});
