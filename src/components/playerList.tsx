import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom } from '@fortawesome/free-solid-svg-icons'
import 'antd/dist/antd.css';
import './App.css';
import { notification,Button } from 'antd';
// import EasyTyper from 'easy-typer-js'
import TypeWriterEffect from 'react-typewriter-effect';

const event = require('./local-storage/event.json')
const battleEvent = require('./local-storage/battle-event.json')
export function playerList(){

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
        if(Math.floor((Math.random()*10))>6){
          handleBattle()
        }
    
} 

const handleBattle = () => {
    console.log("battle begin")
    clearQlist(1)
    clearQlist(2)
    clearQlist(3)
    const randomNum = Math.floor((Math.random()*3))
    loadBattle(randomNum)

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
    const myAppRef = document.querySelector('#scrollable-div')
return 
(
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
    <div id="scrollable-div"></div>
    <TypeWriterEffect
        textStyle={{ fontFamily: 'Red Hat Display' }}
        startDelay={100}
        cursorColor="black"
        text="The talk and battle text will be shown here"
        typeSpeed={100}
        scrollArea={myAppRef}
      />
    <br/>
  </div>
  </header>
</div>
  )
}

