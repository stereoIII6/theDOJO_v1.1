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
const s0xiety = require("../build/contracts/s0xiety.json");
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const onboardButton = document.getElementById('connectButton');
const networkButton = document.getElementById('networkButton'); 
const uFormButton = document.getElementById('uFormButton');
const walletButton = document.getElementById('walletButton');
const account = document.getElementById('account');
const userForm = document.getElementById('userForm');
const iii6 = document.getElementById('iii6');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const avtInput = document.getElementById('avtInput');
const colInput = document.getElementById('colInput');
const fontInput = document.getElementById('fontInput');
const layInput = document.getElementById('layInput');

//////////////////////////////////////////
//                                      //
//          Init Metamask               //
//                                      //
//////////////////////////////////////////

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
        // onboardButton.innerHTML = UserData || accounts[0].slice(0,5)+"..."+accounts[0].slice(38,42);
        
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
    // console.log(accounts[0]); // Users Address
    const UserNum = await s0xDat.userNum(accounts[0]).then(result => {return result});
    if(Number(UserNum._hex) - 1 >= 0)
    {
    const User = await s0xDat.users(Number(UserNum._hex) - 1).then(result => {return result});
    const Profile = await s0xDat.profiles(Number(UserNum._hex) - 1).then(result => {return result});
    const onboardButton = document.getElementById('connectButton');
    onboardButton.innerHTML = "<img src='" + Profile.avt + "' height='16px' width='16px' /><b> "+User.name+"</b>";
    let role;
    if(User.role >= 50){role = "admin"} else if(User.role === 99){role = "admin"} else{role = "user"}
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
        account.innerHTML = "<h2 class='p-3'>Welcome ...</h2><p class='p-3'>Please create an account by filling out the form. We believe communication is key and thats why we are bringing social features to the Block.</p><p class='p-3 pt-0'>We believe that we can make the web3 space more dynamic and interactive. For this we need each and ervery one of ya'lls help!</p>";
        userForm.style.display = "inline-block";   
        uFormButton.addEventListener("click", onUserForm);
        onboardButton.innerHTML = "<b>"+accounts[0].slice(0,5)+"..."+accounts[0].slice(38,42)+"</b>"; 
    }
};
const checkNameIn = () => {
    nameInput.style.borderColor = "red";
    console.log("a");
}
const checkMailIn = (e) => {}
const onUserForm = async () => {
    const s0xDat = await s0xData();
    const account = document.getElementById('account');
    const nameInput = document.getElementById('nameInput');
    nameInput.addEventListener("change",checkNameIn);
    const emailInput = document.getElementById('emailInput');
    const avtInput = document.getElementById('avtInput');
    const colInput = document.getElementById('colInput');
    const fontInput = document.getElementById('fontInput');
    const layInput = document.getElementById('layInput');
    // detect false inputs
    account.innerHTML = "";
    let booly = true;
    if(nameInput.value.length < 4 || nameInput.value.length > 14) {  
        account.innerHTML += "Your name input needs to be corrected 4-12 characters <br/>"; 
        booly = false;
    }
    if(emailInput.value.length < 10 || emailInput.value.length > 22) {  
        account.innerHTML += "Your email input needs to be corrected 10-22 characters <br/>"; 
        booly = false;     
    }
    if(colInput.value === "default" || fontInput.value === "default" || layInput.value === "default"){
        account.innerHTML += "You have to select your prefered options <br/>"; 
        booly = false;
    }
    if(booly === true) {
        account.innerHTML = nameInput.value + " <br/>" + emailInput.value + " <br/>";
    }    
};


//////////////////////////////////////////
//                                      //
//          Connect Web3                //
//                                      //
//////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    initialize();
});