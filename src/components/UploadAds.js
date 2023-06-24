import React from "react";
import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { Web3Storage } from 'web3.storage'

function UploadAds({addThumbnail}) {
  const [selectedContract, setSelectedContract] = useState("");
  const [availableContracts, setAvailableContracts] = useState([]);
  const [feePerUser, setFeePerUser] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const handleOptionChange = (e) => {
    setSelectedContract(e.target.value);
  };

  const handleFeePerUserChange = (e) => {
    setFeePerUser(e.target.value);
  };

  const handleMaxBudgetChange = (e) => {
    setMaxBudget(e.target.value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files[0]); // Do something with the uploaded file
    makeFileObjects(e.dataTransfer.files[0].text());
  };
  function makeStorageClient () {
    return new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY })
  }

  async function makeFileObjects (blob) {
    const client = makeStorageClient()
    const file = new File([blob], 'video.mp4', { type: 'video/mp4' });
    const cid = await client.put([file]);
    addThumbnail();
    console.log('CID:', cid);
    return cid;
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/sponser-contract-mapping.json");
      const json = await res.json();
      setAvailableContracts(json.contracts);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // You can access the form field values from the component's state
    // and the uploaded file can be accessed from the makeFileObjects function
    
    // Example: Log the form field values and the uploaded file CID
    console.log("Selected Contract:", selectedContract);
    console.log("Fee Per User:", feePerUser);
    console.log("Max Budget:", maxBudget);
    
    makeFileObjects(file)
      .then((cid) => {
        console.log("CID:", cid);
        // Perform additional logic with the CID if needed
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };


  return (
    <form className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md my-2" onSubmit={handleSubmit}>
      <h2 className="text-lg font-medium mb-4">Upload and Configure Ad</h2>

      <div className="flex">
        <div className="mr-4">
          <label
            htmlFor="selectedContract"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Contract to sponsor
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <select
              className="appearance-none bg-gray-100 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block cursor-pointer input-field"
              value={selectedContract}
              onChange={handleOptionChange}
            >
              {availableContracts.length > 0 ? (
                availableContracts.map((contractsDetails) => (
                  <option
                    key={contractsDetails.address}
                    value={contractsDetails.address}
                  >
                    {contractsDetails.name}
                  </option>
                ))
              ) : (
                <option value="">No Contract available to select</option>
              )}
            </select>
          </div>
        </div>

        <div className="mr-4">
          <label
            htmlFor="feePerUser"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Fee Per User
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type="text"
              name="feePerUser"
              id="feePerUser"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
              placeholder="0.00"
              aria-describedby="feePerUser-currency"
              value={feePerUser}
              onChange={handleFeePerUserChange}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm" id="feePerUser-currency">
                ETH
              </span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="maxBudget"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Max Budget
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type="text"
              name="maxBudget"
              id="maxBudget"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
              placeholder="0.00"
              aria-describedby="maxBudget-currency"
              value={maxBudget}
              onChange={handleMaxBudgetChange}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm" id="maxBudget-currency">
                ETH
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.707 14.707a1 1 0 01-1.414 0l-3.586-3.586a1 1 0 111.414-1.414L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3.586 3.586z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div
        className="mt-2 h-48 w-full max-w-md border-dashed border-gray-300 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <FiUpload className="text-gray-500 text-4xl mb-2" />
        <p className="text-gray-500 mb-2">Drag and drop file here</p>
        <p className="text-gray-400 text-sm">
          or{" "}
          <span className="text-blue-500 cursor-pointer hover:text-blue-400">
            choose a file
          </span>{" "}
          from your computer
        </p>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default UploadAds;
