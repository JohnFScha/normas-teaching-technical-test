import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  let dto: CreateUserDto;

  beforeEach(() => {
    dto = new CreateUserDto();
    dto.id = undefined; // Optional field, can be undefined
    dto.firstName = 'John';
    dto.lastName = 'Doe';
    dto.email = 'john.doe@example.com';
    dto.password = 'SuperSecret123';
    dto.isActive = true;
    dto.favorites = [];
  });

  it('should create a valid DTO with required fields', () => {
    expect(dto).toBeDefined();
    
    expect(dto.firstName).toBe('John');
    expect(dto.lastName).toBe('Doe');
    expect(dto.email).toBe('john.doe@example.com');
    expect(dto.password).toBe('SuperSecret123');
    expect(dto.isActive).toBe(true);
    expect(dto.favorites).toEqual([]);
  });

  it('should allow the optional id field', () => {
    dto = {
      id: 'user123',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      password: 'Password123',
      isActive: false,
      favorites: ['item1', 'item2'],
    };

    expect(dto.id).toBe('user123');
  });

  it('should have id undefined when not provided', () => {
    dto = {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      password: 'AlicePass!',
      isActive: true,
      favorites: [],
    };

    expect(dto.id).toBeUndefined();
  });
});
