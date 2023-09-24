import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { MantleTestnet } from "@thirdweb-dev/chains";

export default async function getContract() {
  // Instantiate our SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    MantleTestnet,
  );

  const contract = await sdk.getContract(
    contractAddress,
    "edition-drop"
  );

  return contract;
}
