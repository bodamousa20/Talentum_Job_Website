export class Company {
  id?: number | string = 0;
  name: string = '';
  email: string = '';
  website: string = '';
  location: string = '';
  password: string = '';
  industry: string = '';
  description: string = '';
  logo: Blob = new Blob();
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();
}
