const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TetherModule", (m) => {

  const tetherContract = m.contract("Tether", []);

  return { tetherContract };
});
