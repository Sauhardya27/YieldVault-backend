const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeploymentModule", (m) => {

  const tetherContract = m.contract("Tether", []);
  const rwdContract = m.contract("RWD", []);
  const decentralBankContract = m.contract("DecentralBank", [tetherContract, rwdContract]);

  return { tetherContract, rwdContract, decentralBankContract};
});