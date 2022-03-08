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
let pedometer = require('pedometer').pedometer;
let steps = pedometer(accelerometerData,attitudeData,samplingrate,options);
console.log(steps);
const client = require('ipfs-http-client');
// console.log(client);
const ipfs = client.create({host: "ipfs.infura.io",
port: "5001",
protocol: "https"});
// const s0xiety = require("../build/contracts/s0xiety.json");
const dynMem = require("../build/contracts/dynMem.json");
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const onboardButton = document.getElementById('connectButton');
const mlqButton = document.getElementById('mlqButton');
const networkButton = document.getElementById('networkButton'); 
const uFormButton = document.getElementById('uFormButton');
const walletButton = document.getElementById('walletButton');
const account = document.getElementById('account');
const stage = document.getElementById('stage');
const form = document.getElementById('form');
const formBtn = document.getElementById('formBtn');
form.style.display = 'none';
const fuid = document.getElementById("fuid");
const fname = document.getElementById("fname");
const fstatus = document.getElementById("fstatus");
const frank = document.getElementById("frank");
const fbday = document.getElementById("fbday");
const fsince = document.getElementById("fsince");
const links = document.getElementById('links');
links.style.display = "none";
const allMemBtn = document.getElementById('allMemBtn');
const myProBtn = document.getElementById('myProBtn');
const allMem = document.getElementById('allMem');
const myPro = document.getElementById('myPro');
const proCard = document.getElementById('proCard');
const board = document.getElementById('board');
allMem.style.display = "none";
// myPro.style.display = "none";

function Countstep(){
    this.init();
    return this.count;

 }

Countstep.prototype={
 init:function(){
     var _this=this;
     _this.flag=false;
     _this.count=[];
     _this.count[0]=0;
    function motionHandler(event) {  
             var accGravity = event.accelerationIncludingGravity;  
             _this.yg=accGravity.y;
             return false;
    }
     function orientationHandler(event){
          if ((_this.yg-10*Math.sin(event.beta*Math.PI/180))>1) {
              _this.flag=true;
          }
          if((_this.yg-10*Math.sin(event.beta*Math.PI/180))<-1){
                  if(_this.flag==true){
                     _this.count[0]++;
                     _this.flag=false;  
                   
                  };
                  
              }
     }

      if (window.DeviceMotionEvent&&window.DeviceOrientationEvent) {  
       window.addEventListener("devicemotion",motionHandler, false); 
       window.addEventListener("deviceorientation",orientationHandler, false); 
       return _this.count;
     }
      else {  
       alert('Your browser does not support this step counting plugin');
     }  

 },


}
window.Countstep=Countstep;

let count=new Countstep();
	 window.addEventListener("devicemotion",function(){
	 	document.querySelector('.count').innerHTML=count[0];
	 }, false); 


//////////////////////////////////////////
//                                      //
//          Init Metamask               //
//                                      //
//////////////////////////////////////////


const initialize = () => {
    //Basic Actions Section
    mlqButton.innerHTML = steps;
    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };
    const clickInstall = () => {
        alert("You are being redirected to the official download of Metamask.io ... Please Follow their installation instructions.");
        window.open("https://metamask.io");
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
    // console.log(UserData);
    
    } catch (error) {
      console.error(error);
      onboardButton.innerText = 'Connect';
    }
    
};
const onClickCreate = async () => {
    try {
        const memDat = await memData();
        const rando = await memDat.getRandomResult().then(result => { console.log(BigInt(result._hex)); return result; });
        fuid.value = rando._hex;
        // console.log(fuid.value);
        form.style.display = "block";

        formBtn.addEventListener("click",makeAMember);

    } catch (error) {
        console.error(error);
        onboardButton.innerText = 'Connect';
        onboardButton.removeEventListener("click",onClickCreate);
        onboardButton.addEventListener("click",onClickConnect);
      }
    
};
const makeAMember = async (e) => {
    try{
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const memDat = await memData();
        const dias = {
            id: fuid.value,
            name: fname.value,
            rank: frank.value,
            status: fstatus.value,
            bday: new Date(fbday.value).getTime(),
        }
        const DIAS = JSON.stringify(dias);
        console.log(DIAS);
        const membership = await memDat.makeMember(dias.name,dias.rank,dias.bday, DIAS ,dias.status).then(result => { return result; });
        form.style.display = "none";
        onboardButton.innerHTML = "<b>"+accounts[0].slice(0,5)+"..."+accounts[0].slice(38,42)+"</b>"; 
        onboardButton.removeEventListener("click",onClickCreate);
        // onboardButton.addEventListener("click",onClickGoPro);
    } catch (error) {
        console.error(error);
        form.style.display = "none";
        onboardButton.innerText = 'Connect';
        onboardButton.removeEventListener("click",onClickCreate);
        onboardButton.addEventListener("click",onClickConnect);
    }
};
const tellRank = (rank) => {
    let title;
    if(rank >= 11) title = "USER";
    if(rank >= 11) title = "MEMBER";
    if(rank >= 22) title = "AMATEUR";
    if(rank >= 33) title = "PRO";
    if(rank >= 44) title = "EXPERT";
    if(rank >= 55) title = "VIRTU0X0";
    if(rank >= 66) title = "MODERATOR";
    if(rank >= 77) title = "PARTNER";
    if(rank >= 88) title = "MANAGER";
    if(rank == 99) title = "ADMIN";
    return title;
};
const goMyPro = async (e) => {
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const memDat = await memData();
        myPro.style.display = "block";
        allMem.style.display = "none";
        const id = await memDat.slotId(accounts[0]).then(result => {return Number(result._hex);});
        console.log("my pro", id);
        const proData = await memDat.members(id - 1).then(result => {return result;});

        

        myPro.innerHTML = "<div id='board'><div id='proCard'><div id='name'>"+ proData.name +
                            "</div><div id='status'>"+ proData.status  +
                            "</div><div id='rank'>"+ tellRank(proData.rank)  +
                            "</div><div id='bday'>"+ proData.bday  +
                            "</div><div id='dias'>"+ proData.dias  +
                            "</div><div id='since'>"+ proData.since  +"</div><div id='steps'>"+ count  + steps + " steps</div></div></div>";
        proCard.style.gridRow = 2;
        proCard.style.gridColumn = id;


    } catch(error) {
        console.error(error);
    }
};
const goAllMem = async (e) => {
    try {
        const memDat = await memData();
        allMem.style.display = "block";
        myPro.style.display = "none";
        const count = await memDat.countMem().then(result => {return Number(result._hex);});
        let addi = "";
        for(let i = 0; i < count-1; i++){
            console.log("all mem", i + 1);   
            const proData = await memDat.members(i).then(result => {return result;});
            addi += "<div id='proCard'>"+ (i + 1) + ' | '+ proData.name + " - "+ tellRank(proData.rank) +"</div>";
        }
        allMem.innerHTML = "<div id='board'>"+ addi +"</div>";
        
    } catch(error) {
        console.error(error);
    }
};
const log = async () => {
   
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const memDat = await memData();
    // const verify = await memDat.verify(accounts[0],"dynMem",);
    const sign = signer.signMessage("dynMem");
    const isUser = await memDat.isSigned().then(result => { console.log(result); return result; });
    const userId = Number(isUser._hex);
    // console.log(userId);
    if(userId === 0){
        // generate new random number 
        const vrfReq = await memDat.doRand().then(result => { return result; });
        onboardButton.innerHTML = "<b style='color:red'>create account</b>";  
        onboardButton.removeEventListener("click",onClickConnect);
        onboardButton.addEventListener("click",onClickCreate);
        onboardButton.disabled;
    }
    else {
        links.style.display = "block";
        onboardButton.innerHTML = "<b>"+accounts[0].slice(0,5)+"..."+accounts[0].slice(38,42)+"</b>"; 
        myProBtn.addEventListener("click",goMyPro);
        allMemBtn.addEventListener("click",goAllMem);
    }
    


   
};
/*
const s0xData = async () => {
    
    const deploymentKey = Object.keys(s0xiety.networks)[0];
    // console.log(s0xiety.abi,provider);
    return new ethers.Contract(
            s0xiety
            .networks[deploymentKey]
            .address, s0xiety.abi, signer
    );
}
*/
const memData = async () => {
    
    const deploymentKey = Object.keys(dynMem.networks)[0];
    // console.log(s0xiety.abi,provider);
    return new ethers.Contract(
            dynMem
            .networks[deploymentKey]
            .address, dynMem.abi, signer
    );
}


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




//////////////////////////////////////////
//                                      //
//          Connect Web3                //
//                                      //
//////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    initialize();
});