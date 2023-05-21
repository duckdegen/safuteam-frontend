import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSIWE } from "connectkit";
import { useAccount } from "wagmi";

import { useIsMounted } from "./use-is-mounted";

export const EVENT_SIWE_LOGIN = "siwe-login";
export const EVENT_SIWE_LOGOUT = "siwe-logout";

export const useWallet = () => {
  const isMounted = useIsMounted();
  const { isConnected, address } = useAccount();
  const { isSignedIn } = useSIWE();

  const { push } = useRouter();

  const enabled = isSignedIn && isConnected; // Only enable check-wallet after signin

  useEffect(() => {
    const loginCb = async () => {
      push(`/github`, undefined, { shallow: true });
    };

    const logoutCb = () => {};

    document.addEventListener(EVENT_SIWE_LOGIN, loginCb);
    document.addEventListener(EVENT_SIWE_LOGOUT, logoutCb);

    return () => {
      document.removeEventListener(EVENT_SIWE_LOGIN, loginCb);
      document.removeEventListener(EVENT_SIWE_LOGOUT, logoutCb);
    };
  }, [push]);

  // Should only check isLoading when signedIn
  const isLoading = !isMounted;

  return {
    isConnected,
    isSignedIn,
    address,
    isLoading,
  };
};
