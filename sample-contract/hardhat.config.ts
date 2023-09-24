import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    "mantle-testnet": {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [process.env.PRIV_KEY] 
    }
  }
};

export default config;
