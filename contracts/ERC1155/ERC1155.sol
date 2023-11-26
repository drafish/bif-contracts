pragma solidity ^0.4.26;

contract ERC1155 {

    // Mapping from token ID to account balances （某个代币 -- 某个账户地址 -- 金额）
    mapping(uint256 => mapping(address => uint256)) private _balances;

    // Mapping from account to operator approvals （账户地址A ---- 对账户地址B是否进行了授权） 
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // 链下的资源链接，用于记录保存token的具体介绍信息   https://token-cdn-domain/{id}.json
    string private _uri;

    // 单个转账时的事件
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    // 批量转账时的事件
    event TransferBatch( address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values
    );
    // 授权时的事件
    event ApprovalForAll(address indexed account, address indexed operator, bool approved);
    // 更新uri时的事件
    event URI(string value, uint256 indexed id);
    
    address public fundation; // 管理员

    modifier onlyFundation() {
        require(msg.sender == fundation);
        _;
    }

    /**
     * 初始化构造
     */
    function TokenERC1155(string memory uri_) public {
        fundation = msg.sender;    
        _setURI(uri_);                         
    }
    
    constructor(string memory uri_) {
        fundation = msg.sender;    
        _setURI(uri_);
    }

    function uri(uint256) public view  returns (string memory) {
        return _uri;
    }

    /**
     * 查询单个账户的余额
     * @param account 查询的账户地址
     * @param id 代币的标识符
     */
    function balanceOf(address account, uint256 id) public view returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");
        return _balances[id][account];
    }
  
    /**
     * 批量查询多个账户的余额
     * @param accounts 查询的账户地址 数组
     * @param ids 代币的标识符 数组
     */
    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        public
        view    
        returns (uint256[] memory)
    {
        require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");

        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; ++i) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    /**
     * 详见 _setApprovalForAll
     */
    function setApprovalForAll(address operator, bool approved) public {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    /**
     * 查询账户是否授权给 某个账户
     * @param account 需要查询的账户地址
     * @param operator 授权的账户地址
     */
    function isApprovedForAll(address account, address operator) public view  returns (bool) {
        return _operatorApprovals[account][operator];
    }

    /**
     * 详见 _safeTransferFrom
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public  {
        require(
            from == msg.sender || isApprovedForAll(from, msg.sender),
            "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * 详见 _safeBatchTransferFrom
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public  {
        require(
            from == msg.sender || isApprovedForAll(from, msg.sender),
            "ERC1155: transfer caller is not owner nor approved"
        );
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    /**
     * 从from账户，转账 amount 个 token为id的资产到to账户。
     * @param from 转账的发送账户地址
     * @param to 转账的接收账户地址
     * @param id token的标识符
     * @param amount 转账的数量     
     * @param data 转账的信息
     */
    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal {
        require(to != address(0), "ERC1155: transfer to the zero address");

        address operator = msg.sender;
        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
        _balances[id][from] = fromBalance - amount;
        _balances[id][to] += amount;

        emit TransferSingle(operator, from, to, id, amount);
    }

    /**
     * 从from账户批量转账资产到to账户。
     * @param from 转账的发送账户地址
     * @param to 转账的接收账户地址
     * @param ids token的标识符数组
     * @param amounts 转账的数量数组     
     * @param data 转账的信息
     */
    function _safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal {
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
        require(to != address(0), "ERC1155: transfer to the zero address");

        address operator = msg.sender;
        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            uint256 fromBalance = _balances[id][from];
            require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
            _balances[id][from] = fromBalance - amount;
            _balances[id][to] += amount;
        }

        emit TransferBatch(operator, from, to, ids, amounts);
    }
  
    function _setURI(string memory newuri) internal {
        _uri = newuri;
    }

   /**
     * 铸造代币
     * @param to 接收账户地址
     * @param id token的标识符
     * @param amount 转账的数量     
     * @param data 转账的信息
     */
    function mint (
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) onlyFundation public {
        require(to != address(0), "ERC1155: mint to the zero address");

        address operator = msg.sender;
        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);
    }

   /**
     * 批量铸造代币
     * @param to 接收账户地址
     * @param ids token的标识符数组
     * @param amounts 转账的数量数组  
     * @param data 转账的信息
     */
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) onlyFundation public {
        require(to != address(0), "ERC1155: mint to the zero address");
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");

        address operator = msg.sender;

        for (uint256 i = 0; i < ids.length; i++) {
            _balances[ids[i]][to] += amounts[i];
        }
        emit TransferBatch(operator, address(0), to, ids, amounts);
    }

    /**
     * 为账户下所有的资产设置授权
     * @param owner 需要授权的账户
     * @param operator 接受授权的账户
     * @param approved 是否授权
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal {
        require(owner != operator, "ERC1155: setting approval status for self");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    } 
}