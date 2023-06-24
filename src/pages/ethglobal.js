import { useState } from "react";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";

function EthGlobal () {
  const [ address, setAddress ] = useState("")
  const [ provider, setProvider ] = useState({})
  const [ smartAccount, setSmartAccount ] = useState({})
  const handleWalletConnect = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(ethereum)
      await web3Provider.send("eth_requestAccounts", []);
      setProvider(web3Provider)
      const wallet = new SmartAccount(web3Provider, {
        activeNetworkId: ChainId.POLYGON_MUMBAI,
        supportedNetworksIds: [ChainId.POLYGON_MUMBAI],
        networkConfig: [
          {
            chainId: ChainId.POLYGON_MUMBAI,
            dappAPIKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY,
          },
        ],
      });
      await wallet.init();
      setSmartAccount(wallet);
      setAddress(wallet.address);
      const deployedStatus = await wallet.isDeployed(ChainId.POLYGON_MUMBAI)
      if(deployedStatus) {
        console.log("deployed")
      } else {
        console.log("na")
        const deployTx = await wallet.deployWalletUsingPaymaster()
        console.log(deployTx);
      }
    } else {
      alert('No Wallet Detected')
    }
  }

  const handleStake = () => {
    console.log("stakey")
  }
  console.log(smartAccount)
  return(
    <>
    <h1>eth global page</h1>
    { !!!address && <button onClick={() => handleWalletConnect()}>connect</button>}
    { !!address && <button onClick={() => handleStake()}>Stake</button>}
    </>
  )
}

export default EthGlobal;
