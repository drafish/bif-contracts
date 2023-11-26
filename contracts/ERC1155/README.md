## Solidity
### ERC1155(string) -- constructor
```
https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6476
```

### mint(address,uint256,uint256,bytes)
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,1,10,0x444e412031313535
```

### mintBatch(address,uint256[],uint256[],bytes)
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,[2,3],[10,100],0x444e412031313535
```

### safeTransferFrom(address,address,uint256,uint256,bytes)
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:efdvn6cS5TZgiM5ffVN9HQh3y72raYtm,1,1,0x73616665207472616e736665722066726f6d
```

### safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:efdvn6cS5TZgiM5ffVN9HQh3y72raYtm,[2,3],[1,1],0x73616665207472616e736665722066726f6d
```

### setApprovalForAll(address,bool)
```
did:bid:efdvn6cS5TZgiM5ffVN9HQh3y72raYtm,1
```

### balanceOf(address,uint256)
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,2
```

### balanceOfBatch(address[],uint256[])
```
[did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i],[2]
```

### isApprovedForAll(address,address)
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:efdvn6cS5TZgiM5ffVN9HQh3y72raYtm
```

### uri(uint256)
```
5
```

## JS
### init -- constructor
**with abi**
```
xinghuo space nft 1155,DNA,https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6476
```

**without abi**
```
"{'name':'xinghuo space nft 1155','symbol':'DNA','uri':'https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6476'}"
```

### mint
**with abi**
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:ef29yYZGjWo4ZhwfkmGg7qrNyqa5BCQPc,5,1155 JS
```

**without abi**
```
"{'method':'mint','params':{'to':'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','id':'did:bid:ef29yYZGjWo4ZhwfkmGg7qrNyqa5BCQPc','amount':5,'data':'1155 JS'}}"
```

### mintBatch
**with abi**
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,[did:bid:zf23wR1NxfzTY6qRjo1zs8TjPnW6SHVsc,did:bid:zf23wR1NxfzTY6qRjo1zs8TjPnW6SHVsc,did:bid:zf2AHtw8YGgKPCyye2GMu56Wtjngvfdbg],[1,1,2],1155 JS
```

**without abi**
```
"{'method':'mintBatch','params':{'to':'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','ids':['did:bid:zf23wR1NxfzTY6qRjo1zs8TjPnW6SHVsc','did:bid:zf23wR1NxfzTY6qRjo1zs8TjPnW6SHVsc','did:bid:zf2AHtw8YGgKPCyye2GMu56Wtjngvfdbg'],'amounts':[1,1,2],'data':'1155 JS'}}"
```

### safeTransferFrom
**with abi**
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU,did:bid:ef29yYZGjWo4ZhwfkmGg7qrNyqa5BCQPc,5,safe transfer with data
```

**without abi**
```
"{'method':'safeTransferFrom','params':{'from':'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','to':'did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU','id':'did:bid:ef29yYZGjWo4ZhwfkmGg7qrNyqa5BCQPc','amount':5,'data':'safe transfer with data'}}"
```

### safeBatchTransferFrom
**with abi**
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU,[did:bid:zf23wR1NxfzTY6qRjo1zs8TjPnW6SHVsc,did:bid:zf2AHtw8YGgKPCyye2GMu56Wtjngvfdbg],[1,2],safe transfer with data
```

**without abi**
```
"{'method':'safeBatchTransferFrom','params':{'from':'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','to':'did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU','ids':['did:bid:zf23wR1NxfzTY6qRjo1zs8TjPnW6SHVsc','did:bid:zf2AHtw8YGgKPCyye2GMu56Wtjngvfdbg'],'amounts':[1,2],'data':'safe transfer with data'}}"
```

### setApprovalForAll
**with abi**
```
did:bid:efHSbC7AedduvEG5hbtUio4mZmzwGhse,true
```

**without abi**
```
"{'method':'setApprovalForAll','params':{'operator':'did:bid:efHSbC7AedduvEG5hbtUio4mZmzwGhse','isApproved':true}}"
```

### balanceOf
**with abi**
```
did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU,did:bid:zf23wR1NxfzTY6qRjo1zs8TjPnW6SHVsc
```

**without abi**
```
"{'method':'balanceOf','params':{'account':'did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU','id':'did:bid:zf23wR1NxfzTY6qRjo1zs8TjPnW6SHVsc'}}"
```

### balanceOfBatch
**with abi**
```
[did:bid:ef21SesYy12yP9Pq24KQun3Xkk684gDuk,did:bid:ef21SesYy12yP9Pq24KQun3Xkk684gDuk],[did:bid:efTMqg6qLb1pT34NdLjCXKwAxnCd5ELr,did:bid:zf2AHtw8YGgKPCyye2GMu56Wtjngvfdbg]
```

**without abi**
```
"{'method':'balanceOfBatch','params':{'accounts':['did:bid:ef21SesYy12yP9Pq24KQun3Xkk684gDuk','did:bid:ef21SesYy12yP9Pq24KQun3Xkk684gDuk'],'ids':['did:bid:efTMqg6qLb1pT34NdLjCXKwAxnCd5ELr','did:bid:zf2AHtw8YGgKPCyye2GMu56Wtjngvfdbg']}}"
```

### isApprovedForAll
**with abi**
```
did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:efHSbC7AedduvEG5hbtUio4mZmzwGhse
```

**without abi**
```
"{'method':'isApprovedForAll','params':{'account':'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','operator':'did:bid:efHSbC7AedduvEG5hbtUio4mZmzwGhse'}}"
```

### name
**with abi**
```

```

**without abi**
```
"{'method': 'name'}"
```

### symbol
**with abi**
```

```

**without abi**
```
"{'method': 'symbol'}"
```

### uri
**with abi**
```
did:bid:zf2AHtw8YGgKPCyye2GMu56Wtjngvfdbg
```

**without abi**
```
"{'method':'uri','params':{'tokenId':'did:bid:zf2AHtw8YGgKPCyye2GMu56Wtjngvfdbg'}}"
```

### totalSupply
**with abi**
```
did:bid:efzZLfWLnz1Apfxp2vZe1z34GuTtriPa
```

**without abi**
```
"{'method':'totalSupply','params':{'tokenId':'did:bid:efzZLfWLnz1Apfxp2vZe1z34GuTtriPa'}}"
```
