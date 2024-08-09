'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = localStorage.getItem('email');

  console.log(email,1010)
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    // Automatically focus the next input field
    if (e.target.value && index < 3) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async () => {
    const OTP = code.join('');

    try {
      const response = await axios.post('https://akil-backend.onrender.com/verify-email', {
        email,
        OTP,
      });

      setSuccess('Successfully registered!');
      setError('');
      // Optionally clear the code inputs
      setCode(['', '', '', '']);
    } catch (error) {
      console.log(error, OTP, email);
      setError('Verification failed. Please try again.');
      setSuccess('');
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-[25%] p-6 rounded-lg shadow-md">
        <h1 className="font-poppins text-4xl font-black leading-[38.4px] text-center mb-4">Verify Email</h1>
        <div className="text-sm font-normal leading-relaxed text-justify text-gray-400 mb-6">
          We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
        </div>
        <div className="flex w-full gap-8 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              className="py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-[35%] h-[50px] border-2 border-[#4640DE66] text-center"
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        <div className="text-center text-gray-400 mb-6">
          You can request to <span className="text-blue-600">Resend code</span> in <span className="font-semibold">0:30</span>
        </div>
        <div className="flex justify-center">
          <button
            className="w-[100%] py-3 bg-[#4640DE4D] text-white rounded-full hover:bg-purple-300 transition duration-300"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
