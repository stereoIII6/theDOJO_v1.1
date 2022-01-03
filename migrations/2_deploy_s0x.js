require('dotenv').config();

const s0xiety = artifacts.require("s0xiety");


module.exports = function (deployer) {
  deployer.deploy(s0xiety, process.env.ADMIN);

};

