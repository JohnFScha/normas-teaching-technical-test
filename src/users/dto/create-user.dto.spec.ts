import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should create a valid DTO with required fields', () => {
    const dto: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'SuperSecret123',
      isActive: true,
      favorites: []
    };

    expect(dto.firstName).toBe('John');
    expect(dto.lastName).toBe('Doe');
    expect(dto.email).toBe('john.doe@example.com');
    expect(dto.password).toBe('SuperSecret123');
    expect(dto.isActive).toBe(true);
    expect(dto.favorites).toEqual([]);
  });

  it('should allow the optional id field', () => {
    const dto: CreateUserDto = {
      id: 'user123',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'Password123',
      isActive: false,
      favorites: ['item1', 'item2']
    };

    expect(dto.id).toBe('user123');
  });

  it('should have id undefined when not provided', () => {
    const dto: CreateUserDto = {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      password: 'AlicePass!',
      isActive: true,
      favorites: []
    };

    expect(dto.id).toBeUndefined();
  });
});