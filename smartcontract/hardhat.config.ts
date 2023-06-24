import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: "https://morning-few-meadow.matic-testnet.discover.quiknode.pro/9fca9335b894ea9b4109ad2d01b1f20b2d7cecf3/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    matic: {
      url: "https://rpc.ankr.com/polygon",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYSCAN_API_KEY ?? "",
      polygon: process.env.POLYSCAN_API_KEY ?? "",
    },
  },
};

export default config;
