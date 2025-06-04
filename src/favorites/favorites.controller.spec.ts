import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { UsersService } from '../users/users.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let favoritesService: Partial<FavoritesService>;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    favoritesService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    usersService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        { provide: FavoritesService, useValue: favoritesService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array from favoritesService.findAll', () => {
      const result = [{ id: 1, name: 'Favorite 1' }];
      (favoritesService.findAll as jest.Mock).mockReturnValue(result);
      expect(controller.findAll()).toBe(result);
      expect(favoritesService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    const createFavoriteDto: CreateFavoriteDto = { userId: '1', description: 'Favorite 1', imageUrl: 'http://example.com/image.jpg', createdAt: new Date() };

    it('should create a favorite when user exists', async () => {
      const user = { id: '1', name: 'User 1' };
      const createdFavorite = { id: '1', ...createFavoriteDto };

      (usersService.findOne as jest.Mock).mockResolvedValue(user);
      (favoritesService.create as jest.Mock).mockResolvedValue(createdFavorite);

      const result = await controller.create(createFavoriteDto);
      expect(usersService.findOne).toHaveBeenCalledWith(createFavoriteDto.userId);
      expect(favoritesService.create).toHaveBeenCalledWith(createFavoriteDto);
      expect(result).toBe(createdFavorite);
    });

    it('should throw an error when user does not exist', async () => {
      (usersService.findOne as jest.Mock).mockResolvedValue(null);
      await expect(controller.create(createFavoriteDto))
        .rejects
        .toThrow('User not found');
      expect(usersService.findOne).toHaveBeenCalledWith(createFavoriteDto.userId);
    });
  });
});
