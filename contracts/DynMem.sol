// SPDX-License-Identifier: GPL-3.0
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//   


//
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//      @artist ::          stereoIII6.eth                                                                                                                                          //
//      @msg ::             stereoIII6.eth.chat                                                                                                                                     //
//      @github ::          stereoIII6                                                                                                                                              //
//                                                                                                                                                                                  //
//      @dev ::             stereoIII6.eth                                                                                                                                          //
//      @msg ::             stereoIII6.eth.chat                                                                                                                                     //
//      @github ::          stereoIII6                                                                                                                                              //
//                                                                                                                                                                                  //
//      @author ::          stereoIII6.eth                                                                                                                                          //
//      @msg ::             stereoIII6.eth.chat                                                                                                                                     //
//      @github ::          stereoIII6                                                                                                                                              //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//                                                                                                                                                                                  //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//      @title ::                                                                                                                                                        //
//      @description ::                                                                                                                          //
//      @version ::         0.0.1                                                                                                                                                   //
//      @purpose ::                                                                                                                              //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
//                                                                                                                                                                                  //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

pragma solidity ^0.8.0;
/** 
Open Zeppelin Imports
**/
//import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";



contract DynMem is ERC1155, VRFConsumerBase {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    mapping(uint256 => bool) ranBool;
    address payable admin;
    event Log(uint256 indexed _a, string _log, address _adr, uint256 _tmstmp); 
    uint256 internal g;
    uint256 internal i;
    struct Member {
        uint256 memID;
        address adr;
        string name;
        uint256 rank;
        uint256 bday;
        uint256 since;
        string status;
        string dias;
    }
    Member[] public members;
    mapping(address => uint256) internal idByAdr;
    mapping(address => uint256) internal slotByAdr;
    modifier isAdmin() {
        require (msg.sender == admin,"unauthorized");
        _;
    }
    function getMsgHash(string memory _message) public pure returns(bytes32){
        return keccak256(abi.encodePacked(_message));
    }
     function getEthMsgHash(bytes32 _mHash) public pure returns(bytes32){
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",_mHash));
    }
    function recover(bytes32 _ethSigMsgHash, bytes memory _sig) public pure returns(address){
        (bytes32 r, bytes32 s, uint8 v) = _split(_sig);
        return ecrecover(_ethSigMsgHash, v, r, s);
    }
    function _split(bytes memory _sig) internal pure returns(bytes32 r,bytes32 s, uint8 v){
        require(_sig.length == 65, "invalid sig length");
        assembly {
            r := mload(add(_sig, 32))
            s := mload(add(_sig, 64))
            v := byte(0, mload(add(_sig, 96)))
        }
    }
     function verify(address _signer, string memory _message, bytes memory _sig)  external pure returns(bool){
        bytes32 mHash = getMsgHash(_message);
        bytes32 ethSigMsgHash = getEthMsgHash(mHash);
        return recover(ethSigMsgHash, _sig) == _signer;
    }
    function isSigned() external view returns(uint256){
        return idByAdr[msg.sender];
    }
    function getRandomResult() external view returns(uint256){
        return randomResult;
    }
    function slotId(address _adr) external view returns(uint256){
        return slotByAdr[_adr];
    }
    function countMem() external view returns(uint256){
        return i;
    }
    function makeMember(string calldata _name, uint256 _rank, uint256 _bday, string calldata _dias, string calldata _status) external returns(bool){
        require(ranBool[randomResult] == false);
        members.push(Member(randomResult,msg.sender,_name,_rank,_bday,block.timestamp,_status,_dias));
        idByAdr[msg.sender] = randomResult;
        slotByAdr[msg.sender] = i;
        _mint(msg.sender,randomResult,1,bytes(_dias));
        ranBool[randomResult] = true;
        emit Log(g, _name, msg.sender, block.timestamp);
        g += 1;
        i += 1;
        return true;
    }
    function editMember(uint256 _id, uint256 _rank, uint256 _since, string memory _status) isAdmin() external returns(bool){
        members[_id].rank = _rank;
        members[_id].since = _since;
        members[_id].status = _status;
        emit Log(g, _status, msg.sender, block.timestamp);
        g += 1;
        return true;
    }
    function setStatus(string memory _status) external returns(bool){
        
        members[idByAdr[msg.sender]].status = _status;
        emit Log(g, _status, msg.sender, block.timestamp);
        g += 1;
        return true;
    }
    function withdraw() isAdmin() external returns(bool){
        require(address(this).balance > 0);
        admin.transfer(address(this).balance);
        emit Log(g, "admin contract withdrawal", msg.sender, block.timestamp);
        g += 1;
        return true;
    }
    function getRandomNumber() internal returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    function doRand() external returns(bool){
        getRandomNumber();
        return true;
    }
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }
    fallback() external {}

    constructor() VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        ) ERC1155("Dynamic Membership"){
        admin = payable(msg.sender);
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.1 LINK (Varies by network)
        i = 1;
        g = 1;
    }
    


    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}