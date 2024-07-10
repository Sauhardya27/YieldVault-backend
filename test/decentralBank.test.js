const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe('DecentralBank', () => {
	let tether, rwd, decentralBank;

	function tokens(number) {
		return ethers.parseEther(number.toString(), 'ether');
	}

	before(async () => {
		[owner, investor] = await ethers.getSigners();
		const investorAddress = investor.address;

		//Deploying contracts
		tether = await hre.ethers.deployContract("Tether");
		rwd = await hre.ethers.deployContract("RWD");
		decentralBank = await hre.ethers.deployContract("DecentralBank", [tether.getAddress(), rwd.getAddress()]);

		//Transfer all (1 million) tokens to DecentralBank
		await rwd.transfer(decentralBank.getAddress(), tokens('1000000'));

		//Distribute 100 mock Tether tokens to investor
		await tether.transfer(investorAddress, tokens('100')); 

		//return {tether};
	});

	/*before(async () => {
	  [owner, investor] = await ethers.getSigners();
  
	  // Get contract instances
	  rwd = await ethers.getContractAt('RWD', RWD.address);
	  tether = await ethers.getContractAt('Tether', Tether.address);
	  decentralBank = await ethers.getContractAt('DecentralBank', DecentralBank.address);
	});*/

	/*async function deployContract() { 
		const tether = await hre.ethers.deployContract("Tether");
		return {tether};
	}*/

	it('matches name successfully', async () => {
		const name = await tether.name();
		expect(name).to.equal('Mock Tether Token');
	})

	it('matches name successfully', async () => {
		const name = await rwd.name();
		expect(name).to.equal('Reward Token');
	})

	it('matches name successfully', async () => {
		const name = await decentralBank.name();
		expect(name).to.equal('Decentral Bank');
	})

	it('contract has tokens', async () => {
		let balance = await rwd.balanceOf(decentralBank.getAddress())
		expect(balance).to.equal(tokens('1000000'));
	})

});
