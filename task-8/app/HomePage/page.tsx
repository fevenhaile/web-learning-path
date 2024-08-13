"use client";
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getJobsData, JobType } from '../lib/jobs';
import { useRouter } from 'next/navigation';
import { IoBook } 

const HomePage = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const router = useRouter();
  const token = localStorage.getItem('userToken');

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

  const handleLogout = async () => {
    try {
      await signOut(); // Call signOut from next-auth
      localStorage.removeItem('userToken'); // Clear the session token
      router.push('/Login'); // Redirect to the login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleBookmarkToggle = async (jobId: string, isBookmarked: boolean) => {
    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    try {
      // Toggle bookmark status
      const newBookmarkedState = !isBookmarked;

      await axios.post(
        'https://akil-backend.onrender.com/bookmark',
        { jobId, bookmarked: newBookmarkedState },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      // Update local state
      setBookmarkedJobs((prev) => {
        const updatedSet = new Set(prev);
        if (newBookmarkedState) {
          updatedSet.add(jobId);
        } else {
          updatedSet.delete(jobId);
        }
        return updatedSet;
      });
    } catch (error) {
      console.error('Error updating bookmark status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 w-full h-full">
      <nav className='flex items-center justify-between w-full bg-gray-300 p-4'>
        <div className='flex space-x-8'>
          <p className='text-black text-xl font-bold font-poppins hover:text-gray-300 transition duration-300 cursor-pointer'>
            <Link href="/">Job Listing</Link>
          </p>
        </div>

        <button onClick={handleLogout} className='text-white font-poppins px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition duration-300'>
          Logout
        </button>
      </nav>
      <h1 className="text-4xl font-bold mb-4">Opportunities</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        jobs.length > 0 ? (
          jobs.map((job: JobType) => {
            const isBookmarked = bookmarkedJobs.has(job.id);

            return (
              <div key={job.id} className="w-full max-w-[815px] h-[266px] p-6 rounded-lg shadow-md flex bg-white mx-auto mb-4">
                <Link href={`/Description/${job.id}`}>
                  <div className="w-full h-full flex items-center cursor-pointer">
                    <div className="flex-shrink-0 mr-4">
                      <img src={job.logoUrl} alt="Logo" className="h-12 w-12 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <h2 className="text-xl font-semibold text-customBlue">
                          {job.title}
                        </h2>
                      </div>
                      <div className="mb-4">
                        <p className="text-gray-500">{job.location.join(', ')}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-gray-700">
                          {job.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex items-center justify-center h-[31px] px-[10px] rounded-full bg-[#b4edde]">
                          <p className="text-xs font-semibold text-[#56CDAD]">
                            {job.opType === 'inPerson' ? 'In Person' : 'Virtual'}
                          </p>
                        </div>
                        {job.categories.map(category => (
                          <div key={category} className="flex items-center justify-center h-[31px] px-[10px] rounded-full border border-[#FFB836]">
                            <p className="text-xs font-semibold text-[#FFB836]">
                              {category}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookmarkToggle(job.id, isBookmarked)}
                      className="ml-4"
                    >
                      {isBookmarked ? <IoBookmarks /> : <IoBookmarksOutline />}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No job opportunities found.</p>
        )
      )}
    </div>
  );
};

export default HomePage;
