import { Category } from './category';
import { Company } from './company';

export class Job {
  id!: number;
  title: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  gender: string;
  description: string;
  responsibilities: string;
  qualifications: string;
  benefits?: string;
  categoryId: number;
  category: Category;
  companyId: number;
  company: Company;
  tags?: string[];
  createdAt?: Date;

  constructor(
    id: number,
    title: string,
    location: string,
    type: string,
    experience: string,
    salary: string,
    gender: string,
    description: string,
    responsibilities: string,
    qualifications: string,
    categoryId: number,
    companyId: number,
    category: Category,
    company: Company,
    benefits?: string,
    tags?: string[],
    createdAt?: Date
  ) {
    // this.id = id;
    this.title = title;
    this.location = location;
    this.type = type;
    this.experience = experience;
    this.salary = salary;
    this.gender = gender;
    this.description = description;
    this.responsibilities = responsibilities;
    this.qualifications = qualifications;
    this.categoryId = categoryId;
    this.companyId = companyId;
    this.benefits = benefits;
    this.category = category;
    this.company = company;
    // this.tags = tags;
    // this.createdAt = createdAt;
  }
}
