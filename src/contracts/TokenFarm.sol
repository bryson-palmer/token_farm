pragma solidity ^0.5.0; 

// Import smart contracts to be used in TokenFarm contract
import "./DappToken.sol";
import "./DaiToken.sol";

// Smart contract for TokenFarm
contract TokenFarm {
    
    // Setting
    string public name = "Dapp Token Farm";
    // DappToken is the type of smart contract with public visibility set as a state variable
    DappToken public dappToken;
    // DaiToken is the type of smart contract with public visibility set as a state variable
    DaiToken public daiToken;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {

        // Assigning state variable (dappToken, daiToken) the local variable's address (_dappToken, _daiToken)
        dappToken = _dappToken;
        daiToken = _daiToken;
    }
}
