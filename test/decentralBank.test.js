const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe('DecentralBank', () => {
	let tether, rwd, decentralBank;
	let owner, customer, customerAddress;

	function tokens(number) {
		return ethers.parseEther(number.toString(), 'ether');
	}

	before(async () => {
		[owner, customer] = await ethers.getSigners();
		customerAddress = customer.address;

		//Deploying contracts
		tether = await hre.ethers.deployContract("Tether");
		rwd = await hre.ethers.deployContract("RWD");
		decentralBank = await hre.ethers.deployContract("DecentralBank", [tether.getAddress(), rwd.getAddress()]);

		//Transfer all (1 million) tokens to DecentralBank
		await rwd.transfer(decentralBank.getAddress(), tokens('1000000'));

		//Distribute 100 mock Tether tokens to customer
		await tether.connect(owner).transfer(customerAddress, tokens('100')); 

		//return {tether};
	});

	/*before(async () => {
	  [owner, customer] = await ethers.getSigners();
  
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

	it('reward tokens for staking', async () => {
		let result;

		//Check customer balance
		result = await tether.balanceOf(customerAddress);
		expect(result).to.equal(tokens('100')); //customer mock wallet balance before staking 100 tokens

		//Check staking for customer
		await tether.connect(customer).approve(decentralBank.getAddress(), tokens('100'));
		await decentralBank.connect(customer).depositTokens(tokens('100'));

		//Check updated balance of Customer 
		result = await tether.balanceOf(customerAddress);
		expect(result).to.equal(tokens('0')); //customer mock wallet balance after staking 100 tokens

		//Check updated balance of Decentral Bank
		result = await tether.balanceOf(decentralBank.getAddress());
		expect(result).to.equal(tokens('100')); //decentral bank mock wallet balance after staking 100 tokens

		//isStaking Update
		result = await decentralBank.isStaking(customerAddress);
		expect(result).to.be.true;
	})

});
