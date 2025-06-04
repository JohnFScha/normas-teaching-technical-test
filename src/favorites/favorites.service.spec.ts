// filepath: d:\Coding\normas-teaching-technical-test\src\favorites\favorites.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

describe('FavoritesService', () => {
  let service: FavoritesService;
  const mockFavoritesRepository = {
    create: jest.fn((dto: CreateFavoriteDto) => dto),
    save: jest.fn((favorite) => Promise.resolve({ id: 1, ...favorite })),
    find: jest.fn(() => Promise.resolve([{ id: 1, name: 'Test Favorite' }])),
    findOne: jest.fn(() => Promise.resolve({ id: 1, name: 'Test Favorite' })),
    delete: jest.fn(() => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        { provide: getRepositoryToken(Favorite), useValue: mockFavoritesRepository },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new favorite', async () => {
    const createFavoriteDto: CreateFavoriteDto = { description: 'Test Favorite', imageUrl: 'http://example.com/image.jpg', userId: '1', createdAt: new Date() };
    const result = await service.create(createFavoriteDto);
    expect(mockFavoritesRepository.create).toHaveBeenCalledWith(createFavoriteDto);
    expect(mockFavoritesRepository.save).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
    expect(result).toMatchObject(createFavoriteDto);
  });

  it('should return an array of favorites', async () => {
    const result = await service.findAll();
    expect(mockFavoritesRepository.find).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should find a favorite by id', async () => {
    const favorite = await service.findOne(1);
    expect(mockFavoritesRepository.find).toHaveBeenCalled();
    expect(favorite).toHaveProperty('id', 1);
  });

  it('should remove a favorite by id', async () => {
    const result = await service.remove(1);
    expect(mockFavoritesRepository.find).toHaveBeenCalled();
    expect(result).toEqual({ affected: 1 });
  });
});
