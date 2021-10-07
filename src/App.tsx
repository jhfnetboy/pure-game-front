import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'

import { providers } from 'ethers';
// import { Provider } from '@ethersproject/providers'
import React, { useEffect, useRef, useState } from 'react';
// import useGreeter from './hooks/useGreeter';
import useWalker from './hooks/useWalker';
import useNetwork from './hooks/useNetwork';

// function App(): JSX.Element {
function App(){  
      // wallet connect
      const [network, setNetwork] = useState<providers.Network>()
      const [account, setAccount] = useState<string>()
      const [walker, setWalker] = useState<string>()
      const [appMsg, setAppMsg] = useState<string>()
      const inputElm = useRef<HTMLInputElement>(document.createElement("input"))
      const walkerID = 1
      const [{ web3 }, handleNetwork] = useNetwork()
      const [tokenWalkerName, _setTokenName] = useWalker({ web3 })

      useEffect(() => {
        if (typeof web3 === "undefined") {
          initFields()
        } else {
          const setNetworkAccount = async () => {
            web3.detectNetwork().then(setNetwork)
              .catch(showAppMsg)
            web3.listAccounts().then(accounts => {
              setAccount(accounts[0])
            }).catch(showAppMsg)
          }
          setNetworkAccount()
        }
      }, [web3])

      const initFields = () => {
        setNetwork(undefined)
        setAccount(undefined)
        setWalker(undefined)
      }

      const showAppMsg = (err: any) => {
        console.log(err)
        setAppMsg(err.message || `${err}`)
        setTimeout(() => setAppMsg(undefined), 7000)
      }

      const handleConnect = async () => {
        handleNetwork().catch(showAppMsg)
      }

      const handleFetch = async () => {
        tokenWalkerName(walkerID).then(setWalker).catch(showAppMsg)
      }

      const handleSet = () => {
        console.log("set here")
        _setTokenName(walkerID, inputElm.current.value)
          .then(() => {
            inputElm.current.value = ""
            handleFetch()
          })
          .catch(showAppMsg)
      }
      //end wallet func

    //begin mint func
    async function mintWalker() {
      console.log(walkerID)
    } 
    //end mint func

    
    //begin scroll function
    let i = 0
    const txtList = ["My dog has been robbed by Cerberus？", "Oh my poor doggy!  I must save him in this weekend!", "So you carring on your umbrella and dog leash, down to the cellar.", "A adventure is beginging..."]
    function scroll(){
      const scroll1 = document.getElementById('scroll')
      if (i<4 && scroll1){
        console.log(i)
          scroll1.innerText = txtList[i] ? txtList[i] : ''
        i = i +1
      } else{
        console.log('start')
        if(scroll1){
          scroll1.innerText =""
        }
        const play = document.getElementById('create')
        if (play){
          play.style.display = 'inline';
        }
        
      }

    }
    // end scroll func

    // return result
    return (
            <div className="flex flex-col h-screen items-start overflow-x-hidden bg-custom-background">
                <header className="App-header">
                <div id="scroll" onClick={() => {scroll()}}>  What the hell? </div>
                 
                <div id="create" className="ml-20 " style={{display: 'none'}}>
                    <div className="text-white bg-custom-black py-1 px-2 text-2xl" >
                              <h3>Create your player, rescue your dog!</h3><br/>  
                              <FontAwesomeIcon
                                              icon={faDog}
                                              className="mt-80 ml-200 text-center"
                                              color="white"
                                              size="4x"
                                              onClick={() => {mintWalker()}}
                                          />
                                          <br/><br/>          
                 
                </div>
                </div>
                <div className="text-white bg-custom-black py-1 px-2 text-xl">
                  <button onClick={handleConnect}>{web3 ? "Disconnect" : "Connect"}</button><br />
                  <button onClick={handleFetch}>Fetch My Player info</button><br />
                  <button onClick={handleSet}>Set New Name</button>
                  <input ref={inputElm} placeholder="reSet My Player Name" /><br />
                  <hr />
                  <div>
                  Network: {network?.chainId} {network?.name}<br />
                  Account: {account}<br />
                  WalkerName: {walker}<br />
                  StatusMessage: {appMsg}<br />
                  </div>
                </div>
                <i>Test using Matic TestNet, 80001</i>
                </header> 
            </div>
    )//end return
}//end app func

export default App