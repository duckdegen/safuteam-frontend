import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { WagmiConfig, createClient } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient, SIWESession } from "connectkit";
import { TestBenchProvider, useTestBench } from "../TestbenchProvider";
import { siweClient } from "../utils/siweClient";
import { useEffect, useState } from "react";
import { WalletAuthProvider } from "../providers/wallet-auth-provider";
import { useCreateUser } from "../shared/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = createClient(
  getDefaultClient({
    //chains: [mainnet, polygon],
    appName: "SafuTeam",
    appIcon: "/logo.png",
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

export const EVENT_SIWE_LOGIN = "siwe-login";
export const EVENT_SIWE_LOGOUT = "siwe-logout";

function App({ Component, pageProps }: AppProps) {
  const { theme, mode, options, customTheme } = useTestBench();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: Number(process.env.NEXT_PUBLIC_QUERY_RETRY_COUNT) || false,
          },
        },
      })
  );

  const createUser = useCreateUser();

  const key = JSON.stringify({ customTheme });

  // SIWE provider needs to be the outer-most provider because the connect kit
  // provider depends on some of the state

  useEffect(() => {
    console.log("App rendered");
  }, [customTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <siweClient.Provider
        onSignIn={async (data) => {
          console.log("onSignIn", data);
          await createUser(data?.address as string);
          document.dispatchEvent(new Event(EVENT_SIWE_LOGIN));
        }}
        onSignOut={() => {
          document.dispatchEvent(new Event(EVENT_SIWE_LOGOUT));
        }}
      >
        <ConnectKitProvider
          key={key}
          theme={theme}
          mode={mode}
          options={options}
          customTheme={customTheme}
          onConnect={(data) => {
            console.log("onConnect Provider", data);
          }}
          onDisconnect={() => {
            console.log("onDisconnect Provider");
          }}
          debugMode
        >
          <WalletAuthProvider>
            <Component {...pageProps} />
          </WalletAuthProvider>
        </ConnectKitProvider>
      </siweClient.Provider>
    </QueryClientProvider>
  );
}
function MyApp(appProps: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>ConnectKit Testbench</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <WagmiConfig client={client}>
        <TestBenchProvider
        //customTheme={{ '--ck-font-family': 'monospace' }}
        >
          <App {...appProps} />
        </TestBenchProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
