

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom } from '@fortawesome/free-solid-svg-icons'
const event = require('../local-storage/event.json')

export default function Adventure() {
    //clear Q1,2,3,show Ax(1 or 2 or 3)
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
            // console.log('clear Q1,2,3: '+count.toString()) 
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

    // function battle(num: number){
    //     if (num<2) return null
    //     if (num>9) return null
    //     let battleLog = document.getElementById("log")
    //      if (battleLog){
    //         battleLog.innerHTML = "You meet a monster!"

    //         battleLog.innerHTML = battleLog.innerHTML +"Finghting is begin!"

    //      }
         

    // }


    return (
        <>
            {/* <div className="w-full mb-44">
                <img alt="sword" src={adventure} className="mx-auto w-16 mt-4 md:w-32" />
                <img alt="sword" src={title} className="mx-auto w-52 mt-4 md:w-64" />
            </div> */}
            <div className="w-full bg-custom-black text-center pb-24">
                {/* <img alt="sword" src={mountain} className="mx-auto w-52 -m-32" /> */}
                {/* <img alt="sword" src={explore} className="mx-auto w-52 mt-32 md:w-1/4 my-4" /> */}
                {/* <span className="text-md md:text-2xl text-white mb-14">Journey Awaiting</span> */}
                {/* <p className="w-full text-x text-white my-4">Send all summoners to adventure</p> */}
                

                <div className="text-white ml-40 mr-40 text-xl font-bold border-4 border-white" id="stage">
                    It is a test of stage, click your choice!<br/>
                    cat: {event.cat}||| id: {event.id}
                    <FontAwesomeIcon
                                icon={faRandom}
                                className="mt-1 ml-20"
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
            </div>
        </>
    )
}
