import React, { useEffect } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useLogout, useUser } from "@thirdweb-dev/react";
import { getUser } from "../auth.config";
import checkBalance from "../util/checkBalance";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { MantleTestnet } from "@thirdweb-dev/chains";

// replace this with your contract address
const contractAddress = "0x5E877D66B61f11F5199ed2B2688B964c009311E2";

/**
 * Login Component
 */
export default function Login() {
  const address = useAddress(); // Get the user's address

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        Exclusive and Early Access to Some Exciting Information
      </h1>

      <p className={styles.explain}>
        brought to you by{" "}
        <b>
          <a
            href="https://www.mantle.xyz/developers"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mantleGreen}
          >
            Team Mantle
          </a>
        </b>
      </p>

      <hr className={styles.divider} />

      <p></p>
      <p></p>

      <h1 className={styles.h2}>Step 1</h1>
      <p>Connect your wallet with Mantle Testnet.</p>
      <>
        {address ? (
          <p>
            Connected to {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        ) : (
          <p></p>
        )}

        <ConnectWallet accentColor="#65b3ae"/>
      </>

      <p></p>
      <p></p>

      <h1 className={styles.h2}>Step 2</h1>
      <p>Please click on the &quot;Claim NFT&quot; that gives you the access.</p>

      <Web3Button
        contractAddress={contractAddress}
        action={(contract) => contract.erc1155.claim(0, 1)}
        accentColor="#65b3ae"
      >
        Claim NFT
      </Web3Button>

      <p></p>
      <p></p>

      <h1 className={styles.h2}>Step 3</h1>
      <p>Once the transaction is confirmed, click on &quot;Are you ready&quot; below.</p>

      <p className={styles.explain}>
        {" "}
        <Link className={styles.mantleGreen} href="/">
          Are You Ready?
        </Link>{" "}
      </p>

      <hr className={styles.divider} />
    </div>
  );
}

/**
 * getServerSideProps component
 * @param {*} context 
 * @returns 
 */
export async function getServerSideProps(context) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Ensure we are able to generate an auth token using our private key instantiated SDK
  const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("You need to add an PRIVATE_KEY environment variable.");
  }

  // Instantiate our SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    MantleTestnet,
  );

  // Check to see if the user has an NFT
  const hasNft = await checkBalance(sdk, user.address);

  // If they don't have an NFT, redirect them to the login page
  if (!hasNft) {
    console.log("User", user.address, "doesn't have an NFT! Redirecting...");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Finally, return the props
  return {
    props: {},
  };
}