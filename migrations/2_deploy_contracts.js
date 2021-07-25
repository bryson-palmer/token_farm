const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  // Puts all the smart contracts on the network

  // Deployer

  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  // Fetch it back and assign it to a variable
  const daiToken = await DaiToken.deployed()

  // Deploy Dapp Token
  await deployer.deploy(DappToken)
  // Fetch it back and assign it to a variable
  const dappToken = await DappToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  // Fetch it back and assign it to a variable
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm (1million)
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Investor
  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '100000000000000000000')
}