import { Favorite } from './favorite.entity';

describe('Favorite Entity', () => {
  let favorite: Favorite;

  beforeEach(() => {
    favorite = new Favorite();
    favorite.id = 1;
    favorite.description = 'Test favorite description';
    favorite.imageUrl = 'https://example.com/favorite.png';
    favorite.createdAt = new Date('2023-01-01T12:00:00Z');
    favorite.userId = 'user123';
  });

  it('should be defined', () => {
    expect(favorite).toBeDefined();
  });

  it('should have properties with correct types and values', () => {
    expect(typeof favorite.id).toBe('number');
    expect(favorite.id).toBe(1);
    expect(typeof favorite.description).toBe('string');
    expect(favorite.description).toBe('Test favorite description');
    expect(typeof favorite.imageUrl).toBe('string');
    expect(favorite.imageUrl).toBe('https://example.com/favorite.png');
    expect(favorite.createdAt instanceof Date).toBe(true);
    expect(favorite.createdAt.toISOString()).toBe(
      new Date('2023-01-01T12:00:00Z').toISOString(),
    );
    expect(typeof favorite.userId).toBe('string');
    expect(favorite.userId).toBe('user123');
  });

  it('should allow updating properties correctly', () => {
    favorite.description = 'Updated description';
    favorite.imageUrl = 'https://example.com/updated.png';
    favorite.userId = 'user456';
    const newDate = new Date('2023-02-02T15:30:00Z');
    favorite.createdAt = newDate;

    expect(favorite.description).toBe('Updated description');
    expect(favorite.imageUrl).toBe('https://example.com/updated.png');
    expect(favorite.userId).toBe('user456');
    expect(favorite.createdAt).toBe(newDate);
  });
});
