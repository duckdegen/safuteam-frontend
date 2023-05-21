import { useCallback } from "react";

import { NEXT_PUBLIC_MW_URL } from "../core/envs";

export function useCreateUser() {
  const createUser = useCallback(async (wallet: string) => {
    const response = await fetch(`${NEXT_PUBLIC_MW_URL}/createUser`, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet: wallet }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return;
  }, []);

  return createUser;
}
