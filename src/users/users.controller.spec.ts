/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const createUserDto: CreateUserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  email: 'test@email.com',
  password: '12345678',
  isActive: true, // Optional field
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: '638ce079-8c29-4601-875b-6fe957ae42c8', ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                email: 'test@email.com',
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
                email: 'test@email.com',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                email: 'test@email.com',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      usersController.create(createUserDto);
      expect(usersController.create(createUserDto)).resolves.toEqual({
        id: '638ce079-8c29-4601-875b-6fe957ae42c8',
        ...createUserDto,
      });
      expect(usersService.create).toHaveBeenCalledWith(
        createUserDto,
      );
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(
        usersController.findOne('638ce079-8c29-4601-875b-6fe957ae42c8'),
      ).resolves.toEqual({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        email: 'test@email.com',
        id: '638ce079-8c29-4601-875b-6fe957ae42c8',
      });
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove('638ce079-8c29-4601-875b-6fe957ae42c8');
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});
