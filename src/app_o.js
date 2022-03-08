//////////////////////////////////////////
//                                      //
//          MAIN CONTRACT               //
//          III6 LifeAnd.Eth            //
//          stereoIII6                  //
//          stereodocbush@gmail.com      //
//                                      //
//////////////////////////////////////////

import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import "../public/app.scss";
import {sha256} from 'crypto-hash';

const client = require('ipfs-http-client');
// console.log(client);
const ipfs = client.create({host: "ipfs.infura.io",
port: "5001",
protocol: "https"});
const s0xiety = require("../build/contracts/s0xiety.json");

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const onboardButton = document.getElementById('connectButton');
const networkButton = document.getElementById('networkButton'); 
const uFormButton = document.getElementById('uFormButton');
const walletButton = document.getElementById('walletButton');
const account = document.getElementById('account');
const userForm = document.getElementById('userForm');
userForm.style.display = "none";
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const colInput = document.getElementById('colInput');
const layInput = document.getElementById('layInput');
const fontInput = document.getElementById('fontInput');
const uploader = document.getElementById("uploader");        
const file = document.getElementById("file");
const submit = document.getElementById("submit");
const fileURL = document.getElementById("fileURL");
const pusher = document.getElementById('pusher');
const modal = document.getElementById('modal');
const close = document.getElementById('close');
let mode = true;
let idCheck = "msgTab";
const msgForm = document.getElementById('msgForm');
const s0xForm = document.getElementById('s0xForm');
const groupForm = document.getElementById('groupForm');
const messages = document.getElementById('messages');
const msgTab = document.getElementById('msgTab');
const msgList = document.getElementById('msgList');
const profile = document.getElementById('profile');
const newMessage = document.getElementById('newMsg');
const msgBtn = document.getElementById('msgBtn');
const groups = document.getElementById('groups');
const groupTab = document.getElementById('groupTab');
const newGroup = document.getElementById('newGroup');
const privat = document.getElementById('privat');
const token = document.getElementById('token');
const user = document.getElementById('user');
const group = document.getElementById('group');
const following = document.getElementById('following');
const followers = document.getElementById('followers');
const friends = document.getElementById('friends');
const signe = document.getElementById('signed');
const publix = document.getElementById('public');
const s0xLabel = document.getElementById('s0xLabel');




let UpBuff; // file buffer holder 

//////////////////////////////////////////
//                                      //
//          Init Metamask               //
//                                      //
//////////////////////////////////////////

const captureFile = (e) => {
    e.preventDefault();
    console.log("file captured",e.target.files[0]);
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => { 
        const buffer = reader.result; 
        UpBuff = buffer;   
        
    }
    submit.innerHTML = file.name.slice(0,3)+'..'+file.name.slice(file.name.length -4, file.name.length)+' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-upload-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"/></svg>';
    // uploader.removeEventListener("submit",copyToClip); 
    submit.addEventListener("click",uploadAFile);
};
const uploadAFile = async (e) => {
    e.preventDefault();
    console.log("pushing to ipfs");
    const result = await ipfs.add(UpBuff); 
    console.log("Ipfs Result", result);
    submit.innerHTML = result.path.slice(0,2)+'...'+result.path.slice(result.path.length -2, result.path.length)+' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
    submit.value = result.path;
    fileURL.value = result.path;
    submit.removeEventListener("click",uploadAFile);
    submit.addEventListener("click",copyToClip); 
};

const copyToClip = (e) => {
    e.preventDefault();
    // console.log(fileURL.value);
    navigator.clipboard.writeText("http://ipfs.io/ipfs/"+fileURL.value).then(function() {
        console.log('copied to clipboard !');
    }, function(err) {
        console.error('could not copy !', err);
    }); 
    submit.removeEventListener("click",copyToClip); 
};

const initialize = () => {
    //Basic Actions Section
    
    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };
    const clickInstall = () => {
        alert("You are being redirected to the official download of Metamask.io ... Please Follow their installation instructions.");
        window.open("https://metamask.io");
    };
    const onClickConnect = async () => {
        try {
          // Will open the MetaMask UI
          onboardButton.innerHTML = 'Connecting ...';
          // You should disable this button while the request is pending!
          await ethereum.request({ method: 'eth_requestAccounts' });
         // console.log("what");
         // const accounts = await ethereum.request({ method: 'eth_accounts' });
          const network = await ethereum.request({method: 'net_version'});
          var networkTag = "Switch Network";
        //We take the first address in the array of addresses and display it
                            if(Number(network) === 80001) networkTag =  "Mumbai";
                            if(Number(network) === 1) networkTag =  "ETH";
                            if(Number(network) === 137) networkTag =  "Polygon";
                            if(Number(network) === 100) networkTag =  "xDai";
                            if(Number(network) === 10) networkTag =  "Optimism";
                            if(Number(network) === 200) networkTag =  "Arbitrum";
                            if(Number(network) === 43224) networkTag =  "Avalanche";
                            if(Number(network) === 1312) networkTag = "ACAB";
        networkButton.innerHTML = networkTag;
        const UserData = await log();
        console.log(UserData);
        
        } catch (error) {
          console.error(error);
          onboardButton.innerText = 'Connect';
        }
        
    };
    const MetaMaskClientCheck = () => {
        //Now we check to see if MetaMask is installed
        if (!isMetaMaskInstalled()) {
        //If it isn't installed we ask the user to click to install it
        onboardButton.innerText = 'Click here to install MetaMask!';
        onboardButton.addEventListener("click",clickInstall);
        } else {
        //If it is installed we change our button text
        onboardButton.innerText = 'Connect';
        onboardButton.addEventListener("click",onClickConnect);
        }
    };
    MetaMaskClientCheck();
}
const s0xData = async () => {
    
    const deploymentKey = Object.keys(s0xiety.networks)[0];
    // console.log(s0xiety.abi,provider);
    return new ethers.Contract(
            s0xiety
            .networks[deploymentKey]
            .address, s0xiety.abi, signer
    );
}

const log = async () => {
   
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const s0xDat = await s0xData();

    console.log(accounts[0] , "before", s0xDat); // Users Address

    const UserNum = await s0xDat.uxNum(accounts[0]).then(result => {return result});
    console.log(UserNum._hex);
    if(Number(UserNum._hex) - 1 >= 0)
    {
        const User = await s0xDat.users(Number(UserNum._hex) - 1).then(result => {console.log(result);return result;});

        if(User.role === 1){
            const Profile = await s0xDat.profiles(Number(UserNum._hex) - 1).then(result => {console.log(result);return result});
            if(Profile.cnt === User.cnt) log();
            else {
        account.innerHTML = "<h2 class='p-3'>Welcome ...</h2><p class='p-3'>Please create an account by filling out the form. We believe communication is key and thats why we are bringing social features to the Block.</p><p class='p-3 pt-0'>We believe that we can make the web3 space more dynamic and interactive. For this we need each and ervery one of ya'lls help!</p>";
        // account.style.display = "none";
        userForm.style.display = "inline-block";   
        uploader.style.display = "block";
        file.addEventListener("change",captureFile);
        pusher.addEventListener("click",function(){
        file.click();
        });
        
        submit.innerHTML = '...';
        nameInput.style.display = "none";
        emailInput.style.display = "none";
        colInput.style.display = "block";
        layInput.style.display = "block";
        fontInput.style.display = "block";
        uFormButton.addEventListener("click", onProfileForm);
        onboardButton.innerHTML = "<b>"+accounts[0].slice(0,5)+"..."+accounts[0].slice(38,42)+"</b>"; 
        }}
        else{        
        const Profile = await s0xDat.profiles(Number(UserNum._hex) - 1).then(result => {console.log(result);return result});

        const fonts = ethers.utils.parseBytes32String(Profile.fonts);
        const cols = ethers.utils.parseBytes32String(Profile.cols);
        const id = User.id;
        const name = ethers.utils.parseBytes32String(User.name);
        const avt = Profile.avt;
        let role = User.role;
        
        onboardButton.innerHTML = "<div class='iconic'><img class='iconic' src='https://ipfs.io/ipfs/" + avt + "' /></div><b> "+name+"</b>";
        
        if(Number(User.role) === 50){role = "yellow"} 
        else if(Number(User.role) === 99){role = "red"} 
        else{role = "green"}
        document.body.id = cols.toString();
        account.innerHTML = "<h1 class='name' style='color:"+ role +"'>"+name +"</h1>"+id +" / " + name + " <br/><img class='propic' src='https://ipfs.io/ipfs/"+ avt +"' /> <br/>"+ cols +" <br/>"+ fonts +" <br/>"+ Profile.layout;
        userForm.style.display = "none";
        return (User.name);
        }
    }
    else{
        account.innerHTML = "<h2 class='p-3'>Welcome ...</h2><p class='p-3'>Please create an account by filling out the form. We believe communication is key and thats why we are bringing social features to the Block.</p><p class='p-3 pt-0'>We believe that we can make the web3 space more dynamic and interactive. For this we need each and ervery one of ya'lls help!</p>";
        // account.style.display = "none";
        userForm.style.display = "inline-block";   
        uploader.style.display = "inline-block";
        file.addEventListener("change",captureFile);
        pusher.addEventListener("click",function(){
        file.click();
        });
        
        submit.innerHTML = '...';
        nameInput.addEventListener('keydown',checkNameIn);
        
        emailInput.addEventListener('keydown',checkMailIn);
        nameInput.addEventListener('keyup',checkNameIn);
        emailInput.addEventListener('keyup',checkMailIn);
        colInput.style.display = "none";
        layInput.style.display = "none";
        fontInput.style.display = "none";
        uploader.style.display = "none";
        uFormButton.addEventListener("click", onUserForm);
        onboardButton.innerHTML = "<b>"+accounts[0].slice(0,5)+"..."+accounts[0].slice(38,42)+"</b>"; 
    }
};
const checkNameIn = (e) => {
    let nowChar = e.target.value[e.target.value.length-1];
    if(nowChar === "("||nowChar === ")"||nowChar === ","||nowChar === ";"||nowChar === "."||nowChar === ":"||nowChar === "&"||nowChar === "|"||nowChar === "$"||nowChar === "<"||nowChar === ">"||nowChar === "?"||nowChar === "!"||nowChar === "-"||nowChar === "+"||nowChar === "*"||nowChar === "/"||nowChar === "%") {
        nameInput.value = nameInput.value.substring(0, nameInput.value.length - 1)
    }
    if(e.target.value.length < 4 ||nowChar ===  e.target.value.length > 12) nameInput.style.borderColor = "red";
    else nameInput.style.borderColor = "mediumseagreen";  
}
const checkMailIn = (e) => {
    let nowChar = e.target.value[e.target.value.length-1];
    if(nowChar === "("||nowChar === ")"||nowChar === ","||nowChar === ";"||nowChar === ":"||nowChar === "&"||nowChar === "|"||nowChar === "$"||nowChar === "<"||nowChar === ">"||nowChar === "?"||nowChar === "!"||nowChar === "+"||nowChar === "*"||nowChar === "/"||nowChar === "%") {
        emailInput.value = emailInput.value.substring(0, emailInput.value.length - 1)
    }
    if(e.target.value.length < 10 ||nowChar ===  e.target.value.length > 32) emailInput.style.borderColor = "red";
    else emailInput.style.borderColor = "mediumseagreen";
}
const onUserForm = async (e) => {  
    // detect false inputs
    account.innerHTML = "";
    let booly = true;
    
        account.innerHTML = nameInput.value + " <br/>" + emailInput.value + " <br/>";
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const s0xDat = await s0xData();
        // console.log(accounts[0]); // Users Address
        const u = await s0xDat.u().then(result => {return result});
        const uC = (Number(u._hex));
        console.log(uC);
        const uid = await sha256(nameInput.value + "_" + emailInput.value + "_" +  uC);
        console.log(uid);
        const newUser = await s0xDat.makeUser(uid,accounts[0],ethers.utils.formatBytes32String(nameInput.value), ethers.utils.formatBytes32String(emailInput.value)).then(result => {
            nameInput.style.display = "none";
            emailInput.style.display = "none";
            colInput.style.display = "block";
            fontInput.style.display = "block";
            layInput.style.display = "block";
            uploader.style.display = "block";
            uFormButton.removeEventListener("click", onUserForm);
            uFormButton.addEventListener("click", onProfileForm);
            uFormButton.innerHTML = "Set Profile";

            console.log(result);
            return result;      
        });
        console.log(newUser); 
        
        
};
const onProfileForm = async (e) => {  
    // detect false inputs
    account.innerHTML = "";
    let booly = true;
    
        account.innerHTML = nameInput.value + " <br/>" + emailInput.value + " <br/>";
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const s0xDat = await s0xData();
        const newUserProfile = await s0xDat.makeProfile(accounts[0],fileURL.value, ethers.utils.formatBytes32String(colInput.value), ethers.utils.formatBytes32String(fontInput.value), layInput.value).then(result => {
            console.log(result);
            nameInput.style.display = "block";
            emailInput.style.display = "block";
            colInput.style.display = "none";
            fontInput.style.display = "none";
            layInput.style.display = "none";
            uploader.style.display = "none";
            uFormButton.removeEventListener("click", onProfileForm);
            uFormButton.addEventListener("click", onUserForm);
            uFormButton.innerHTML = "Claim 1UP";
            uFormButton.style.display = "block";
            return result; 
        });
        console.log(newUserProfile); 
        log();
};

const goModal = async (e) => {
    const s0xDat = await s0xData();
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(mode, idCheck);
    let val = "none";
    if(mode){
        mode = !mode;
    }
    if(!mode) val = "block";
    if(e.target.id === "messages") idCheck = "msgTab";
    if(e.target.id === "groups") idCheck = "groupTab";
    if(e.target.id === "profile") idCheck = "proTab";
    console.log(e.target.id , idCheck);
    if(idCheck === "msgTab") 
    {
        s0xForm.style.display = "none";
        msgTab.style.display = "block";
        msgForm.style.display = "none";
        groupTab.style.display = "none";
        groupForm.style.display = "none";
        const con = await s0xDat.con().then(result => {
            // console.log(result);
            return result;      
        });
             
        msgList.innerHTML = "";
        for(let i = 0; i<con; i++){
            const convo = await s0xDat.conToConvo(con).then(result => {return result});
            console.log(convo);
            const getText =  await s0xDat.getConvos(convo).then(result => {return result});
            console.log(getText);
            const otherUsr = await s0xDat.convosToUsr(convo).then(result => {return result});
            console.log(otherUsr);
            const usrName = await s0xDat.userName(otherUsr).then(result => {return result});
            console.log(usrName);
            msgList.innerHTML += "<div id='usr_avt'>"+ethers.utils.parseBytes32String(usrName)+ ' - ' +ethers.utils.parseBytes32String(getText).slice(0,10)+"... </div>";
        }
            
    }
    if(idCheck === "groupTab") 
    {
        s0xForm.style.display = "none";
        groupTab.style.display = "block";
        groupForm.style.display = "none";
        msgTab.style.display = "none";
        msgForm.style.display = "none";
    }
    if(idCheck === "proTab") 
    {
        s0xForm.style.display = "block";
        groupTab.style.display = "none";
        groupForm.style.display = "none";
        msgTab.style.display = "none";
        msgForm.style.display = "none";
        
        privat.addEventListener("mouseenter",showLabel);
        privat.addEventListener("mouseleave" ,hideLabel);   
        token.addEventListener("mouseenter",showLabel);
        token.addEventListener("mouseleave" ,hideLabel);   
        user.addEventListener("mouseenter",showLabel);
        user.addEventListener("mouseleave" ,hideLabel);   
        group.addEventListener("mouseenter",showLabel);
        group.addEventListener("mouseleave" ,hideLabel);   
        following.addEventListener("mouseenter",showLabel);
        following.addEventListener("mouseleave" ,hideLabel);   
        followers.addEventListener("mouseenter",showLabel);
        followers.addEventListener("mouseleave" ,hideLabel);   
        friends.addEventListener("mouseenter",showLabel);
        friends.addEventListener("mouseleave" ,hideLabel);   
        signe.addEventListener("mouseenter",showLabel);
        signe.addEventListener("mouseleave" ,hideLabel);   
        publix.addEventListener("mouseenter",showLabel);
        publix.addEventListener("mouseleave" ,hideLabel);         
    }
    console.log(val);
    modal.style.display = val;
    idCheck = e.target.id;
};
const showLabel = (e) => {s0xLabel.style.display = "block";s0xLabel.innerHTML = e.target.value;console.log(e.target.value);};
const hideLabel = (e) => {s0xLabel.style.display = "none";};
const exitModal = (e) => {
    mode = true;
    modal.style.display = "none";

}
const newMsgModal = async (e) => {
    
    msgForm.style.display = "block";
    msgTab.style.display = "none";
    
    msgBtn.addEventListener("click", onMessageWrite);
}
const newGroupModal = (e) => {
    groupForm.style.display = "block";
    groupTab.style.display = "none";
}

const onMessageWrite = async (e)  => {
    const s0xDat = await s0xData();
    console.log("hi");
    const t0x = document.getElementById('msgRec').value;
    const msg = ethers.utils.formatBytes32String(document.getElementById('msgSubject').value + " " + document.getElementById('msgText').value);
    const newMsg = await s0xDat.writeMessage(t0x,msg).then(result => {
        return result;      
    });
}


//////////////////////////////////////////
//                                      //
//          Connect Web3                //
//                                      //
//////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    uploader.style.display = "none";
    initialize();
    messages.addEventListener("click", goModal);
    groups.addEventListener("click",goModal);
    close.addEventListener("click",exitModal);
    profile.addEventListener("click",goModal);
    msgTab.style.display = "none";
    groupTab.style.display = "none";
    s0xForm.style.display = "none";
    newMessage.addEventListener("click", newMsgModal);
    newGroup.addEventListener("click", newGroupModal);
});