import { useEffect, useState } from "react";

// const playWalker = localStorage.getItem("nowWalker")
// playWalker ? playWalker :'no player'
// const ropstenAddress = "0xAf0eDf79D9bb4cC0481ddC0e157c906Fc5384FB8"
const CONTRACT_ADDRESS = "0x238e289247CD6122EdCd65216A9b8bE4e8f963BA"

function useBaseGame() {
  const [nowWalker, setNowWalker] = useState<object>()
//   useEffect(() => {
//       const walkerMap = makeMap(nowWalker)
//     //   setNowWalker(address_)
//     )
//   }, [nowWalker])

//   function makeMap(walker: object){
//     return null
//   }

// 1.检查是否有game cookie，具体cookie内容（localStorage?)
// 包括是否访问过、链接过的钱包地址、是否创建过walker、历史walker name等
// 2.检查是否有localStorage存储的游戏进度
// walker属性、功勋值、今日可玩次数（体力值）、获得材料
  const initialUser = () => {
      const nowWalker = localStorage.getItem("nowWalker")
      if(nowWalker){
          console.log(nowWalker)
        //   return nowWalker
      }else{
          console.log("no walker")
      }
      const nowUser = localStorage.getItem("nowUser")
      if(nowUser){
        let objUser = JSON.parse(nowUser) 
        console.log(objUser)
        // return objUser
    }else{
        console.log("no user")
    }
    const progressRecord = localStorage.getItem("progressRecord")
    if(progressRecord){
      let objUser = JSON.parse(progressRecord) 
      console.log(progressRecord)
      return [objUser, progressRecord]
    }else{
        console.log("no progress")
    }    
  }

// 加载本地缓存并显示Walker信息
// 同时加载最新walker信息，做对比（hash值）是否改变，未改变则不动
// 改变了则刷新Walker信息
//需要wasm的游戏引擎开发完成，输出hash验证，和本地hash对比 TODO
//每次存储，都要向引擎请求一个hash值，存储到本地，因此所有的obj，都要有一个_hash字段 TODO
  const loadWalker = (walkerID: number) => {
    try {
        localStorage.getItem("walkerName",)
          console.log("data: ", walkerID)
          return walkerID
        } catch (err) {
          console.log("Error: ", err)
          throw err
        }
  }

  //存储进度、用户对象
//   attributes = {'STR':2,'DEX':4,'CON':5,'INT':4,'CHA':3,'LUK':7}
//   user =[{"walkerID":123, "walkerName":'player1',"walkerID":223, "attributes": attributes},
// {"walkerID":123, "walkerName":'player1',"walkerID":223, "attributes": attributes}
// ]
// progress = [{"layer":1,"events":events}, {"layer":2,"events":events}]
// events = [{"id":1,"selected":2}]
  const saveWalker = (walker: object) => {
    try {
        localStorage.setItem("nowWalker", JSON.stringify(walker))
          console.log("data: ", walker)
        } catch (err) {
          console.log("Error: ", err)
          throw err
        }
  }


//   exitCheck
// 退出检查
// 提示：是否存储功勋值和获取的材料到链上？还是加密存储到本地？
// 存储到链上则调用钱包存储
// 否则则大约5分钟或者关键节点，自动存储

//   autoSave
// 1.打死Boss了，存储下时间，功勋值
// 2.打死妖怪了，存储下时间，获得物品，功勋值

  
  return [initialUser, loadWalker] as const
}

export default useBaseGame
