"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getJobsData, JobType } from '../lib/jobs';

const HomePage = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Opportunities</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        jobs.length > 0 ? (
          jobs.map((job: JobType) => (
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
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No job opportunities found.</p>
        )
      )}
    </div>
  );
};

export default HomePage;
