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
import { Grid } from "gridjs";
import {sha256} from 'crypto-hash';
const client = require('ipfs-http-client');

console.log(client);
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
const iii6 = document.getElementById('iii6');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const uploader = document.getElementById("uploader");        
const file = document.getElementById("file");
const submit = document.getElementById("submit");
const fileURL = document.getElementById("fileURL");
const colInput = document.getElementById('colInput');
const fontInput = document.getElementById('fontInput');
const layInput = document.getElementById('layInput');
let UpBuff;
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
    submit.addEventListener("click",uploadAFile);
};
const uploadAFile = async (e) => {
    e.preventDefault();
    
    console.log("pushing to ipfs");
    const result = await ipfs.add(UpBuff); 
    console.log("Ipfs Result", result);
    uploader.removeEventListener("submit",uploadAFile);
    submit.innerHTML = result.path.slice(0,2)+'...'+result.path.slice(result.path.length -2, result.path.length)+' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
    submit.value = result.path;
    fileURL.value = "QmPSgAGNpg67pHZdbpPm9C4qWMwpgqyQ46ZXd6LPaVvUAp";
    uploader.addEventListener("submit",copyToClip);  
};

const copyToClip = (e) => {
    e.preventDefault();

    console.log(e.target.submit.value);
    uploader.removeEventListener("submit",copyToClip); 
    navigator.clipboard.writeText(e.target.submit.value).then(function() {
        console.log('copied to clipboard !');
      }, function(err) {
        console.error('could not copy !', err);
      }); 
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
          const onboardButton = document.getElementById('connectButton');
          onboardButton.innerHTML = 'Connecting ...';
          
          // You should disable this button while the request is pending!
          await ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await ethereum.request({ method: 'eth_accounts' });
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
        const networkButton = document.getElementById('networkButton'); 
        networkButton.innerHTML = networkTag;
        const UserData = await log();
        console.log(UserData);
        // onboardButton.innerHTML = UserData ||nowChar ===  accounts[0].slice(0,5)+"..."+accounts[0].slice(38,42);
        
        } catch (error) {
          console.error(error);
          const onboardButton = document.getElementById('connectButton');
          onboardButton.innerText = 'Connect';
        }
        
    };
    const MetaMaskClientCheck = () => {
        //Now we check to see if MetaMask is installed
        if (!isMetaMaskInstalled()) {
        //If it isn't installed we ask the user to click to install it
        const onboardButton = document.getElementById('connectButton');
        onboardButton.innerText = 'Click here to install MetaMask!';
        onboardButton.addEventListener("click",clickInstall);
        } else {
        //If it is installed we change our button text
        const onboardButton = document.getElementById('connectButton');
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
    console.log(accounts[0]); // Users Address
    const UserNum = await s0xDat.userNum(accounts[0]).then(result => {return result});
    if(Number(UserNum._hex) - 1 >= 0)
    {
        const User = await s0xDat.users(Number(UserNum._hex) - 1).then(result => {console.log(result);return result;});
        const Profile = await s0xDat.profiles(Number(UserNum._hex) - 1).then(result => {return result});
        const onboardButton = document.getElementById('connectButton');
        onboardButton.innerHTML = "<img src='" + Profile.avt + "' height='16px' width='16px' /><b> "+User.name+"</b>";
        let role;
        if(User.role >= 50){role = "mod"} 
        else if(User.role === 99){role = "admin"} 
        else{role = "user"}

        const account = document.getElementById('account');
        const userForm = document.getElementById('userForm');
        account.innerHTML = User.name +" <br/>"+ role +" <br/>"+ User.email +" <br/><img src='"+ Profile.avt +"' /> <br/>"+ Profile.cols +" <br/>"+ Profile.fonts +" <br/>"+ Profile.layout;
        userForm.style.display = "none";
        return (User.name);
    }
    else{
        const onboardButton = document.getElementById('connectButton');
        const account = document.getElementById('account');
        const userForm = document.getElementById('userForm');
        const uFormButton = document.getElementById('uFormButton');
        const pusher = document.getElementById('pusher');
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
const avtIn = (e) => {}
const colIn = (e) => {}
const fontIn = (e) => {}
const layIn = (e) => {}
const onUserForm = async (e) => {
    // let nowChar = e.target.value[e.target.value.length-1];
    // const s0xDat = await s0xData();
    const account = document.getElementById('account');
    const nameInput = document.getElementById('nameInput'); 
    const emailInput = document.getElementById('emailInput');
    const colInput = document.getElementById('colInput');
    const fontInput = document.getElementById('fontInput');
    const layInput = document.getElementById('layInput');
    const fileURL = document.getElementById('fileURL');
     
    // detect false inputs
    account.innerHTML = "";
    let booly = true;
    
        account.innerHTML = nameInput.value + " <br/>" + emailInput.value + " <br/>";
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const s0xDat = await s0xData();
        // console.log(accounts[0]); // Users Address
        const u = await s0xDat.u().then(result => {return result});
        const uC = (Number(u._hex));
        const uid = await sha256(nameInput.value + "_" + emailInput.value + "_" +  uC);
        const newUser = await s0xDat.makeUser(uid,uC,accounts[0],nameInput.value, emailInput.value).then(result => {return result;      
        });
        const newUserProfile = await s0xDat.makeProfile(accounts[0],fileURL.value, "irie", "arial", 3).then(result => {
            console.log(result);
            return result; 
        });
        console.log(newUser,newUserProfile);
};


//////////////////////////////////////////
//                                      //
//          Connect Web3                //
//                                      //
//////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    uploader.style.display = "none";
    initialize();
});