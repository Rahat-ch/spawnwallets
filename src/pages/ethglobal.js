import { useState } from "react";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import Modal from "../components/Modal";

function EthGlobal () {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
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
            dappAPIKey: "cU8AbO4sz.1e2049d7-ac7e-4c8b-a1d9-b8d3b663df7d",
          },
        ],
      });
      await wallet.init();
      setSmartAccount(wallet);
      setAddress(wallet.address);
      const isDeployed = await wallet.isDeployed(ChainId.POLYGON_MUMBAI)
      if(!isDeployed) {
        const deployTx = await wallet.deployWalletUsingPaymaster()
        console.log(deployTx);
      }
    } else {
      alert('No Wallet Detected')
    }
  }

  const handleStake = () => {
    console.log("stakey")
    openModal()
  }
  console.log({ address })
  return(
    <>
    <Modal isOpen={isOpen} close={closeModal} provider={provider} smartAccount={smartAccount} />
    <h1>eth global page</h1>
    { !!!address && <button onClick={() => handleWalletConnect()}>connect</button>}
    { !!address && <button onClick={() => handleStake()}>Stake</button>}
    </>
  )
}

export default EthGlobal;
