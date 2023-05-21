import { ReactNode, useMemo } from "react";

import { WalletAuthContext } from "../shared/contexts/wallet-auth-context";
import { useWallet } from "../shared/hooks/use-wallet";

interface Props {
  children: ReactNode;
}

export const WalletAuthProvider = ({ children }: Props) => {
  const { isConnected, isSignedIn, address, isLoading } = useWallet();

  const memoed = useMemo(
    () => ({
      isConnected,
      isSignedIn,
      address,
      isLoading,
    }),
    [address, isConnected, isLoading, isSignedIn]
  );

  return (
    <WalletAuthContext.Provider value={memoed}>
      {children}
    </WalletAuthContext.Provider>
  );
};
