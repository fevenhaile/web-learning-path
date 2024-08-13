'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://akil-backend.onrender.com/login', {
        email,
        password,
      });

      // Check if login was successful
      if (response.status === 200 && response.data.success) {
        setMessage('Successfully logged in!');
        setMessageType('success');
        localStorage.setItem('userToken', response.data.token); // Store the session token
        router.push('/HomePage');
      } else {
        setMessage('Email or password is not correct.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Email or password is not correct.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-[40%] p-6 rounded-lg shadow-md">
        <h1 className="font-poppins text-4xl font-black leading-[38.4px] text-center mb-4">Welcome Back,</h1>
        
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className={`mb-4 text-sm ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-[#4640DE] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-gray-700">Don’t have an account? </span>
            <Link href="/component/SignUp">
              <p className="text-blue-500 font-bold">Sign Up</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
