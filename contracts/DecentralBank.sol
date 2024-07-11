//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Tether.sol";
import "./RWD.sol";

contract DecentralBank{
	string public name = 'Decentral Bank';
	address public owner;
	Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Tether _tether, RWD _rwd) {
        tether = _tether;
        rwd = _rwd;
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Sender is not owner!");
        _;
    }

    //Staking function
    function depositTokens(uint256 _amount) public {
        //Require staking amount tobe greater than zero
        require(_amount > 0, "Amount cannot be zero");

        //Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //Update staking balance
        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender])
            stakers.push(msg.sender);

        //Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //unstake Tokens
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance can't be less than zero");

        //transfer the tokens to the specified contract address from our DecentralBank
        tether.transfer(msg.sender, balance);

        //reset staking balance
        stakingBalance[msg.sender] = 0;

        //Update staking status
        isStaking[msg.sender] = false;
    }

    //issue Rewards
    function issueTokens() onlyOwner public {
        for(uint i=0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient]/9;
            if(balance > 0)
                rwd.transfer(recipient, balance);
        }
    }
}