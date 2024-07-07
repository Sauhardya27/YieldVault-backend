const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MigrationModule", (m) => {

  const migrationContract = m.contract("Migrations", []);

  return { migrationContract };
});
