import 'antd/dist/antd.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { faRandom } from '@fortawesome/free-solid-svg-icons'
import { providers } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import useWalker from './hooks/useWalker';
import useNetwork from './hooks/useNetwork';
import { notification,Button } from 'antd';
import classnames  from 'classnames';
import EasyTyper from 'easy-typer-js'
const event = require('./local-storage/event.json')
const battleEvent = require('./local-storage/battle-event.json')
// import Routes from './routes'
// import { Router } from 'react-router';

// function App(): JSX.Element {
function App(){  
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

      // todo todo
      // const handleGetAccountWalker = async () => {
      //   fetchWalkerName(walkerID).then(setWalker).catch(showAppMsg)
      // }      
      
      const handleFetch = async () => {
        fetchWalkerName(walkerID).then(setWalker).catch(showAppMsg)
      }

      const handleFetchCount = async () => {
        if(account){
          console.log("Fetch nfts for address :getNftCount"+account)
          getNftCount(account).then(setNftCount).catch(showAppMsg)
        }
      }      

    
      // const handleTestClick = () => {
      //   console.log("test click")
      //   const title = "Test"
      //   const descriptionContent = "Wow~"
      //   notification['info']({
      //     message: title,
      //     description:
      //       descriptionContent,
      //   });
      // };


      const handleNotify = () => {
        console.log("notify")
        notification['info']({
          message: "Title",
          description:
            "Content here",
        });
      };      


      const handleSet = () => {
        console.log("set here")
        setWalkerName(walkerID, inputElm.current.value)
          .then(() => {
            inputElm.current.value = ""
            handleFetch()
          })
          .catch(showAppMsg)
      }
      //end wallet func

      function notificationInfo(title: string, content: string){
        notification['info']({
          message: title,
          description: content,
        }); 
      }
      const handleMint = () => {
        //先再次判断，是不是铸造walker了
        console.log('handleMint invoke: '+account)
        if(account){
          getNftCount(account).then(setNftCount).catch(showAppMsg)
          if(nftCount&&nftCount>0){
            notificationInfo("Do not neet to meant","You have "+nftCount.toString()+" Walker to play")
          }
        }        
        
        if(!network||!account){
          notificationInfo("Network not ready!","Connect the web3 first with bottom tool")
          console.log("Connect the web3 first")
        }
        if(nftCount&&nftCount>0){
          console.log("Boy, you have got the ticket to the hell,GO!")
          const bigtext = document.getElementById("bigtext")
          bigtext ? bigtext.innerText= "Boy, you have got the ticket to the hell,GO!" :console.log("error")
          setAdv('now')
          return null
        }
        if(account && inputElm.current.value){
          console.log("new walker name is:"+inputElm.current.value)
          // console.log("mint a walker named :"+ inputElm.current.value+ ", mint to address:"+account)
          mintWalker(account, inputElm.current.value)
          .then(() => {
            inputElm.current.value = ""
            handleFetch()
          })
          .catch(showAppMsg)
        }
        else{
          console.log('handleMint else: '+account)
          notificationInfo("You have no walker to play, mint one first!","Please input your walker name in bottom input")
          console.log("mint to address or walkerName is empty!")
        }
      }
    // mintwalker
    
    //begin scroll function
    let i = 0
    const txtList = ["My dog has been robbed by the Cerberus？", "Oh my poor doggy!  I must save him in this weekend!", "So you bring on your umbrella and dog leash, down to the cellar.", "A small adventure is begining..."]
    function scroll(){
      if(nftCount===0){
        handleMint()
        if(nftCount>0){
          setAdv("now")
        }
        return null
      }
      //check network
      if(!account){
        notificationInfo("Network not connected", "Try to connecting ...")
          try{
            handleConnect()
          } catch (err) {
        console.log("Error: ", err)
        notificationInfo("Error connecting", "See the console log")
        throw err
        }
        return null
      }
      console.log(nftCount)

      //if network connected, check nftCount
      if(account&&!nftCount&&nftCount!==0){
        console.log(nftCount)
        notificationInfo("Network ok", "Trying to get your walker ...")
        try{
          console.log("app invoke userwalker getNftCount: "+ account )
          getNftCount(account).then(setNftCount).catch(showAppMsg)
          } catch (err) {
        console.log("Error: ", err)
        notificationInfo("Error fetching NFT", "See the console log")
        throw err
        }  
        if(nftCount===undefined||nftCount===0){
          return null
        }
      }    

      //if nftCount ok, jump to play
      if(nftCount&&nftCount>0){
        setAdv('now')
        return null
      }


      const scroll1 = document.getElementById('scroll')
      if (i<4 && scroll1){
        // console.log(i)
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


    //adventure function list
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
  function selectChoice(num: number){
      const choiceTxt = document.getElementById("choice"+num.toString())
      const txt1 = document.getElementById("choice1")
      const txt2 = document.getElementById("choice2")
      const txt3 = document.getElementById("choice3")
      // console.log('click : '+num.toString())
      let count =3
      txt1 ? (txt1.innerText==='' ? count= count-1:count = count+0) :count=count+0   
      txt2 ? (txt2.innerText==='' ? count= count-1:count = count+0) :count=count+0   
      txt3 ? (txt3.innerText==='' ? count= count-1:count = count+0) :count=count+0   
      // console.log('txt count: '+count.toString())      
      clearQlist(count)    
      let result = null
      if(count===3){
          switch (num) {
              case 1:
                  clearQlist(2)
                  choiceTxt ? result = (choiceTxt.innerText = 'A1: '+event.data[Math.floor((Math.random()*10))].answers['f']) : result = null
                  // console.log('txt count: '+count.toString())   
                  return result
              case 2:
                  clearQlist(2)
                  choiceTxt ? result = (choiceTxt.innerText = 'A2: '+event.data[Math.floor((Math.random()*10))].answers['s']) : result = null
                  return result
              case 3:
                  clearQlist(2)
                  choiceTxt ? result = (choiceTxt.innerText = 'A3: '+event.data[Math.floor((Math.random()*10))].answers['t'] ) : result = null   
                  return result
              default :
                  return result                                      
          }            
      }   
      return false     
  }
  //Q1,2,3 refresh, must be false
  function clickNext(){
      const choiceTxt1 = document.getElementById("choice1")
      const choiceTxt2 = document.getElementById("choice2")
      const choiceTxt3 = document.getElementById("choice3")
      // let serror = false
      // console.log('clickNetxt')
          choiceTxt1 ?   choiceTxt1.innerText = 'Q1: '+event.data[Math.floor((Math.random()*10))].choices['f'] : console.log('Q1 be clicked')
          choiceTxt2 ?   choiceTxt2.innerText = 'Q2: '+event.data[Math.floor((Math.random()*10))].choices['t'] : console.log('Q2 be clicked')
          choiceTxt3 ?   choiceTxt3.innerText = 'Q3: '+event.data[Math.floor((Math.random()*10))].choices['t'] : console.log('Q3 be clicked')
      
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


    // begin battle function

    const handleBattle = () => {
      console.log("battle begin")
      clearQlist(1)
      clearQlist(2)
      clearQlist(3)
      const randomNum = Math.floor((Math.random()*3))
      loadBattle(randomNum)

    };    
    // end battle func 


    // return result
    if(adv){
      console.log("adv is "+adv)
      return (
        <div className="flex flex-col h-screen items-start overflow-x-hidden bg-custom-background">
        <header className="App-header">
        <div className="text-white ml-40 mr-40 text-xl font-bold border-8 border-white" id="stage">
        It is a test of stage, click your choice!<br/>
        cat: {event.cat}||| id: {event.id}
        <FontAwesomeIcon
                    icon={faRandom}
                    className="mt-1 ml-40"
                    color="red"
                    size="1x"
                    title="Begin! Rescue you dog!"
                    // forwardedRef=""
                    onClick={() => {clickNext()}}
                /> 
        <hr/>
        <div >
            <div className="text-blue mt-1 ml-0" id="choice1"
            onClick={() => {selectChoice(1)}}
            >1.{event.data[0].choices['f']}</div>
            <div className="text-red mt-1 ml-0" id="choice2"
            onClick={() => {selectChoice(2)}}
            >2.{event.data[0].choices['s']}</div>
            <div className="text-white mt-1 ml-0" id="choice3"
            onClick={() => {selectChoice(3)}}
            >3.{event.data[0].choices['t']}</div>
        </div>
        <br/>
      </div>
      </header>
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
              </div>
            </div>
            <i>Test using Matic TestNet, 80001</i>      
    </div>
      )
    } else{
      return (
        <div className="flex flex-col h-screen items-start overflow-x-hidden bg-custom-background">
          <div>
            <header className="App-header">
            <div id="scroll" className={classnames({"user-select": "none","-webkit-user-select": "none"})} onClick={() => {scroll()}}>  What the hell? </div>
            

            <div id="create" className="ml-20 " style={{display: 'none'}}>
                <div className="text-white bg-custom-black py-1 px-2 text-2xl" >
                          <h3 className="text-white" id="bigtext">Create your Walker, rescue your dog!</h3>
                          <FontAwesomeIcon
                                          icon={faDog}
                                          className="mt-80 ml-200 text-center cursor-pointer"
                                          color="white"
                                          size="4x"
                                          onClick={() => {handleMint()}}
                                          // onMouseOver={()=>this.cursor=hand}
                                      />
                                      {/* <Router><Routes /></Router> */}
                                      
                </div>
            </div>
            </header>
            </div>
            --------------------------------
            <div className="text-white bg-custom-black py-1 px-2 text-xl">
              <button onClick={handleConnect}>{web3 ? "Disconnect" : "Connect"}</button><br />
              <button onClick={handleFetch}>Fetch My Walker info</button><br />
              <button onClick={handleSet}>Set New Name</button>
              <input ref={inputElm} placeholder="reSet My Walker Name" /><br />
              <button onClick={handleFetchCount}>get My NFT count</button><br />
              <Button type="primary" onClick={handleNotify}>Test Button</Button>

              <hr />
              <div>
              Network: {network?.chainId} {network?.name}<br />
              Account: {account}<br />
              WalkerName: {walker}<br />
              StatusMessage: {appMsg}<br />
              Has NFTs: {nftCount}<br />
              </div>
            </div>
            <i>Test using Matic TestNet, 80001</i>
             
        </div>
      )//end return
    }
    
}//end app func

export default App

// http://localhost:8080/pure-game-front/
// https://mumbai.polygonscan.com/tx/0xe8dd990bcf5ab215c50c2eaef77956406b119373c2596eadb31aeb5272de9cdc