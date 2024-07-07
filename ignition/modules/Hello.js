const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloModule", (m) => {

  const helloContract = m.contract("Hello", ["silopiName", 100]);

  return { helloContract };
});
