require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();

module.exports = {
  solidity: "0.8.26",
  networks: {
    ganache: {
      url: process.env.PROVIDER_URL,
      account: [`${process.env.PRIVATE_KEY}`]
    }
  }
};