import React, { useEffect, useRef, useState } from 'react';
import { providers } from 'ethers';
import { notification,Button } from 'antd';
import 'antd/dist/antd.css';
import useNetwork from '../hooks/useNetwork';
import useWalker from '../hooks/useWalker';
const battleEvent = require('./local-storage/battle-event.json')

export function toolBottom(){

    const [lastPressedKey, setLastPressedKey] = useState<string>()
    const componentDidMount= ()=> {
      window.addEventListener("keydown", handleKeyPress);
    }
    const componentWillUnmount=()=> {
      window.removeEventListener("keydown", handleKeyPress);
    }
    const handleKeyPress = (event:KeyboardEvent) => {
      setLastPressedKey(event.key);
      console.log("Press key",event.key)
      console.log("Press keyTrue",event.code)
      console.log("Press keyCode",event.keyCode)
    };
    componentDidMount()
        // wallet connect
        const [network, setNetwork] = useState<providers.Network>()
        const [account, setAccount] = useState<string>()
        // const [notifyTitle, setTitle] = useState<string>()
        // const [descriptionContent, setDes] = useState<string>()
        const [adv, setAdv] = useState<string>()
        const [nftCount, setNftCount] = useState<number>()
        const [walker, setWalker] = useState<string>()
        const [appMsg, setAppMsg] = useState<string>()
        const inputElm = useRef<HTMLInputElement>(document.createElement("input"))
        const walkerID = 2
        const [{ web3 }, handleNetwork] = useNetwork()
        const [fetchWalkerName, setWalkerName, mintWalker, getNftCount] = useWalker({ web3 })
  
        useEffect(() => {
          if (typeof web3 === "undefined") {
            initFields()
            console.log("clear 4 state")
          } else {
            const setNetworkAccount = async () => {
              web3.detectNetwork().then(setNetwork)
                .catch(showAppMsg)
              web3.listAccounts().then(accounts => {
                // console.log(accounts)
                setAccount(accounts[0])
                // console.log("initial "+account)
              }).catch(showAppMsg)
            }
            setNetworkAccount()
          }
        }, [web3])
  
        const initFields = () => {
          setNetwork(undefined)
          setAccount(undefined)
          setWalker(undefined)
          setNftCount(undefined)
        }
  
        const showAppMsg = (err: any) => {
          console.log(err)
          setAppMsg(err.message || `${err}`)
          setTimeout(() => setAppMsg(undefined), 7000)
          notificationInfo("Error or failed", err.message || `${err}`)
        }
        const handleConnect = async () => {
          handleNetwork().catch(showAppMsg)
        }

        function notificationInfo(title: string, content: string){
            notification['info']({
              message: title,
              description: content,
            }); 
          }
          const handleFetch = async () => {
            fetchWalkerName(walkerID).then(setWalker).catch(showAppMsg)
          }
    
          const handleFetchCount = async () => {
            if(account){
              console.log("Fetch nfts for address :getNftCount"+account)
              getNftCount(account).then(setNftCount).catch(showAppMsg)
            }
          }        
          
          const handleSet = () => {
            console.log("set here")
            setWalkerName(walkerID, inputElm.current.value)
              .then(() => {
                inputElm.current.value = ""
                handleFetch()
              })
              .catch(showAppMsg)
          }

          const handleBattle = () => {
            console.log("battle begin")
            clearQlist(1)
            clearQlist(2)
            clearQlist(3)
            const randomNum = Math.floor((Math.random()*3))
            loadBattle(randomNum)
      
          }
          function clearQlist(count: number){
            if(count!==1){//check is A
                const txt1 = document.getElementById("choice1")
                const txt2 = document.getElementById("choice2")
                const txt3 = document.getElementById("choice3")
                if(txt1){
                    txt1.innerText='' 
                }    
                if(txt2){
                    txt2.innerText='' 
                }    
                if(txt3){
                    txt3.innerText='' 
                }     
                console.log('clear Q1,2,3: '+count.toString()) 
            }              
        }    
    //end adventure func
    function loadBattle(randomNum: number){
        const choiceTxt1 = document.getElementById("choice1")
        // const choiceTxt2 = document.getElementById("choice2")
        // const choiceTxt3 = document.getElementById("choice3")  
        
        choiceTxt1 ? choiceTxt1.innerHTML = choiceTxt1.innerHTML + '<br/>'+battleEvent[randomNum].data[0].prefix : console.log('battle load')  
        choiceTxt1 ? choiceTxt1.innerHTML = choiceTxt1.innerHTML + '<br/>'+battleEvent[randomNum].data[0].choices['f'] : console.log('battle load')  
        choiceTxt1 ? choiceTxt1.innerHTML = choiceTxt1.innerHTML + '<br/>'+ battleEvent[randomNum].data[0].answers['f']  : console.log('battle load')  
        // choiceTxt1 ? choiceTxt1.innerHTML = choiceTxt1.innerHTML + '<br/>'+ battleEvent[randomNum].data[0].choices['s']  : console.log('battle load')  
        choiceTxt1 ? choiceTxt1.innerHTML = choiceTxt1.innerHTML + '<br/>'+ battleEvent[randomNum].data[0].answers['s']  : console.log('battle load')  
        // choiceTxt1 ? choiceTxt1.innerHTML = choiceTxt1.innerHTML + '<br/>'+ battleEvent[randomNum].data[0].choices['t']  : console.log('battle load')  
        choiceTxt1 ? choiceTxt1.innerHTML = choiceTxt1.innerHTML + '<br/>'+ battleEvent[randomNum].data[0].answers['t']  : console.log('battle load')  
      }                        
    return(
        <div>
        --------------------------------
        <div className="text-white bg-custom-black py-1 px-2 text-xl">
          <button onClick={handleConnect}>{web3 ? "Disconnect" : "Connect"}</button><br />
          <button onClick={handleFetch}>Fetch My Walker info</button><br />
          <button onClick={handleSet}>Set New Name</button>
          <input ref={inputElm} placeholder="reSet My Walker Name" /><br />
          <button onClick={handleFetchCount}>get My NFT count</button><br />
          <Button type="primary" onClick={handleBattle}>Battle now</Button>
          <hr />
          <div>
          Network: {network?.chainId} {network?.name}<br />
          Account: {account}<br />
          WalkerName: {walker}<br />
          StatusMessage: {appMsg}<br />
          Has NFTs: {nftCount}<br />
          <a href="typer.js" target="_blank">typer</a>
          </div>
        </div>
        <i>Test using Matic TestNet, 80001</i>  
        <div>Key last pressed: {lastPressedKey}</div>  
        </div>
        )
}
