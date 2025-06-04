import { CreateFavoriteDto } from './create-favorite.dto';

describe('CreateFavoriteDto', () => {
  let dto: CreateFavoriteDto;

  beforeEach(() => {
    dto = new CreateFavoriteDto();
    dto.description = 'Favorite description';
    dto.imageUrl = 'https://example.com/image.png';
    dto.userId = 'user123';
    dto.createdAt = new Date('2023-01-01T00:00:00Z');
  });

  it('should be defined', () => {
    expect(dto).toBeDefined();
  });

  it('should have properties with the correct types', () => {
    expect(typeof dto.description).toBe('string');
    expect(typeof dto.imageUrl).toBe('string');
    expect(typeof dto.userId).toBe('string');
    expect(dto.createdAt instanceof Date).toBe(true);
  });

  it('should assign values correctly', () => {
    expect(dto.description).toBe('Favorite description');
    expect(dto.imageUrl).toBe('https://example.com/image.png');
    expect(dto.userId).toBe('user123');
    expect(dto.createdAt.toISOString()).toBe(
      new Date('2023-01-01T00:00:00Z').toISOString(),
    );
  });
});
