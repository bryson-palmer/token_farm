pragma solidity ^0.5.0;

// Import smart contracts to be used in TokenFarm contract
import "./DappToken.sol";
import "./DaiToken.sol";

// Smart contract for TokenFarm
contract TokenFarm {

    // Setting
    string public name = "Dapp Token Farm";
    // State variable to keep track of the owner
    address public owner;
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
         // Person who deployed the contract. Assign owner upon deployment
        owner = msg.sender;
    }

    // Staking Tokens (Depositing)
    // Investors stake tokens with dappFarm
    function stakeTokens(uint _amount) public {

        // Require staking amount to be greater than 0
        // If require evaluates to false, then none of the code after will execute
        require(_amount > 0, "amount cannot be 0");

        // Transfer Mock Dai Tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Keeps track of all who have staked with dappFarm
        // Add user to stakers array *only* if they haven't staked already
        // Will be used with rewards later
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Issuing Tokens (Earning Interest)
    function issueTokens() public {

        // Only the owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // For every investor in the stakers array who has staked with dappFarm issue dappTokens
        for (uint i=0; i<stakers.length; i++) {

            // Feth the investors address
            address recipient = stakers[i];

            // Fetch their balance
            uint balance = stakingBalance[recipient];

            // Only if investor/staker has a balance greater than 0
            if(balance > 0) {

                // Send them the exact same amount of dappTokens
                dappToken.transfer(recipient, balance);
            }
        }
    }
    // Unstaking Tokens (Withdrawing)
    function unstakeTokens() public {

        // Fetch staking balance from stakingBalance mapping
        uint balance = stakingBalance[msg.sender];

        // Require amount to be greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens back to the user
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance to 0
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }
}