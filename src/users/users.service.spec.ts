import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUsersRepository = {
  create: jest
    .fn()
    .mockImplementation((user: Partial<User>): User => user as User),
  save: jest.fn().mockResolvedValue({
    id: 'a28abb6c-0f85-4c18-a09a-c56ce4fe9f07',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  }),
  find: jest.fn().mockResolvedValue([
    {
      id: 'a28abb6c-0f85-4c18-a09a-c56ce4fe9f07',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
  ]),
  findOneBy: jest.fn().mockResolvedValue({
    id: 'a28abb6c-0f85-4c18-a09a-c56ce4fe9f07',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  }),
  delete: jest.fn().mockResolvedValue({
    affected: 1,
  }),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([
      {
        id: 'a28abb6c-0f85-4c18-a09a-c56ce4fe9f07',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
    ]);
  });

  it('should return a user by id', async () => {
    const user = await service.findOne('a28abb6c-0f85-4c18-a09a-c56ce4fe9f07');
    expect(user).toEqual({
      id: 'a28abb6c-0f85-4c18-a09a-c56ce4fe9f07',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should create a new user', async () => {
    const newUser = {
      id: 'a28abb6c-0f85-4c18-a09a-c56ce4fe9f07',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      isActive: true,
      favorites: [],
    };
    const result = await service.create(newUser);
    expect(result).toHaveProperty('id', newUser.id);
    expect(result).toHaveProperty('firstName', newUser.firstName);
    expect(result).toHaveProperty('lastName', newUser.lastName);
    expect(result).toHaveProperty('email', newUser.email);
  });
});

