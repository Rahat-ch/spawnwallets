import React from "react";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";

function UploadAds() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files[0]); // Do something with the uploaded file
  };

  return (
      <form className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md my-2">
        <h2 className="text-lg font-medium mb-4">Upload and Configure Ad</h2>
        <div className="relative w-full mb-4">
          <select
            className="appearance-none bg-gray-100 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full cursor-pointer"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select an option</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
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
        </div>
        <div
          className="h-48 w-full max-w-md border-dashed border-gray-300 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer"
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
