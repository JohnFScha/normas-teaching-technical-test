import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of users', async () => {
    const result = await controller.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it('should return a user by id', async () => {
    const userId = '3acab044-09c6-4c3e-b04c-3bd58406979e';
    const result = await controller.findOne(userId);
    expect(result).toHaveProperty('id', userId);
  });

  it('should create a new user', async () => {
    const newUser = { id: "638ce079-8c29-4601-875b-6fe957ae42c8", firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password', isActive: true };
    const result = await controller.create(newUser);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('firstName', newUser.firstName);
    expect(result).toHaveProperty('lastName', newUser.lastName);
    expect(result).toHaveProperty('email', newUser.email);
    expect(result).toHaveProperty('isActive', newUser.isActive);
  });
});
