## Solidity

### XHERC721(string,string) -- constructor
```
"'solidity Token','https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6476'"
```

### mint(address,uint256)
```
"did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,2"
```

### transferFrom(address,address,uint256)
```
"did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:efyhF492WhCEnXqSCjgQV6yUA2uPeAY3,2"
```

### safeTransferFrom(address,address,uint256,bytes)
```
"did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:efyhF492WhCEnXqSCjgQV6yUA2uPeAY3,3,'safe transfer from'"
```

### safeTransferFrom(address,address,uint256)
```
"did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:efyhF492WhCEnXqSCjgQV6yUA2uPeAY3,4"
```

### approve(address,uint256)
```
"did:bid:efdvn6cS5TZgiM5ffVN9HQh3y72raYtm,5"
```

### setApprovalForAll(address,bool)
```
"did:bid:efdvn6cS5TZgiM5ffVN9HQh3y72raYtm,1"
```

### ownerOf(uint256)
```
"1"
```

### balanceOf(address)
```
"did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i"
```

### getApproved(uint256)
```
"5"
```

### isApprovedForAll(address,address)
```
"did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i,did:bid:efdvn6cS5TZgiM5ffVN9HQh3y72raYtm"
```

## JS
### init -- constructor
**with abi**
```
"'xinghuo space nft','symbol','https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6476'"
```
**without abi**
```
"{'name':'xinghuo space nft','symbol':'symbol','tokenUri':'https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6476'}"
```

### mint
**with abi**
```
"'to','did:bid:ef21SesYy12yP9Pq24KQun3Xkk684gDuk','did:bid:efvGbC617rnwabdxL4JxjnqGzqU97hhm'"
```
**without abi**
```
"{'method':'mint','params':{'to':'did:bid:ef21SesYy12yP9Pq24KQun3Xkk684gDuk','tokenId':'did:bid:efvGbC617rnwabdxL4JxjnqGzqU97hhm'}}"
```

### transferFrom
**with abi**
```
"'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','did:bid:efDr1MFqET4kP2CnNJmYhXGdR6LTJmAt','did:bid:efFasH3xkvS3fGsn72SqxZkrmreiuNzy'"
```
**without abi**
```
"{'method':'transferFrom','params':{'from':'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','to':'did:bid:efDr1MFqET4kP2CnNJmYhXGdR6LTJmAt','tokenId':'did:bid:efFasH3xkvS3fGsn72SqxZkrmreiuNzy'}}"
```

### safeTransferFrom (with data)
**with abi**
```
"'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU','did:bid:efFasH3xkvS3fGsn72SqxZkrmreiuNzw','safe transfer with data'"
```
**without abi**
```
"{'method':'safeTransferFrom','params':{'from':'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','to':'did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU','tokenId':'did:bid:efFasH3xkvS3fGsn72SqxZkrmreiuNzw','data':'safe transfer with data'}}"
```

### safeTransferFrom
**with abi**
```
"'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU','did:bid:efFasH3xkvS3fGsn72SqxZkrmreiuNzk'"
```
**without abi**
```
"{'method':'safeTransferFrom','params':{'from':'did:bid:efHqeHDdu6CxteYXxsPtFKdPbqTJd85i','to':'did:bid:ef296hUUmhM8fgH9Gg7dyY3MH7P1tkpJU','tokenId':'did:bid:efFasH3xkvS3fGsn72SqxZkrmreiuNzk'}}"
```

### approve
**with abi**
```
"'did:bid:efDr1MFqET4kP2CnNJmYhXGdR6LTJmAt','did:bid:ef25TXpxdvBQBngVABEhd64MJHhFsg6bu'"
```
**without abi**
```
"{'method':'approve','params':{'to':'did:bid:efDr1MFqET4kP2CnNJmYhXGdR6LTJmAt','tokenId':'did:bid:ef25TXpxdvBQBngVABEhd64MJHhFsg6bu'}}"
```

### setApprovalForAll
**with abi**
```
"'did:bid:efHSbC7AedduvEG5hbtUio4mZmzwGhse',false"
```
**without abi**
```
"{'method':'setApprovalForAll','params':{'operator':'did:bid:efHSbC7AedduvEG5hbtUio4mZmzwGhse','isApproved':false}}"
```

### setApprovalForAll
**with abi**
```

```
**without abi**
```
"{'method': 'name'}"
```

### ownerOf
**with abi**
```
"'did:bid:efvGbC617rnwabdxL4JxjnqGzqU97xxx'"
```
**without abi**
```
"{'method':'ownerOf','params':{'tokenId':'did:bid:efvGbC617rnwabdxL4JxjnqGzqU97xxx'}}"
```

### balanceOf
**with abi**
```
"'did:bid:ef21SesYy12yP9Pq24KQun3Xkk684gDuk'"
```
**without abi**
```
"{'method':'balanceOf','params':{'owner':'did:bid:ef21SesYy12yP9Pq24KQun3Xkk684gDuk'}}"
```

### getApproved
**with abi**
```
"did:bid:efvGbC617rnwabdxL4JxjnqGzqU97hhm"
```
**without abi**
```
"{'method':'getApproved','params':{'tokenId':'did:bid:efvGbC617rnwabdxL4JxjnqGzqU97hhm'}}"
```

### isApprovedForAll
**with abi**
```
"'did:bid:efHSbC7AedduvEG5hbtUio4mZmzwGhse','did:bid:efYoXTEiQrKTUdoLiLsBDGneGtFMJRqM'"
```
**without abi**
```
"{'method':'isApprovedForAll','params':{'owner':'did:bid:efHSbC7AedduvEG5hbtUio4mZmzwGhse','operator':'did:bid:efYoXTEiQrKTUdoLiLsBDGneGtFMJRqM'}}"
```

### symbol
**with abi**
```

```
**without abi**
```
"{'method': 'symbol'}"
```

### tokenURI
**with abi**
```
"'did:bid:efvGbC617rnwabdxL4JxjnqGzqU97hhm'"
```
**without abi**
```
"{'method':'tokenURI','params':{'tokenId':'did:bid:efvGbC617rnwabdxL4JxjnqGzqU97hhm'}}"
```

### totalSupply
**with abi**
```

```
**without abi**
```
"{'method': 'totalSupply'}"
```

### tokenByIndex
**with abi**
```
"0"
```
**without abi**
```
"{'method':'tokenByIndex','params':{'index':0}}"
```

### tokenOfOwnerByIndex
**with abi**
```
"'did:bid:efDr1MFqET4kP2CnNJmYhXGdR6LTJmAt',0"
```
**without abi**
```
"{'method':'tokenOfOwnerByIndex','params':{'owner':'did:bid:efDr1MFqET4kP2CnNJmYhXGdR6LTJmAt','index':0}}"
```
