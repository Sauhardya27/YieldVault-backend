//SPDX-License-Identifier: MIT 
pragma solidity 0.8.26;

contract Hello {
	string public helloName;
	uint public helloCap;

	constructor(string memory _name, uint _cap){
		helloName = _name;
		helloCap = _cap;
	}
}