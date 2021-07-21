/* eslint-disable no-undef */

// Script that allows the deployer to issue tokens
// We'll need this for when we build the front end of the app
// truffle exec scripts/issue-tokens.js
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(callback) {
    let tokenFarm = await TokenFarm.deployed()
    await tokenFarm.issueTokens()
    console.log("Tokens issued!")
    callback()
  }