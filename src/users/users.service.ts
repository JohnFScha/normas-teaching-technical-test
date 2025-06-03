
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: User): Promise<User | null> {
    try {
      const hashedPassword = hashSync(user.password, 10);
      const newUser = this.usersRepository.create({ ...user, password: hashedPassword });
      return this.usersRepository.save(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }
}
