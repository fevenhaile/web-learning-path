'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('email', formData.email);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const signupResponse = await axios.post('https://akil-backend.onrender.com/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role || 'user'
      });

      if (signupResponse.status === 200 && signupResponse.data.success) {
        const verificationResponse = await axios.post('https://akil-backend.onrender.com/verify-email', {
          email: formData.email
        });

        window.location.href = '/component/verification';
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('There was an error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'Signup failed. Please try again.');
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/component/verification' });
  };

  return (
    <div className="flex justify-center items-center h-full bg-white">
      <div className="w-[40%] p-8 rounded-lg shadow-md bg-white">
        <h1 className="font-poppins text-4xl font-black leading-[38.4px] text-center mb-6">Sign Up Today!</h1>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center bg-transparent border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md w-full mb-4 hover:bg-gray-100"
        >
          <img src="https://static-00.iconduck.com/assets.00/google-icon-512x512-wk1c10qc.png" alt="Google" className="w-9 h-9 mr-1" />
          Sign Up with Google
        </button>

        <div className="text-center mb-4">
          <span className="text-gray-400">Or Sign Up with Email</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              name="role"
              type="text"
              placeholder="Enter your role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="flex items-center justify-center">
            <button
              className="bg-[#4640DE] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Continue
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-gray-700">Already have an account? </span>
            <a href="#" className="text-blue-500 font-bold">Login</a>
          </div>

          <div className="text-center mt-4 text-sm text-gray-500">
            By clicking ‘Continue’, you acknowledge that you have read and accepted our <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
