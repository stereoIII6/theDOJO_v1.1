require('dotenv').config();

// const s0xiety = artifacts.require("s0xiety");
const dynMem = artifacts.require("dynMem");


module.exports = function (deployer) {
  // deployer.deploy(s0xiety, process.env.ADMIN);
  deployer.deploy(dynMem);

};

