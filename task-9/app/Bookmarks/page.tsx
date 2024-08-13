'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoBookmarksOutline, IoBookmarks } from 'react-icons/io5';
import { JobType } from '../lib/jobs';
import Link from 'next/link';

const BookmarksPage = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (token) {
      fetchBookmarks(token)
        .then((result) => {
          if (result.success && Array.isArray(result.data)) {
            setBookmarkedJobs(result.data);
          }
        })
        .catch((error) => {
          console.error('Error processing bookmarks:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchBookmarks = async (token: string) => {
    try {
      const response = await axios.get('https://akil-backend.onrender.com/bookmarks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      return { success: false, data: [] };
    }
  };

  const removeBookmark = async (id: string, token: string) => {
    try {
      const response = await axios.delete(
        `https://akil-backend.onrender.com/bookmarks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }
  };

  const handleRemoveBookmark = async (jobId: string) => {
    if (!token) {
      console.error('No token available');
      return;
    }

    const success = await removeBookmark(jobId, token);
    if (success) {
      setBookmarkedJobs((prevBookmarkedJobs) =>
        prevBookmarkedJobs.filter((job) => job.id !== jobId)
      );
    }
  };

  return (
    <div className="container mx-auto p-4 w-full h-full">
      <nav className="flex items-center justify-between w-full bg-gray-300 p-4">
        <div className="flex space-x-8">
          <p className="text-black text-xl font-bold font-poppins hover:text-gray-300 transition duration-300 cursor-pointer">
            <Link href="/">Job Listing</Link>
          </p>
        </div>
        <div className="flex space-x-4">
          <Link href="/">
            <button
              onClick={() => router.back()}
              className="text-white font-poppins px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Back
            </button>
          </Link>
          <Link href="/Bookmarks">
            <button className="text-white font-poppins px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300">
              Bookmarks
            </button>
          </Link>
        </div>
      </nav>
      <h1 className="text-4xl font-bold mb-4">Bookmarked Opportunities</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bookmarkedJobs.length > 0 ? (
        bookmarkedJobs.map((job: JobType) => (
          <div
            key={job.id}
            className="relative w-full max-w-[815px] h-[266px] p-6 rounded-lg shadow-md flex bg-white mx-auto mb-4"
          >
            <div className="w-full h-full flex items-center cursor-pointer">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={job.logoUrl}
                  alt="Logo"
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <Link href={`/Description/${job.id}`}>
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-customBlue">
                      {job.title}
                    </h2>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-500">
                      {Array.isArray(job.location) ? job.location.join(', ') : job.location}
                    </p>
                  </div>
                </Link>
                <div className="mb-4">
                  <p className="text-gray-700">{job.description}</p>
                </div>
                <div className="flex space-x-2">
                  <div className="flex items-center justify-center h-[31px] px-[10px] rounded-full bg-[#b4edde]">
                    <p className="text-xs font-semibold text-[#56CDAD]">
                      {job.opType === 'inPerson' ? 'In Person' : 'Virtual'}
                    </p>
                  </div>
                  {Array.isArray(job.categories) && job.categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-center h-[31px] px-[10px] rounded-full border border-[#FFB836]"
                    >
                      <p className="text-xs font-semibold text-[#FFB836]">
                        {category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => handleRemoveBookmark(job.id)}
              >
                <IoBookmarks className="text-blue-500" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No bookmarked job opportunities found.</p>
      )}
    </div>
  );
};

export default BookmarksPage;
