import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Head from "next/head";
import ThirdwebGuideFooter from "../components/ThirdwebGuideFooter";
import { domainName } from "../const/yourDetails";
import "../styles/globals.css";

/**
 * MyApp Component
 * @param {*} param0 
 * @returns 
 */
function MyApp({ Component, pageProps }) {
    return (
      <ThirdwebProvider
        activeChain={{
          chainId: 5001, 
          rpc: ["https://rpc.testnet.mantle.xyz"],

          nativeCurrency: {
            decimals: 18,
            name: "Testnet BitDAO",
            symbol: "BIT",
          },
          shortName: "mantle-testnet", 
          slug: "Mantle-Testnet", 
          testnet: true,
          chain: "ETH",
          name: "Mantle Testnet", 
        }}

        authConfig={{
          domain: domainName,
          authUrl: "/api/auth",
        }}
      >
      <Head>
        <title>Mantle Ecosystem Grants</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="This website is being shared exclusively for ethDenver and events during ethDenver. If you're reading this, you're getting access to some really exciting new/info!"
        />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
