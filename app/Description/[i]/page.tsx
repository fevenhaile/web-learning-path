"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getJobsData, JobType } from '@/lib/jobs'; // Ensure this import is correct

interface DescriptionProps {
  jobId: string;
}

const Description: React.FC<DescriptionProps> = () => {
  const { i } = useParams<{ i: string }>(); // Correctly type the parameter
  const jobid: number = Number(i);
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

  const job = jobs.find(job => Number(job.id) === jobid);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" flex w-[1000px] h-[800px] pt-10 mx-auto justify-start">
      <div className="w-[815px] pr-10">
        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-extrabold mb-4">Description</h2>
          <p className="font-epilogue text-base leading-6">{job.description}</p>
        </div>

        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-extrabold mb-4">Responsibilities</h2>
          <ul className="font-epilogue text-base leading-6 list-disc list-inside">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>

        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-extrabold mb-4">Ideal Candidate We Want</h2>
          <ul className="font-epilogue text-base leading-6 list-disc list-inside">
            <li>{job.ideal_candidate.age}</li>
            <li>{job.ideal_candidate.gender}</li>
            {job.ideal_candidate.traits.map((trait, index) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </div>

        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-extrabold mb-4">When & Where</h2>
          <p className="font-epilogue text-base leading-6">{job.when_where}</p>
        </div>
      </div>

      <div className="w-[300.5px] flex-shrink-0">
        <div className="mb-10">
          <h2 className="font-poppins text-2xl font-extrabold mb-5">About</h2>
          <div className="mb-5 flex items-center">
            <img src="/photos/calendar.png" alt="Posted On Icon" className="w-6 h-6 mr-2" />
            <div>
              <span className="block font-epilogue text-base">Posted On</span>
              <span className="font-epilogue text-base">{job.about.posted_on}</span>
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <img src="/photos/calendar.png" alt="Deadline Icon" className="w-6 h-6 mr-2" />
            <div>
              <span className="block font-epilogue text-base">Deadline</span>
              <span className="font-epilogue text-base">{job.about.deadline}</span>
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <img src="/photos/calendar.png" alt="Location Icon" className="w-6 h-6 mr-2" />
            <div>
              <span className="block font-epilogue text-base">Location</span>
              <span className="font-epilogue text-base">{job.about.location}</span>
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <img src="/photos/calendar.png" alt="Start Date Icon" className="w-6 h-6 mr-2" />
            <div>
              <span className="block font-epilogue text-base">Start Date</span>
              <span className="font-epilogue text-base">{job.about.start_date}</span>
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <img src="/photos/calendar.png" alt="End Date Icon" className="w-6 h-6 mr-2" />
            <div>
              <span className="block font-epilogue text-base">End Date</span>
              <span className="font-epilogue text-base">{job.about.end_date}</span>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-poppins text-2xl font-extrabold mb-5">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {job.about.categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-[31px] px-[10px] rounded-xl bg-[#e0efa5]"
              >
                <p className="font-epilogue text-xs font-semibold text-[#56CDAD]">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-poppins text-2xl font-extrabold mb-5">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.about.required_skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-[31px] px-[10px] rounded-xl bg-[#eff3f2]"
              >
                <p className="font-epilogue text-xs font-semibold text-[#9a5ede]">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Description;
