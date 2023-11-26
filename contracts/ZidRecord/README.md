## JS
### init -- constructor
**with abi**
```
// GHR合约部署
'ghr_zid_init'

// SHR合约部署
'shr_zid_init'

// LHS合约部署
'lhs_zid_init'
```

**without abi**
```
// GHR合约部署
"{'type':'ghr_zid_init'}"

// SHR合约部署
"{'type':'shr_zid_init'}"

// LHS合约部署
"{'type':'lhs_zid_init'}"
```

### setAuditWhitelist
**with abi**
```
"'did:bid:efuEAGFPJMsojwPGKzjD8vZX1wbaUrVV',true"
```

**without abi**
```
{'method':'setAuditWhitelist','params':{'caller_address':'did:bid:efuEAGFPJMsojwPGKzjD8vZX1wbaUrVV','addFlag':true}}
```

### createZidData
**with abi**
```
"'88.1000','0',[{'index':'1','type':'contract_address','data':{'format':'string','value':'did:bid:efuEAGFPJMsojwPGKzjkkk89jky'},'ttl':'86400','ttlType':'0','timestamp':'0','references':[],'adminRead':'1','adminWrite':'1','publicRead':'1','publicWrite':'0'}]"
```

**without abi**
```
{'method':'createZidData','params':{'zid':'88.1000','opFlag':'0','value':[{'index':'1','type':'contract_address','data':{'format':'string','value':'did:bid:efuEAGFPJMsojwPGKzjkkk89jky'},'ttl':'86400','ttlType':'0','timestamp':'0','references':[],'adminRead':'1','adminWrite':'1','publicRead':'1','publicWrite':'0'}]}}
```

### removeZidData
**with abi**
```
"'88.1000','contract_address','1'"
```

**without abi**
```
{'method':'removeZidData','params':{'zid':'88.1000','type':'contract_address','opFlag':'1'}}
```

### queryZidRecord
**with abi**
```
"'contract_address','88.1000'"
```

**without abi**
```
{'method':'queryZidRecord','params':{'type':'contract_address','zid':'88.1000'}}
```
