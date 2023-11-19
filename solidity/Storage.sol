// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.26;

contract Storage {

    uint256 number;

    event Log(uint256 num);
    event Log1(uint256 num);

    constructor(uint256 num, uint256 num1) public {
        number = num + num1;
        emit Log(num);
        emit Log1(num1);
    }

    function store(uint256 num) public {
        number = num;
        emit Log(num);
        emit Log1(num);
    }

    function store1(uint256 num) public {
        number = num;
    }

    function retrieve(uint256 num) public view returns (uint256){
        return number + num;
    }
}
