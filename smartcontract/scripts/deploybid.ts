import { ethers } from "hardhat";

async function main() {

  const bid = await ethers.deployContract("Bidding",["0x322Af0da66D00be980C7aa006377FCaaEee3BDFD"]);

  await bid.waitForDeployment();

  console.log(
    `stake contract deployed to ${bid.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
