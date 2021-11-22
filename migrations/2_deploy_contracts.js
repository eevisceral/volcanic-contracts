// require('dotenv').config();
var Multicall = artifacts.require("./Multicall");
var Lava = artifacts.require("./LavaToken");
var LavaMasterChef = artifacts.require("./MasterChef");
const admin = '0x87e42684b1c1468f18e09342ea803f34b917ef32';

// module.exports = function(deployer) {
//   deployer.deploy(Lava).then(function(){
//         return deployer.deploy(LavaMasterChef, Lava.address, admin, admin, "1000000000000000000", 4)
// });
// };

module.exports = function (deployer) {
  // deploy Multicall first
  deployer.deploy(Multicall);
  // deploy Lava ERC20 before calling it in MasterChef
  deployer.deploy(Lava).then(async () => {
    // get JS instance of deployed ERC20 contract
    const lavaInstance = await Lava.deployed();
    // pass its address as argument for MasterChef's constructors
    await deployer.deploy(LavaMasterChef, Lava.address, admin, admin, "3000000000000000", 23777777);
                          // {_tokenAddress, _devaddr, _feeAddress, _LavaPerBlock, _startBlock}
  });
};
