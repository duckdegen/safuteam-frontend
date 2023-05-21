import { useRouter } from "next/router";
import { useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useWalletAuthContext, useIsMounted } from "../shared/hooks";

import EmptyPage from "./empty-page";
import { NEXT_PUBLIC_MW_URL } from "../shared/core/envs";

const GithubCallbackPage = () => {
  const isMounted = useIsMounted();
  const { address } = useWalletAuthContext();

  const { push } = useRouter();
  const queryClient = useQueryClient();

  const submittedRef = useRef(false);

  if (!isMounted) return <EmptyPage isLoading />;

  const githubAuth = async (code: string, address: string) => {
    if (!submittedRef.current) {
      submittedRef.current = true;
      const githubLoginRes = await fetch(`${NEXT_PUBLIC_MW_URL}/github-login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, wallet: address }),
      });
      const githubLoginData = await githubLoginRes.json();

      push("/handleoauth", undefined, { shallow: true });
    }
  };

  const codeParam = new URLSearchParams(window.location.search).get("code");
  if (codeParam && address) {
    githubAuth(codeParam, address);
  }

  return <EmptyPage isLoading />;
};

export default GithubCallbackPage;
