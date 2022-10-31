const hre = require("hardhat");

async function main() {

  const UglyNFT = await hre.ethers.getContractFactory("UglyNFT");
  const uglynft = await UglyNFT.deploy();

  await uglynft.deployed();

  console.log("UglyNFT NFT deployed to:", uglynft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
