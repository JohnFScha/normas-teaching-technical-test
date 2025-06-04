import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** 
   * Get all users
   * @returns An array of users.
   * */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Get a user by ID
   * @param id The ID of the user to retrieve.
   * @returns The user object.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Create a new user
   * @param user The user object to create.
   * @returns The created user object.
   */
  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  /**
   * Delete a user by ID
   * @param id The ID of the user to delete.
   * @returns A confirmation message.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
