import { ethers } from "hardhat";

async function main() {

  const stake = await ethers.deployContract("StakeContract");

  await stake.waitForDeployment();

  console.log(
    `stake contract deployed to ${stake.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
