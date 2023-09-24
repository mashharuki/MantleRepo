import { contractAddress } from "../const/yourDetails";

/**
 * checkBalance method
 * @param {*} sdk 
 * @param {*} address 
 * @returns 
 */
export default async function checkBalance(sdk, address) {
  const editionDrop = await sdk.getContract(
    "0x5E877D66B61f11F5199ed2B2688B964c009311E2", // replace this with your contract address
    "edition-drop"
  );

  const balance = await editionDrop.balanceOf(address, 0);

  // gt = greater than
  return balance.gt(0);
}
