require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("@nomicfoundation/hardhat-chai-matchers")
require("dotenv").config();

module.exports = {
  solidity: "0.8.26",
  mocha: {
    timeout: 20000 // Increase timeout if your tests take longer
  },
  networks: {
    ganache: {
      url: process.env.PROVIDER_URL,
      account: [`${process.env.PRIVATE_KEY}`]
    }
  }
};