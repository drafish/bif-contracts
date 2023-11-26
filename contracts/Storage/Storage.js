"use strict";

const number = '_number';

function init(input)
{
    const {num, num1} = JSON.parse(input);
    Chain.store(number, String(num + num1));
    Chain.tlog('Log', String(num));
    Chain.tlog('Log1', String(num1));
    return;
}
function store({num}) {
    Chain.store(number, String(num));
    Chain.tlog('Log', String(num));
}

function store1({num}) {
    Chain.store(number, String(num));
}

function main(input)
{
    let {method, params} = JSON.parse(input);
    if (method === 'store')
    {
        store(params);
    } else if (method === 'store1') {
        store1(params);
    }
}

function retrieve({num}) {
    return String(Number(Chain.load(number)) + num);
}

function query(input)
{
    let {method, params} = JSON.parse(input);
    if (method === 'retrieve')
    {
        return JSON.stringify(retrieve(params));
    }
}
