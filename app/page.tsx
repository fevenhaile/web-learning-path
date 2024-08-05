"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getJobsData, JobType } from '../lib/jobs';

const HomePage =  () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch from the public directory
    fetch('/jobs.json')
      .then(response => response.json())
      .then(data => {
        setJobs(data.job_postings);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Opportunities</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        jobs.map((job: JobType) => (
          <div key={job.id} className="w-full max-w-[815px] h-[266px] p-6 rounded-lg shadow-md flex bg-white mx-auto mb-4">
            <Link href={`/Description/${job.id}`}>
              <div className="w-full h-full flex items-center cursor-pointer">
                <div className="flex-shrink-0 mr-4">
                  <img src='/photos/image 2.png' alt="Logo" className="h-12 w-12 rounded-full" />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-customBlue">
                      {job.title}
                    </h2>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-500">{job.about.location}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-700">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex items-center justify-center h-[31px] px-[10px] rounded-full bg-[#b4edde]">
                      <p className="text-xs font-semibold text-[#56CDAD]">
                        In Person
                      </p>
                    </div>
                    <div className="flex items-center justify-center h-[31px] px-[10px] rounded-full border border-[#FFB836]">
                      <p className="text-xs font-semibold text-[#FFB836]">
                        Education
                      </p>
                    </div>
                    <div className="flex items-center justify-center h-[31px] px-[10px] rounded-full border border-[#4640DE] min-w-[50px]">
                      <p className="text-xs font-semibold text-[#4640DE]">
                        IT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
