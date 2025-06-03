import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useClass: Repository,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of users', async () => {
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it('should return a user by id', async () => {
    const userId = '3acab044-09c6-4c3e-b04c-3bd58406979e';
    const result = await service.findOne(userId);
    expect(result).toHaveProperty('id', userId);
  });
  
  it('should create a new user', async () => {
    const newUser = { id: "638ce079-8c29-4601-875b-6fe957ae42c8", firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password', isActive: true };
    const result = await service.create(newUser);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('firstName', newUser.firstName);
    expect(result).toHaveProperty('lastName', newUser.lastName);
    expect(result).toHaveProperty('email', newUser.email);
    expect(result).toHaveProperty('isActive', newUser.isActive);
  });
});
