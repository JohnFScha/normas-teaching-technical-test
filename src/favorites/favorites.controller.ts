import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UsersService } from '../users/users.service';

@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    const user = await this.usersService.findOne(createFavoriteDto.userId);

    if (!user) {
      throw new Error('User not found');
    }
    
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }
}
