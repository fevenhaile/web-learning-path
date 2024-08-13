'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoBookmarksOutline, IoBookmarks } from 'react-icons/io5';
import { getJobsData, JobType } from '../lib/jobs';
import Link from 'next/link';

const HomePage = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (token) {
      fetchBookmarks(token)
        .then((result) => {
          if (result.success && Array.isArray(result.data)) {
            const bookmarkedJobs = new Set(result.data.map((job) => job.eventID));
            setBookmarked(bookmarkedJobs);
          }
        })
        .catch((error) => {
          console.error('Error processing bookmarks:', error);
        });
    }
  }, [token]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobPostings = await getJobsData();
        setJobs(jobPostings);
      } catch (error) {
        console.error('Error fetching job data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('userToken'); // Clear the session token
      router.push('/'); // Redirect to the login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

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

  const addBookmark = async (id: string, token: string) => {
    try {
      const response = await axios.post(
        `https://akil-backend.onrender.com/bookmarks/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error bookmarking job:', error);
      return false;
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

  const toggleBookmark = async (jobId: string) => {
    if (!token) {
      console.error('No token available');
      return;
    }

    if (bookmarked.has(jobId)) {
      const success = await removeBookmark(jobId, token);
      if (success) {
        setBookmarked((prevBookmarked) => {
          const newBookmarked = new Set(prevBookmarked);
          newBookmarked.delete(jobId);
          return newBookmarked;
        });
      }
    } else {
      const success = await addBookmark(jobId, token);
      if (success) {
        setBookmarked((prevBookmarked) => new Set(prevBookmarked).add(jobId));
      }
    }
  }

  return (
    <div className="container mx-auto p-4 w-full h-full">
      <nav className="flex items-center justify-between w-full bg-gray-300 p-4">
        <div className="flex space-x-8">
          <p className="text-black text-xl font-bold font-poppins hover:text-gray-300 transition duration-300 cursor-pointer">
            <Link href="/">Job Listing</Link>
          </p>
        </div>
        <div className="flex space-x-4">
          <Link href="http://localhost:3000/Bookmarks">
            <button className="text-white font-poppins px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300">
              Bookmarks
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="text-white font-poppins px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
      <h1 className="text-4xl font-bold mb-4">Opportunities</h1>
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length > 0 ? (
        jobs.map((job: JobType) => (
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
                    <p className="text-gray-500">{job.location.join(', ')}</p>
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
                  {job.categories.map((category) => (
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
                onClick={() => toggleBookmark(job.id)}
              >
                {bookmarked.has(job.id) ? (
                  <IoBookmarks className="text-blue-500" />
                ) : (
                  <IoBookmarksOutline className="text-gray-500" />
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No job opportunities found.</p>
      )}
    </div>
  );
};

export default HomePage;
