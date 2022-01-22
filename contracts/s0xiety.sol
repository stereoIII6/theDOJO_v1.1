// SPDX-License-Identifier: GPL-3.0
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//   
//                                                 
//             .oPYo.         o          o         
//             8  .o8                    8         
//      .oPYo. 8 .P'8 `o  o' o8 .oPYo.  o8P o    o 
//      Yb..   8.d' 8  `bd'   8 8oooo8   8  8    8 
//        'Yb. 8o'  8  d'`b   8 8.       8  8    8 
//      `YooP' `YooP' o'  `o  8 `Yooo'   8  `YooP8 
//      :.....::.....:..:::..:..:.....:::..::....8 
//      ::::::::::::::::::::::::::::::::::::::ooP'.
//      ::::::::::::::::::::::::::::::::::::::...:: 
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
//      @title ::           s0xiety                                                                                                                                             //
//      @description ::     Decentral Social Network Experiment                                                                                                                     //
//      @version ::         0.0.1                                                                                                                                                   //
//      @purpose ::         Bring real life into the Blockchain                                                                                                                     //
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
//import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Is0xiety.sol";

library co {
    struct Socio {
        uint256 id;
        address payable author;
        bool master;
        bool pin;
        uint256 copys;
        address[] ownedBy;
        string title;
        string content;
        address[] likedBy;
        uint256 likes;
    }
    struct Comment {
        uint256 id;
        uint256 sid;
        address payable author;
        string title;
        string content;
        address[] likedBy;
        uint256 likes;
    }
    struct User {
        string id; // id_val
        uint256 cnt; // iteration val
        uint256 role; // 0 inactive, 1 noob, 2 profiler, 99 admin
        address payable adr;  // 0x0
        string name; // user name
        string email;  // user email
        uint256 likes; // count iteration val
    }
    struct Profile {
        uint256 cnt;
        address payable adr;
        string avt;
        string cols;
        string fonts;
        uint256 layout;
    }
    struct Message {
        uint256 cnt;
        string subject;
        address from;
        address to;
        string message;
    }
    uint256 public constant digits = 14;
    
    IERC20 public constant polyETH = IERC20(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    // IERC20 public constant polyDAI = IERC20(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
}
contract mp {
    // LIBRARYS
    using co for *;
    mapping(address => uint256) public userNum;
    mapping(address => uint256) public uBool;
    mapping(address => uint256) public userCountByAdr;
    mapping(address => uint256) internal CommentCountOf;
    mapping(address => mapping(uint256 => uint256))public CommentCountOfAdrById;
    mapping(address => mapping(uint256 => co.Comment))public CommentIdOfAdrByCount;
    mapping(address => uint256) internal SocioCountOf;
    mapping(address => mapping(uint256 => uint256)) public SocioCountOfAdrById;
    mapping(address => mapping(uint256 => co.Socio)) public SocioIdOfAdrByCount;
    mapping(uint256 => bool) public socioID;
    mapping(uint256 => bool) public commentID;
    mapping(address => bool) public blacklist;
    mapping(address => uint256) public greylisted;
    mapping(address => mapping(uint256 => uint256)) public greylist;
    mapping(address => bool) public whitelist;
    mapping(address => mapping(address => bool)) public following;
    mapping(address => mapping(address => bool)) public followers;
    mapping(address => mapping(address => mapping(uint256 => co.Message))) public message;
    mapping(address => uint256) public msgRec;
    mapping(address => uint256) public msgSent;
    mapping(address => mapping(address => bool)) public contacts;
    mapping(address => uint256) public cons;
    address payable admin;
    function followU(address _follow) public returns (bool) {
        following[msg.sender][_follow] = true;
        followers[_follow][msg.sender] = true;
        return true;
    }

    function unfollow(address _follow) public returns (bool) {
        following[msg.sender][_follow] = false;
        followers[_follow][msg.sender] = false;
        return true;
    }
    function withdraw(
        uint256 _amountMAT,
        uint256 _amountETH,
        // uint256 _amountDAI,
        address _adr
    ) public payable returns (bool) {
        require(whitelist[_adr] == true);
        require(admin == msg.sender);
        require(co.polyETH.balanceOf(address(this)) >= _amountETH * co.digits);
        co.polyETH.transfer(admin, _amountETH);
        // require(co.polyDAI.balanceOf(address(this)) >= _amountDAI * co.digits);
        // co.polyDAI.transfer(admin, _amountDAI);
        require(address(this).balance >= _amountMAT * co.digits + 1 * co.digits);
        admin.transfer(_amountMAT);
        return true;
    }
}
contract s0xiety is mp{
    // LIBRARYS
    using co for *;
    // ADDRESSES 
    // ITERATORS & COSTANTS
    uint256 internal u;
    uint256 internal m;
    uint256 internal s;
    uint256 internal c;
    // ARRAYS OF STRUCTS
    co.User[] public users;
    co.Profile[] public profiles;
    co.Message[] public messages;
    co.Socio[] public socios;
    co.Comment[] public comments;
    // CONSTRUCTOR 
    constructor(address payable _admin) mp() {
        u = 1;
        admin = _admin;
        users.push(
            co.User({
                id: "99999999",
                cnt: u,
                role: 99,
                adr: admin,
                name: "stereoIII6",
                email: "type.stereo@pm.me",
                likes: 10
            })
        );
        profiles.push(co.Profile(u,admin, "QmQtsogZZ29SmS98EtFHai4ZvTzkCNu81Am1aEQvbU97Vz", "light", "geo", 3));
        whitelist[admin] = true;
        userNum[admin] = u;
        uBool[admin] = 1;
        userCountByAdr[admin] = u;
        u = u + 1;
    }
    // FUNCTIONS 

    // CREATE
    function makeUser(
        string calldata _id,
        uint256 _cnt,
        address payable _adr,
        string calldata _name,
        string calldata _email
    ) public returns (bool) {
        users.push(
            co.User({
                id: _id,
                cnt: _cnt,
                role: 1,
                adr: _adr,
                name: _name,
                email: _email,
                likes: 10
            })
        );
        userNum[_adr] = u;
        uBool[_adr] = 1;
        userCountByAdr[_adr];
        return true;
    }

    function makeProfile(
        address payable _adr,
        string calldata _avt,
        string calldata _cols,
        string calldata _fonts,
        uint256 _layout
    ) public returns (bool) {
        uint256 uid = userNum[_adr];
        profiles.push(
            co.Profile({
                cnt: uid,
                adr: _adr,
                avt: _avt,
                cols: _cols,
                fonts: _fonts,
                layout: _layout
            })
        );
        co.User storage user = users[uid];
        if(user.role != 99) user.role = user.role + 1;
        user.likes = user.likes + 10;
        users[uid] = user;
        
        return true;
    }

    function createSocio(
        uint256 _id,
        bool _master,
        bool _pin,
        uint256 _copys,
        string calldata _title,
        string calldata _content
    ) public returns (bool) {
        uint256 uid = userNum[msg.sender];
        co.User storage user = users[uid];
        require(socioID[_id] != true);
        require(user.role >= 2);
        
        socios.push(
            co.Socio({
                id: _id,
                author: users[uid].adr,
                master: _master,
                pin: _pin,
                copys: _copys,
                ownedBy: new address[](0),
                title: _title,
                content: _content,
                likedBy: new address[](0),
                likes: 0
            })
        );

        user.likes = user.likes + 2;
        uint256 sid = SocioCountOf[msg.sender];
        SocioCountOfAdrById[msg.sender][sid] = s;
        SocioIdOfAdrByCount[msg.sender][sid] = socios[s];
        SocioCountOf[msg.sender] = sid + 1;
        if (sid % 9 == 0) user.likes = user.likes + 1;
        if (sid % 99 == 0) user.likes = user.likes + 10;
        if (sid % 999 == 0) user.likes = user.likes + 100;
        users[uid] = user;
        socioID[sid] = true;
        s = s + 1;
        return true;
    }

    function createComment(
        uint256 _id,
        uint256 _sid,
        string calldata _title,
        string calldata _content
    ) public returns (bool) {
        uint256 uid = userNum[msg.sender];
        uint256 cid = CommentCountOf[msg.sender];
        co.User storage user = users[uid];
        require(commentID[_id] != true);
        require(socioID[_sid] == true);
        comments.push(
            co.Comment({
                id: _id,
                sid: _sid,
                author: users[uid].adr,
                title: _title,
                content: _content,
                likedBy: new address[](0),
                likes: 0
            })
        );
        user.likes = user.likes + 1;
        CommentCountOfAdrById[msg.sender][_id] = c;
        CommentIdOfAdrByCount[msg.sender][cid] = comments[c];
        CommentCountOf[msg.sender] = cid + 1;
        users[uid] = user;
        commentID[_id] = true;
        c = c + 1;
        return true;
    }
    // UPDATE
    function editSocio(
        uint256 _id,
        string calldata _title,
        string calldata _content
    ) public returns (bool) {
        require(socioID[_id] == true);
        uint256 sc = SocioCountOfAdrById[msg.sender][_id];
        co.Socio storage socio = socios[sc];
        socio.title = _title;
        socio.content = _content;
        socios[sc] = socio;
        return true;
    }

    function editComment(
        uint256 _id,
        string calldata _title,
        string calldata _content
    ) public returns (bool) {
        require(commentID[_id] == true);
        uint256 cc = CommentCountOfAdrById[msg.sender][_id];
        co.Comment storage comment = comments[cc];
        comment.title = _title;
        comment.content = _content;
        comments[cc] = comment;
        return true;
    }
    // DELETE
    function delSocio(uint256 _id) public returns (bool) {
        require(socioID[_id] == true);
        uint256 sc = SocioCountOfAdrById[msg.sender][_id];
        co.Socio storage socio = socios[sc];
        socio.title = "";
        socio.content = "";
        socios[sc] = socio;
        return true;
    }

    function delComment(uint256 _id) public returns (bool) {
        require(commentID[_id] == true);
        uint256 cc = CommentCountOfAdrById[msg.sender][_id];
        co.Comment storage comment = comments[cc];
        comment.title = "";
        comment.content = "";
        comments[cc] = comment;
        return true;
    }
    // ACT SOCIAL
    function likeSocio(uint256 _id) public returns (bool) {
        uint256 uid = userNum[msg.sender];
        uint256 sc = SocioCountOfAdrById[msg.sender][_id];
        co.User storage user = users[uid];
        co.Socio storage socio = socios[sc];
        require(socioID[_id] == true);
        require(user.role >= 2);
        address[] storage likedArr = socio.likedBy;
        likedArr.push(msg.sender);
        socio.likedBy = likedArr;
        socios[sc] = socio;
        user.likes = user.likes - 1;
        users[uid] = user;
        return true;
    }

    function likeComment(uint256 _id) public returns (bool) {
        uint256 uid = userNum[msg.sender];
        co.User storage user = users[uid];
        uint256 sc = CommentCountOfAdrById[msg.sender][_id];
        co.Comment storage comment = comments[sc];
        require(commentID[_id] == true);
        require(user.role >= 2);
        address[] storage likedArr = comment.likedBy;
        likedArr.push(msg.sender);
        comment.likedBy = likedArr;
        comments[sc] = comment;
        user.likes = user.likes - 1;
        users[uid] = user;
        return true;
    }

    function writeMessage(address _to, string calldata _msg,string calldata _sub)
        public
        returns (bool)
    {
        msgRec[_to] = msgRec[_to] + 1;
        msgSent[msg.sender] = msgSent[msg.sender] + 1;
        messages[m] = co.Message(m,_sub,msg.sender,_to,_msg);
        message[msg.sender][_to][msgRec[_to]] = messages[m];
        m = m+1;
        if(contacts[msg.sender][_to] == false){ cons[msg.sender] = cons[msg.sender]+1;contacts[msg.sender][_to]=true;}
        return (true);
    }

    function readMessage(address _from,uint256 _num) public view returns (string memory) {
        require(_num <= msgRec[msg.sender]);
        return message[_from][msg.sender][_num];
    }

    /** STANDARD CONTRACT FUNCTIONALITY **/

    // Fallback function
    fallback() external {}

    /* **/
    // Withdraw Common ERC20

}