import { Job } from './job';
import { User } from './user';

export interface JobApplication {
  id: number;
  user: User;
  job: Job;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  qualifications: string;
  reasonOfHire: string;
  linkedInLink: string;
  githubLink: string;
  availableStartDate: Date;
  status: string;
  appliedAt: Date;
}
