import { Category } from './category';
import { Company } from './company';

export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  gender: string;
  description: string;
  responsibilities: string;
  qualifications: string;
  categoryId: number;
  companyId: number;
  category: Category;
  company: Company;
  benefits?: string;
  createdAt?: Date;
  tags?: string[];
  isAppliedTo?: boolean;
  numOfApplicants?: number;
}
