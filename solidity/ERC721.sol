pragma solidity ^0.4.26;

contract XHERC721  {

    address public fundation; // 管理员  
    
    // 代币名称
    string private _name;

    // 代币符号
    string private _symbol;

    // NFT 属于哪个账户的
    mapping(uint256 => address) private _tokens;

    // 账户有 几个NFT
    mapping(address => uint256) private _balanceOf;

    // 授权集合
    mapping(uint256 => address) private _allowances;

    // Mapping from owner to operator approvals 全部 NFT 的授权集合
    mapping(address => mapping(address => bool)) private _isAllApproved;

    
    // 三个事件
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    /**
     * 初始化构造
     */
    function XHERC721(string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
	    fundation = msg.sender; 
    }  

    modifier onlyFundation() {
        require(msg.sender == fundation);
        _;
    }

    // 可选
    function name() public view returns (string memory) {
        return _name;
    }
    function symbol() public view returns (string memory) {
        return _symbol;
    }
    
    //function url() virtual public view returns (uint8);

    // 必须实现 ----  9个方法
    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _balanceOf[owner];
    }

    // 代币的地址
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _tokens[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    /**
     * 创建NFT。
     * @param to 接收方
     * @param tokenId 代币的标识符
     */
    function mint(address to, uint256 tokenId) public onlyFundation {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _balanceOf[to] += 1;
        _tokens[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }
    
    function _burn(uint256 tokenId) internal {
        address owner = XHERC721.ownerOf(tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balanceOf[owner] -= 1;
        delete _tokens[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }
    
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
        _transfer(from, to, tokenId);
    }
    
    /**
     * 从地址转账。合约调用方须是经过_from授权的账户
     * @param from 发送方
     * @param to 接收方
     * @param tokenId 代币的标识符
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        require(XHERC721.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");

        _approve(address(0), tokenId);

        _balanceOf[from] -= 1;
        _balanceOf[to] += 1;
        _tokens[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    // 要实现转账，先实现授权。
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        safeTransferFrom(from, to, tokenId, "");
    }
    
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }
    
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal {
        _transfer(from, to, tokenId);
    }


    /**
     * 授权
     * @param to 接受授权的账户地址
     * @param tokenId 代币的标识符
     */
    function approve(address to, uint256 tokenId) public  {
        address owner = XHERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }
    
    function _approve(address to, uint256 tokenId) internal {
        _allowances[tokenId] = to;
        emit Approval(XHERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * 查看接受授权的账户地址
     * @param tokenId 代币的标识符
     */
    function getApproved(uint256 tokenId) public view  returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _allowances[tokenId];
    }

    
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _tokens[tokenId] != address(0);
    }

    /**
     * 拥有者将其所有NFT进行全部授权
     * @param operator 接受授权的账户地址
     * @param approved 是否授权
     */
    function setApprovalForAll(address operator, bool approved) public {
        _setApprovalForAll(msg.sender, operator, approved);
    }
   
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal {
        require(owner != operator, "ERC721: approve to caller");
        _isAllApproved[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }
    
    function isApprovedForAll(address owner, address operator) public view returns (bool) {

        require(owner != address(0), "_owner can not be empty!");
        require(operator != address(0), "_operator can not be empty!");

        return  _isAllApproved[owner][operator];
    }

        
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = XHERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

}