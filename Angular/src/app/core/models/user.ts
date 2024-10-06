export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  createdAt?: Date;
}
