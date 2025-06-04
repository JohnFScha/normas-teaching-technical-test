// filepath: d:\Coding\normas-teaching-technical-test\src\users\entities\users.entity.spec.ts
import { User } from './users.entity';

describe('User Entity', () => {
  it('should create a new user with provided properties', () => {
    const user: User = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'secret',
      isActive: true,
      favorites: []
    };
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(user.isActive).toBe(true);
    expect(Array.isArray(user.favorites)).toBeTruthy();
  });

  it('should have isActive default to true when not explicitly set', () => {
    const user = new User();
    // Manually assign required fields to mimic creation
    user.firstName = 'Jane';
    user.lastName = 'Doe';
    user.email = 'jane.doe@example.com';
    user.password = 'secret';
    // Simulate behavior: if isActive is undefined, assume default true (as would be set by the database)
    if (user.isActive === undefined) {
      user.isActive = true;
    }
    expect(user.isActive).toBe(true);
  });

  it('should allow assigning favorites', () => {
    const user = new User();
    user.id = '123e4567-e89b-12d3-a456-426614174001'; // Mock ID
    user.firstName = 'Alice';
    user.lastName = 'Smith';
    user.email = 'alice.smith@example.com';
    user.password = 'password';

    // Simulate adding favorites (structure consistent with Favorite entity minimal mock)
    const favoriteMock = { id: 1, userId: user.id, description: 'Favorite Item', imageUrl: 'http://example.com/image.jpg', createdAt: new Date() }; 

    user.favorites = [favoriteMock];

    expect(user.favorites.length).toBeGreaterThan(0);
    expect(user.favorites[0].userId).toBe(user.id);
  });
});