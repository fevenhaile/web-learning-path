export async function getJobsData() {
    try {
      const response = await fetch('https://akil-backend.onrender.com/opportunities/search');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.data; // Adjust to match the structure of your API response
    } catch (error) {
      console.error('Error fetching job data:', error);
      return [];
    }
  }
export async function getJobDetails(id:string) {
    try {
      const response = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data,2222)
      return data.data; // Adjust to match the structure of your API response
    } catch (error) {
      console.error('Error fetching job data:', error);
      return [];
    }
  }
  

  export interface JobType {
    id: string;
    title: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    categories: string[];
    opType: string;
    startDate: string;
    endDate: string;
    deadline: string;
    location: string[];
    requiredSkills: string[];
    whenAndWhere: string;
    orgID: string;
    datePosted: string;
    status: string;
    applicantsCount: number;
    viewsCount: number;
    orgName: string;
    logoUrl: string;
    isBookmarked: boolean;
    isRolling: boolean;
    questions: string | null;
    perksAndBenefits: string | null;
    createdAt: string;
    updatedAt: string;
    orgPrimaryPhone: string;
    orgEmail: string;
    average_rating: number;
    total_reviews: number;
  }
  