"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { JobType, getJobDetails } from '@/lib/jobs'; // Ensure this import is correct

const Description: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Correctly type the parameter
  const [job, setJob] = useState<JobType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const jobDetails = await getJobDetails(id);
          setJob(jobDetails);
        } catch (error) {
          console.error('Error fetching job details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!job) {
    return <p>Job not found</p>;
  }
console.log(job,1111)
  // Ensure responsibilities is defined and split correctly
  const responsibilitiesList = job.responsibilities ? job.responsibilities.split('\n') : [];

  return (
    <div className="flex w-full max-w-screen-lg pt-10 mx-auto justify-between">
      <div className="w-3/4 pr-10">
        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-extrabold mb-4">Description</h2>
          <p className="font-epilogue text-base leading-6">{job.description}</p>
        </div>

        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-extrabold mb-4">Responsibilities</h2>
          <ul className="font-epilogue text-base leading-6 list-disc list-inside">
            {responsibilitiesList.length > 0 ? (
              responsibilitiesList.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))
            ) : (
              <li>No responsibilities listed</li>
            )}
          </ul>
        </div>

        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-extrabold mb-4">Ideal Candidate We Want</h2>
        
          
        </div>

        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-extrabold mb-4">When & Where</h2>
          <p className="font-epilogue text-base leading-6">{job.whenAndWhere}</p>
        </div>
      </div>

      <div className="w-1/4 flex-shrink-0">
        <div className="mb-10">
          <h2 className="font-poppins text-2xl font-extrabold mb-5">About</h2>
          <div className="mb-5 flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/9926/9926396.png" alt="Logo" className="h-8 w-8" />
          <div>
              <span className="block font-epilogue text-base">Posted On</span>
              <span className="font-epilogue text-base">{new Date(job.datePosted).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mb-5 flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/9926/9926396.png" alt="Logo" className="h-8 w-8" />
          <div>
              <span className="block font-epilogue text-base">Deadline</span>
              <span className="font-epilogue text-base">{new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          </div>
         
          <div className="mb-5 flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/9926/9926396.png" alt="Logo" className="h-8 w-8" />
          <div>
              <span className="block font-epilogue text-base">Start Date</span>
              <span className="font-epilogue text-base">{new Date(job.startDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="mb-5 flex items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/9926/9926396.png" alt="Logo" className="h-8 w-8" />
          <div>
              <span className="block font-epilogue text-base">End Date</span>
              <span className="font-epilogue text-base">{new Date(job.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

       

      </div>
    </div>
  );
};

export default Description;

{/* <img src="https://cdn-icons-png.flaticon.com/512/9926/9926396.png" jsaction="" class="sFlh5c pT0Scc iPVvYb" style="max-width: 512px; height: 349px; margin: 0px; width: 349px;" alt="Calendar - Free interface icons" jsname="kn3ccd" aria-hidden="false"> */}