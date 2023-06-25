import { useState } from "react";
import { ethers } from "ethers";
import bidabi from "../utils/bidabi.json"
import stakeabi from "../utils/stakeabi.json"
import { ChainId } from "@biconomy/core-types";

const Modal = ({ isOpen, close, smartAccount, provider }) => {
  const [bidContract, setBidContract] = useState({})
  const [stakeContract, setStakeContrace] = useState({})
  console.log("address bel")
  console.log(smartAccount.address)
  if (!isOpen) {
    return null;
  }

  const handleStake = async() => {
    console.log("staker")
    const balanceParams =
      {
// if no chainId is supplied, SDK will automatically pick active one that
// is being supplied for initialization
        chainId: ChainId.POLYGON_MUMBAI, // chainId of your choice
        eoaAddress: smartAccount.address,
        // If empty string you receive balances of all tokens watched by Indexer
        // you can only whitelist token addresses that are listed in token respostory
        // specified above ^
        tokenAddresses: [], 
      };


const balFromSdk = await smartAccount.getAlltokenBalances(balanceParams);
console.info("getAlltokenBalances", balFromSdk);
    try {
      const contract = new ethers.Contract(
        "0x32bf784e042986b7B78aEAcFbE2c4FF0D43cbb54",
        stakeabi,
        provider,
      )
      const overrides = { value: 10000000000000000}
      const stakeTx = await contract.populateTransaction.stake({value: ethers.utils.parseEther('0.01')})
      const tx1 = {
        to: "0x32bf784e042986b7B78aEAcFbE2c4FF0D43cbb54",
        data: stakeTx.data,
        }
        const txResponse = await smartAccount.sendTransaction({ transaction: tx1})
  
        const txHash = await txResponse.wait();
        console.log({txHash})
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl max-w-lg w-full p-6">
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            Modal Title
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              This is the content of the modal.
            </p>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
        <button onClick={handleStake} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
            Sponsored Stake
          </button>
          <button onClick={close} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal