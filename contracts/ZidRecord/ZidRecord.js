'use strict';


//ZID  data操作
const ZidOp = {
    'INS'                : '0',      //insert
    'DEL'                : '1',      //delete
    'MOD'                : '2',       //modify
	'QUERY'				 : '3'       //query
};

const ZID_RECORD_PRE = 'zidrecord';
const GHR_ZID_INIT = 'ghr_zid_init';
const SHR_ZID_INIT = 'shr_zid_init';
const LHS_ZID_INIT = 'lhs_zid_init';

/*
    ***********************************
                事件定义
    ***********************************
*/
//白名单设置
const TLOG_SET_WT = 'tlog_set_wt';

//创建标识事件
const TLOG_ZID_CREATE_CONTRACT_ADDRESS = 'tlog_zid_create_contract_address';

//修改标识事件
const TLOG_ZID_MODIFY_CONTRACT_ADDRESS = 'tlog_zid_modify_contract_address';

//删除标识事件
const TLOG_ZID_REMOVE_CONTRACT_ADDRESS = 'tlog_zid_remove_contract_address';


/*
    ***********************************
                权限控制
    ***********************************
*/
function isValidator(addr){
    return Chain.isValidator(addr);
}

function getWhiteKey(addr){
    return 'wk-' + addr;
}
  
function checkInAuditWhitelist(addr) {
    const res = Chain.load(getWhiteKey(addr));
    return res !== false;
}

function getKey(first, second, third = ''){
    return (third === '') ? (first + '_' + second) : (first + '_' + second + '_' + third);
}

function loadObj(key){
	let data = Chain.load(getKey(ZID_RECORD_PRE,key));
	return JSON.parse(data);
}

/* 
    函数名称：setAuditWhitelist()
    函数描述：白名单注册接口；该接口需要验证者账户调用
    调用方式：main
    参数：
        caller_address         待操作白名单账户
        addFlag         操作
    返回值：无
*/
function setAuditWhitelist(paramObj) {
    Utils.assert(paramObj.caller_address !== undefined, 'Param obj has no caller_address');
    Utils.assert(paramObj.addFlag !== undefined, 'Param obj has no addFlag');

    Utils.assert(Utils.addressCheck(paramObj.caller_address), `The caller_address(${paramObj.caller_address}) is invalid`);
    Utils.assert(typeof paramObj.addFlag === 'boolean', `The addFlag(${paramObj.addFlag}) is invalid`);

    //isValidator check
    Utils.assert(isValidator(Chain.msg.sender), `The caller_address(${Chain.msg.sender}) is not validator`);
    
    if (paramObj.addFlag === true) {
        Utils.assert(loadObj(getWhiteKey(paramObj.caller_address)) === false, `The account(${paramObj.caller_address}) is already in whitelist`);
        Chain.store(getWhiteKey(paramObj.caller_address), '');
    } else {
        Chain.del(getWhiteKey(paramObj.caller_address));
    }

    Chain.tlog(TLOG_SET_WT, Chain.msg.sender, paramObj.caller_address, `${paramObj.addFlag}`);
}

function createZidValue(key, value){
    Chain.store(getKey(ZID_RECORD_PRE, key), JSON.stringify(value));
}

function deleteZidValue(key){
    Chain.del(getKey(ZID_RECORD_PRE,key));
}

function modifyZidValue(key, value) {
    deleteZidValue(key);
    createZidValue(key, value);
} 

function queryZidRecord(paramObj){
    Utils.assert(paramObj.zid !== undefined, 'Param obj has no zid');
	
    return loadObj(paramObj.zid);
}
/* 
    函数名称：createZidData()
    函数描述：创建标识;

    调用方式：main
    参数：
        zid             标识
        value        	标识值数组
		index			标识值索引
		type			标识类型
		data			标识数据结构
		format			数据格式
		value			标识值
		ttl				ttl值
		ttlType			ttl类型
		timestamp		时间戳
		references		引用
		adminRead		管理员可读
		adminWrite		管理员可写
		publicRead		公共可读
		publicWrite		公共可写
    返回值：
        无
*/
function createZidData(paramObj) {
    //check param
    Utils.assert(paramObj.zid !== undefined, 'Param obj has no zid');
    Utils.assert(paramObj.value[0].index !== undefined, 'Param obj has no index');
    Utils.assert(paramObj.value[0].type !== undefined, 'Param obj has no type');
    Utils.assert(paramObj.value[0].data.format !== undefined, 'Param obj has no format');
	Utils.assert(paramObj.value[0].data.value !== undefined, 'Param obj has no data value');
	Utils.assert(paramObj.value[0].ttl !== undefined, 'Param obj has no ttl');
	Utils.assert(paramObj.value[0].ttlType !== undefined, 'Param obj has no ttl');
	Utils.assert(paramObj.value[0].timestamp !== undefined, 'Param obj has no timestamp');

    //检测操作权限
    Utils.assert(checkInAuditWhitelist(Chain.msg.sender), `The address(${Chain.msg.sender}) checkInAuditWhitelist error`);
	
	//判断对应zid是否已存在
	Utils.assert(loadObj(paramObj.zid) === false, 'createZidData exist of zid:' + paramObj.zid);
	
	let regiRecord = {  
	    'value': [{
		'index': paramObj.value[0].index,
		'type': paramObj.value[0].type,
		'data': {
			'format': paramObj.value[0].data.format,
			'value': paramObj.value[0].data.value
		},
		'ttl': paramObj.value[0].ttl,
		'ttlType': paramObj.value[0].ttlType,
		'timestamp': paramObj.value[0].timestamp,
		'references': paramObj.value[0].references,
		'adminRead': paramObj.value[0].adminRead,
		'adminWrite': paramObj.value[0].adminWrite,
		'publicRead': paramObj.value[0].publicRead,
		'publicWrite': paramObj.value[0].publicWrite
	}]
    };
	
    createZidValue(paramObj.zid, regiRecord);
	Chain.tlog(TLOG_ZID_CREATE_CONTRACT_ADDRESS, 'zid data record', 'create', paramObj.zid);
}

function removeZidData(paramObj) {
	//check param
	Utils.assert(paramObj.zid !== undefined, 'Param obj has no zid');
	if(paramObj.opFlag === ZidOp.DEL)
	{
		 //检测操作权限
		Utils.assert(checkInAuditWhitelist(Chain.msg.sender), `The address(${Chain.msg.sender}) checkInAuditWhitelist error`);
		
		deleteZidValue(paramObj.zid);
		Chain.tlog(TLOG_ZID_REMOVE_CONTRACT_ADDRESS, 'zid data record', 'remove', paramObj.zid);
	}
}

function modifyZidData(paramObj) {
	//check param
    Utils.assert(paramObj.zid !== undefined, 'Param obj has no zid');
	Utils.assert(paramObj.opFlag !== undefined, 'Param obj has no opFlag');
    Utils.assert(paramObj.value[0].index !== undefined, 'Param obj has no index');
    Utils.assert(paramObj.value[0].type !== undefined, 'Param obj has no type');
    Utils.assert(paramObj.value[0].data.format !== undefined, 'Param obj has no format');
	Utils.assert(paramObj.value[0].data.value !== undefined, 'Param obj has no data value');
	Utils.assert(paramObj.value[0].ttl !== undefined, 'Param obj has no ttl');
	Utils.assert(paramObj.value[0].ttlType !== undefined, 'Param obj has no ttl');
	Utils.assert(paramObj.value[0].timestamp !== undefined, 'Param obj has no timestamp');
	
    //检测操作权限
    Utils.assert(checkInAuditWhitelist(Chain.msg.sender), `The address(${Chain.msg.sender}) checkInAuditWhitelist error`);
	
	//判断对应zid是否已存在
	Utils.assert(loadObj(paramObj.zid) === false, 'modifyZidData exist of zid:' + paramObj.zid);
	if(paramObj.opFlag === ZidOp.MOD)
	{
		let modifyRecord = {  
	    'value': [{
		'index': paramObj.value[0].index,
		'type': paramObj.value[0].type,
		'data': {
			'format': paramObj.value[0].data.format,
			'value': paramObj.value[0].data.value
		},
		'ttl': paramObj.value[0].ttl,
		'ttlType': paramObj.value[0].ttlType,
		'timestamp': paramObj.value[0].timestamp,
		'references': paramObj.value[0].references,
		'adminRead': paramObj.value[0].adminRead,
		'adminWrite': paramObj.value[0].adminWrite,
		'publicRead': paramObj.value[0].publicRead,
		'publicWrite': paramObj.value[0].publicWrite
		}]
		};
	
		modifyZidValue(paramObj.zid, modifyRecord);
		Chain.tlog(TLOG_ZID_MODIFY_CONTRACT_ADDRESS, 'zid data record', 'modify', paramObj.zid);
		
	}
}
/*
    ***********************************
                调用入口
    ***********************************
*/

function init(input){
	let inputObj = JSON.parse(input);
    if (inputObj.type === GHR_ZID_INIT){
        Chain.store(GHR_ZID_INIT, 'TRUE');
    }
	else if(inputObj.type === SHR_ZID_INIT)
	{
		Chain.store(SHR_ZID_INIT, 'TRUE');
	}
    else if(inputObj.type === LHS_ZID_INIT)
	{
		Chain.store(LHS_ZID_INIT, 'TRUE');
	}
    return;
}

function main(input){
    let funcList = {
        //验证者账户设置白名单
        'setAuditWhitelist' : setAuditWhitelist,
        //标识功能接口
        'createZidData' : createZidData,
        'modifyZidData' : modifyZidData,
        'removeZidData' : removeZidData
    };
    let inputObj = JSON.parse(input);
    Utils.assert(funcList.hasOwnProperty(inputObj.method) && typeof funcList[inputObj.method] === 'function', 'Cannot find func:' + inputObj.method);
    funcList[inputObj.method](inputObj.params);
}

function query(input){
    let result = {};
    let inputObj = JSON.parse(input);
    if (inputObj.method === 'queryZidRecord'){
        result = queryZidRecord(inputObj.params);
    }
    return JSON.stringify(result);
}