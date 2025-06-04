import { SearchResultDto } from './search.dto';

describe('SearchResultDto', () => {
  let dto: SearchResultDto;

  beforeEach(() => {
    dto = new SearchResultDto();
    dto.id = 'sample-id';
    dto.width = 640;
    dto.height = 480;
    dto.urls = [
      'https://example.com/image1.png',
      'https://example.com/image2.png',
    ];
    dto.description = 'Sample Description';
  });

  it('should be defined', () => {
    expect(dto).toBeDefined();
  });

  it('should have properties with correct types', () => {
    expect(typeof dto.id).toBe('string');
    expect(typeof dto.width).toBe('number');
    expect(typeof dto.height).toBe('number');
    expect(Array.isArray(dto.urls)).toBe(true);
    expect(typeof dto.description).toBe('string');
  });

  it('should assign values correctly', () => {
    expect(dto.id).toBe('sample-id');
    expect(dto.width).toBe(640);
    expect(dto.height).toBe(480);
    expect(dto.urls).toEqual([
      'https://example.com/image1.png',
      'https://example.com/image2.png',
    ]);
    expect(dto.description).toBe('Sample Description');
  });
});
