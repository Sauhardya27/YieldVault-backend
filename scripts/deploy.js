const DeploymentModule = require("../ignition/modules/Deploy");
const { ethers } = require("hardhat");

async function main() {
	const [owner, investor] = await ethers.getSigners();
	//console.log("Signers retrieved:", owner.address, investor.address);

	const { tetherContract, rwdContract, decentralBankContract } = await hre.ignition.deploy(DeploymentModule);

	const decentralBankAddress = await decentralBankContract.getAddress();
	const investorAddress = investor.address;

	//Transfer all RWD tokens to DecentralBank
	await rwdContract.transfer(decentralBankAddress, "1000000000000000000000000"); // 1 million tokens (assuming 18 decimals)

	//Distribute 100 Tether tokens to investor
	await tetherContract.transfer(investorAddress, "1000000000000000000"); // 1 million tokens (assuming 18 decimals)

	console.log(`Tether Contract deployed to: ${await tetherContract.getAddress()}`);
	console.log(`RWD Contract deployed to: ${await rwdContract.getAddress()}`);
	console.log(`DecentralBank Contract deployed to: ${await decentralBankContract.getAddress()}`);

	/* Verify balances
	const rwdBalance = await rwdContract.balanceOf(decentralBankAddress);
	const tetherBalance = await tetherContract.balanceOf(investor.address);
	console.log(`DecentralBank RWD balance: ${ethers.formatUnits(rwdBalance, 18)} RWD`);
	console.log(`Investor Tether balance: ${ethers.formatUnits(tetherBalance, 18)} Tether`);*/
}

main().catch(console.error);
