//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tether {
	string public name = 'Mock Tether Token';
	string public symbol = 'USDT';
	uint256 public totalSupply = 1000000000000000000000000;
	uint8 public decimals = 18;

	event Transfer (
		address indexed _from,
		address indexed _to,
		uint256 _value
	);

	event Approval (
		address indexed _owner,
		address indexed _spender,
		uint256 _value
	);

	mapping(address => uint256) public balanceOf;
	mapping(address => mapping(address => uint256)) public allowance;
	//This is a nested mapping where:
	//The first address key represents the owner of the tokens.
	//The second address key represents the spender who is allowed to spend the tokens on behalf of the owner.
	//The uint256 value represents the amount of tokens the spender is allowed to spend on behalf of the owner.

	constructor(){
		balanceOf[msg.sender] = totalSupply;
	}

	function transfer(address _to, uint256 _value) public returns (bool success) {
		require(balanceOf[msg.sender] >= _value, "Owner doesn't have enough money to transfer");

		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}

	function approve (address _spender, uint256 _value) public returns (bool success) {
		allowance[msg.sender][_spender] = _value;
		emit Approval(msg.sender, _spender, _value);
		return true;
	}

	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		require(balanceOf[_from] >= _value, "Owner doesn't have enough money to transfer");
		require(allowance[_from][msg.sender] >= _value, "Transfer amount exceeds allowance");

		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		allowance[_from][msg.sender] -= _value;
		emit Transfer(_from, _to, _value);
		return true;
	}
}

