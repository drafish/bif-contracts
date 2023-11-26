'use strict';
const FUNDATION = "_fundation";
const NAME = "_name";
const SYMBOL = "_symbol";
const URI = "_uri";
const ALLTOKENS = "_allTokens";
const BALANCES = "_balances";
const OPERATORAPPROVALS = "_operatorApprovals";
const sender_g = Chain.msg.sender;
const chainCode_g = Chain.chainCode;
function isContractOwner() {
  var owner = Chain.load(FUNDATION);
  if (Chain.msg.sender === owner) {
    return true;
  } else {
    Utils.log("onlyFundation can call this method!");
    return false;
  }
}
function _setURI(newuri) {
  Chain.tlog('URI', newuri);
  Chain.store(URI, newuri);
}
function setURI(params) {
  if (isContractOwner() === false) {
    Utils.log('setURI' + Chain.msg.sender);
    return;
  }
  var uri = params.uri;
  _setURI(uri);
}
function init(input_str) {
  var params = JSON.parse(input_str);
  Utils.log('input_str: (' + input_str + ').');
  if (params.name === undefined || params.symbol === undefined || params.uri === undefined || !params.name.length || !params.symbol.length || !params.uri.length) {
    Utils.assert(false, "DNA1155: init  params is invalid, please check!");
  }
  Chain.store(NAME, params.name);
  Chain.store(SYMBOL, params.symbol);
  _setURI(params.uri);
  Chain.store(FUNDATION, sender_g);
}
function name() {
  return Chain.load(NAME);
}
function symbol() {
  return Chain.load(SYMBOL);
}
function _exists(tokenId) {
  var tokens = {};
  var dataToken = JSON.parse(Chain.load(ALLTOKENS));
  if (dataToken) {
    tokens = dataToken;
  }
  if (tokens[tokenId] === undefined || tokens[tokenId] === 0) {
    return false;
  } else {
    return true;
  }
}
function _uri(tokenId) {
  Utils.log('tokenId: ' + tokenId);
  Utils.assert(_exists(tokenId), "DNA1155: URI query for nonexistent token");
  var uri = Chain.load(URI);
  if (uri.length > 0) {
    return uri + tokenId;
  }
  return "";
}
function uri(params) {
  var tokenId = params.tokenId;
  Utils.assert(Utils.addressCheck(tokenId), "DNA1155: uri params: tokenId is invalid bid address");
  return _uri(tokenId);
}
function _getBalanceOf(id, account) {
  var balances = {};
  var data = JSON.parse(Chain.load(BALANCES));
  if (data) {
    balances = data;
  }
  var inner_balances = {};
  if (balances[id] === undefined) {
    balances[id] = inner_balances;
  }
  if (balances[id][account] === undefined) {
    return 0;
  }
  return balances[id][account];
}
function _setBalanceOfForKey(id, account, value) {
  var balances = {};
  var data = JSON.parse(Chain.load(BALANCES));
  if (data) {
    balances = data;
  }
  var inner_balances = {};
  if (balances[id] === undefined) {
    balances[id] = inner_balances;
  }
  balances[id][account] = value;
  Utils.log("balances:" + balances);
  Chain.store(BALANCES, JSON.stringify(balances));
}
function balanceOf(params) {
  var account = params.account;
  var id = params.id;
  Utils.assert(Utils.addressCheck(account), "DNA1155: balanceOf params: owner is invalid bid address");
  Utils.assert(Utils.addressCheck(id), "DNA1155: balanceOf params: tokenId is invalid bid address");
  return _getBalanceOf(id, account);
}
function balanceOfBatch(params) {
  var accounts = params.accounts;
  var ids = params.ids;
  Utils.assert(accounts.length === ids.length, "ERC1155: accounts and ids length mismatch");
  var batchBalances = [];
  var i = 0;
  for (i = 0; i < accounts.length; i += 1) {
    Utils.assert(Utils.addressCheck(accounts[i]), "DNA1155: balanceOfBatch params: owner is invalid bid address");
    Utils.assert(Utils.addressCheck(ids[i]), "DNA1155: balanceOfBatch params: tokenId is invalid bid address");
    batchBalances[i] = _getBalanceOf(ids[i], accounts[i]);
  }
  return JSON.stringify(batchBalances);
}
function __setAllApproved(owner, to, isAllApproved) {
  var allApproved = {};
  var data = JSON.parse(Chain.load(OPERATORAPPROVALS));
  if (data) {
    allApproved = data;
  }
  var inner_allApproved = {};
  if (allApproved[owner] === undefined) {
    allApproved[owner] = inner_allApproved;
  }
  allApproved[owner][to] = isAllApproved;
  Utils.log("allApproved:" + allApproved);
  Chain.store(OPERATORAPPROVALS, JSON.stringify(allApproved));
}
function _setApprovalForAll(owner, operator, isApproved) {
  Utils.assert(owner !== operator, "ERC1155: setting approval status for self");
  __setAllApproved(owner, operator, isApproved);
  Chain.tlog('ApprovalForAll', owner, operator, isApproved);
}
function setApprovalForAll(params) {
  var operator = params.operator;
  var isApproved = params.isApproved;
  Utils.assert(Utils.addressCheck(operator), "ERC1155: setApprovalForAll params: operator is invalid bid address");
  _setApprovalForAll(sender_g, operator, isApproved);
}
function __getIsAllApproved(owner, to) {
  var allApproved = {};
  var data = JSON.parse(Chain.load(OPERATORAPPROVALS));
  if (data) {
    allApproved = data;
  }
  var inner_allApproved = {};
  if (allApproved[owner] === undefined) {
    allApproved[owner] = inner_allApproved;
  }
  if (allApproved[owner][to] === undefined) {
    return false;
  }
  return allApproved[owner][to];
}
function _isApprovedForAll(owner, operator) {
  Utils.assert(Utils.addressCheck(owner), "ERC1155: _isApprovedForAll params: owner is invalid bid address");
  Utils.assert(Utils.addressCheck(operator), "ERC1155: _isApprovedForAll params: operator is invalid bid address");
  return __getIsAllApproved(owner, operator);
}
function isApprovedForAll(params) {
  var account = params.account;
  var operator = params.operator;
  return _isApprovedForAll(account, operator);
}
function _safeTransferFrom(from, to, id, amount, data) {
  Utils.assert(to.length > 0, "ERC1155: transfer to the zero address");
  var operator = sender_g;
  var fromBalance = _getBalanceOf(id, from);
  Utils.assert(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
  _setBalanceOfForKey(id, from, fromBalance - amount);
  var toBalance = _getBalanceOf(id, to);
  _setBalanceOfForKey(id, to, toBalance + amount);
  Chain.tlog('TransferSingle', operator, from, to, id, amount);
}
function _checkAmount(amount) {
  Utils.assert(amount !== undefined, "ERC1155: params: amount must have a value");
  Utils.assert(amount > 0, "ERC1155: params: amount must > 0");
  Utils.assert(amount % 1 === 0, "ERC1155 params: your amount should be int");
}
function safeTransferFrom(params) {
  var from = params.from;
  var to = params.to;
  var id = params.id;
  var amount = params.amount;
  var data = params.data;
  Utils.assert(Utils.addressCheck(from), "ERC1155: safeTransferFrom params: from is invalid bid address");
  Utils.assert(Utils.addressCheck(to), "ERC1155: safeTransferFrom params: to is invalid bid address");
  Utils.assert(Utils.addressCheck(id), "ERC1155: safeTransferFrom params: id is invalid bid address");
  _checkAmount(amount);
  Utils.assert(from === sender_g || _isApprovedForAll(from, sender_g), "ERC1155: caller is not owner nor approved");
  _safeTransferFrom(from, to, id, amount, data);
}
function _safeBatchTransferFrom(from, to, ids, amounts, data) {
  Utils.assert(ids.length === amounts.length, "ERC1155:  ids and amounts length mismatch");
  Utils.assert(to.length > 0, "ERC1155:  transfer to the zero address");
  var operator = sender_g;
  var i = 0;
  var id;
  var amount;
  var fromBalance;
  var toBalance;
  for (i = 0; i < ids.length; i += 1) {
    id = ids[i];
    amount = amounts[i];
    _checkAmount(amount);
    fromBalance = _getBalanceOf(id, from);
    Utils.assert(fromBalance >= amount, "ERC1155:  insufficient balance for transfer");
    _setBalanceOfForKey(id, from, fromBalance - amount);
    toBalance = _getBalanceOf(id, to);
    _setBalanceOfForKey(id, to, toBalance + amount);
  }
  Chain.tlog('TransferBatch', operator, from, to, JSON.stringify(ids), JSON.stringify(amounts));
}
function safeBatchTransferFrom(params) {
  var from = params.from;
  var to = params.to;
  var ids = params.ids;
  var amounts = params.amounts;
  var data = params.data;
  Utils.assert(Utils.addressCheck(from), "ERC1155: safeBatchTransferFrom params: from is invalid bid address");
  Utils.assert(Utils.addressCheck(to), "ERC1155: safeBatchTransferFrom params: to is invalid bid address");
  var i = 0;
  for (i = 0; i < ids.length; i += 1) {
    Utils.assert(Utils.addressCheck(ids[i]), "ERC1155: safeBatchTransferFrom params: id is invalid bid address");
  }
  Utils.assert(from === sender_g || _isApprovedForAll(from, sender_g), "ERC1155: caller is not owner nor approved");
  _safeBatchTransferFrom(from, to, ids, amounts, data);
}
function _addTokenToAllTokensEnumeration(tokenId, amount) {
  var allTokens = {};
  var dataAll = JSON.parse(Chain.load(ALLTOKENS));
  if (dataAll) {
    allTokens = dataAll;
  }
  var counter = 0;
  if (allTokens[tokenId] === undefined) {
    allTokens[tokenId] = counter;
  }
  allTokens[tokenId] += amount;
  Chain.store(ALLTOKENS, JSON.stringify(allTokens));
}
function mint(params) {
  if (isContractOwner() === false) {
    Utils.log('mint' + Chain.msg.sender);
    return;
  }
  var to = params.to;
  var id = params.id;
  var amount = params.amount;
  var data = params.data;
  Utils.assert(Utils.addressCheck(to), "ERC1155: mint params: to is invalid bid address");
  Utils.assert(Utils.addressCheck(id), "ERC1155: mint params: id is invalid bid address");
  _checkAmount(amount);
  var operator = sender_g;
  var toBalance = _getBalanceOf(id, to);
  _setBalanceOfForKey(id, to, toBalance + amount);
  _addTokenToAllTokensEnumeration(id, amount);
  Chain.tlog('TransferSingle', operator, "", to, id, amount);
}
function mintBatch(params) {
  if (isContractOwner() === false) {
    Utils.log('mint' + Chain.msg.sender);
    return;
  }
  var to = params.to;
  var ids = params.ids;
  var amounts = params.amounts;
  var data = params.data;
  Utils.assert(Utils.addressCheck(to), "ERC1155: mintBatch params: to is invalid bid address");
  Utils.assert(ids.length === amounts.length, "ERC1155: ids and amounts length mismatch");
  Utils.log('mintBatch-ids: (' + ids + ').');
  Utils.log('mintBatch-amounts: (' + amounts + ').');
  var operator = sender_g;
  var i = 0;
  var toBalance;
  for (i = 0; i < ids.length; i += 1) {
    Utils.assert(Utils.addressCheck(ids[i]), "ERC1155: mintBatch params: id is invalid bid address");
    _checkAmount(amounts[i]);
    toBalance = _getBalanceOf(ids[i], to);
    _setBalanceOfForKey(ids[i], to, toBalance + amounts[i]);
    _addTokenToAllTokensEnumeration(ids[i], amounts[i]);
  }
  Chain.tlog('TransferBatch', operator, "", to, JSON.stringify(ids), JSON.stringify(amounts));
}
function _totalSupply(tokenId) {
  var allTokens = {};
  var dataAll = JSON.parse(Chain.load(ALLTOKENS));
  if (dataAll) {
    allTokens = dataAll;
  }
  var counter = 0;
  if (allTokens[tokenId] === undefined) {
    allTokens[tokenId] = counter;
  }
  return allTokens[tokenId];
}
function totalSupply(params) {
  var tokenId = params.tokenId;
  Utils.assert(Utils.addressCheck(tokenId), "ERC1155: totalSupply params: tokenId is invalid bid address");
  return _totalSupply(tokenId);
}
function main(input_str) {
  var input = JSON.parse(input_str);
  if (input.method === 'mint') {
    mint(input.params);
  } else if (input.method === 'mintBatch') {
    mintBatch(input.params);
  } else if (input.method === 'safeTransferFrom') {
    safeTransferFrom(input.params);
  } else if (input.method === 'safeBatchTransferFrom') {
    safeBatchTransferFrom(input.params);
  } else if (input.method === 'setApprovalForAll') {
    setApprovalForAll(input.params);
  } else if (input.method === 'setURI') {
    setURI(input.params);
  } else {
    throw '<Main interface passes an invalid operation type>';
  }
}
function query(input_str) {
  var input = JSON.parse(input_str);
  var object = {};
  if (input.method === 'name') {
    object = name();
  } else if (input.method === 'symbol') {
    object = symbol();
  } else if (input.method === 'uri') {
    object = uri(input.params);
  } else if (input.method === 'totalSupply') {
    object = totalSupply(input.params);
  } else if (input.method === 'balanceOf') {
    object = balanceOf(input.params);
  } else if (input.method === 'balanceOfBatch') {
    object = balanceOfBatch(input.params);
  } else if (input.method === 'isApprovedForAll') {
    object = isApprovedForAll(input.params);
  } else {
    throw '<unidentified operation type>';
  }
  return JSON.stringify(object);
}
