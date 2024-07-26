// src/VerificationCode.tsx

import React, { useState } from 'react';
import axiosInstance from '../config/axios.config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
interface IProp{
    email: string;
  
}

const VerificationCode= ({email}:IProp) => {
  const navigator = useNavigate()
  const [code, setCode] = useState<string>('');

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]{0,6}$/.test(value)) {
      setCode(value);
      
      // Move focus to the next input if the value is not empty
      if (value.length > index) {
        const nextSibling = document.getElementById(`code-${index + 1}`);
        if (nextSibling) {
          nextSibling.focus();
        }
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData('text');
    if (/^[0-9]{6}$/.test(pasteData)) {
      setCode(pasteData);
    }
  };
   
  const url = "/api/Auth/complete-registration"
  const handleSubmit =async () => {
    try {
        const {status,data} = await axiosInstance.post(url,{email: email,code:code})
        console.log(data)
        if (status === 200)if (status === 200) {
            toast.success("You will navigate to the login page in 2 seconds!", {
              position: "bottom-center",
              duration: 1500,
              style: {
                backgroundColor: "black",
                color: "white",
                width: "fit-content",
              },
            });
            setTimeout(() => {
              navigator("/Admin");
            }, 2000);
          }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h2 className="text-2xl font-semibold mb-4">Enter Verification Code</h2>
      <div className="flex space-x-2">
        {new Array(6).fill('').map((_, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            value={code[index] || ''}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value.slice(-1), index)}
            onPaste={handlePaste}
            className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Verify
      </button>
    </div>
  );
};

export default VerificationCode;
