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
}