export class CreateUserDto {
  id?: string; // Unique identifier for the user
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean; // Optional, defaults to true
}
