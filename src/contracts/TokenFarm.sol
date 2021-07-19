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

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {

        // Assigning state variable (dappToken, daiToken) the local variable's address (_dappToken, _daiToken)
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    // 1. Staking Tokens (Depositing)
    function stakeTokens(uint _amount) public {
        // Transfer Mock Dai Tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //  Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // 2. Unstaking Tokens (Withdrawing)

    // 3. Issuing Tokens (Earning Interest)

}
