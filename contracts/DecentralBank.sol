//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Tether.sol";
import "./RWD.sol";

contract DecentralBank{
	string public name = 'Decentral Bank';
	address public owner;
	Tether public tether;
    RWD public rwd;

    constructor(Tether _tether, RWD _rwd) {
        tether = _tether;
        rwd = _rwd;
    }
}