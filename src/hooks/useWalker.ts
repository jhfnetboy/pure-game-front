import { ethers, providers } from "ethers";
import { useEffect, useState } from "react";
require('dotenv').config();
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
// const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const Walker = require('../artifacts/contracts/Walker.sol/Walker.json');

const localAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// const ropstenAddress = "0xAf0eDf79D9bb4cC0481ddC0e157c906Fc5384FB8"
const CONTRACT_ADDRESS = "0x238e289247CD6122EdCd65216A9b8bE4e8f963BA"

const contractAddress = (networkName: string) => {
//   return networkName === "ropsten" ? CONTRACT_ADDRESS : localAddress
    return networkName === "maticmum" ? CONTRACT_ADDRESS : localAddress
}

type Props = {
  web3: providers.Web3Provider | undefined
}

function useWalker({ web3 }: Props) {
  const [address, setAddress] = useState<string>(localAddress)

  useEffect(() => {
    web3?.detectNetwork().then((network) => {
      const address_ = contractAddress(network.name)
      setAddress(address_)
    })
  }, [web3])

  const fetchWalkerName = async (walkerID: number) => {
    if (typeof web3 === "undefined") return

    const contract = new ethers.Contract(address, Walker.abi, web3)

    try {
      const data = await contract.tokenWalkerName(walkerID)
      console.log("data: ", data)
      return data
    } catch (err) {
      console.log("Error: ", err)
      throw err
    }
  }

  const setWalkerName = async (walkerID: number, walkerName: string) => {
    if (typeof web3 === "undefined") return
    if (!setWalkerName) throw new Error("Record Empty")

    const signer = web3.getSigner()
    const contract = new ethers.Contract(address, Walker.abi, signer)
    const transaction = await contract._setTokenName(walkerID, walkerName)
    await transaction.wait()
  }

  const mintWalker = async (mint_address: string, walkerName: string) => {
    if (typeof web3 === "undefined") return
    if (!setWalkerName) throw new Error("Record Empty")

    const signer = web3.getSigner()
    const contract = new ethers.Contract(address, Walker.abi, signer)
    try{
      const transaction = await contract.mint(mint_address, walkerName)
      await transaction.wait()
      console.log("Tx: ", transaction)
      return 
    }catch (err) {
      console.log("Error: ", err)
      throw err
    }
  }

  const getNftCount = async (wallet_address: string) => {
    if (typeof web3 === "undefined") return
    if (!setWalkerName) throw new Error("Record Empty")

    const signer = web3.getSigner()
    const contract = new ethers.Contract(address, Walker.abi, signer)
    console.log("userwork invoke: "+wallet_address)
    const count = await contract.balanceOf(wallet_address)
    console.log(count)
    // await count.wait()
    return parseInt(count,16)
  }  

  return [fetchWalkerName, setWalkerName, mintWalker, getNftCount] as const
}

export default useWalker
