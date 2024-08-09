// lib/jobs.ts
import fs from 'fs';
import path from 'path';

export async function getJobsData(){
  const data = JSON.parse('C:\Users\biniy\OneDrive\Documents\A2SV\web dev\web-learning-path\task-6\json\jobs.json');
  return data.job_postings;
}

export interface JobType {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: {
    age: string;
    gender: string;
    traits: string[];
  };
  when_where: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
  company: string;
  image: string;
}
