import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
      @InjectRepository(Favorite)
      private favoritesRepository: Repository<Favorite>,
    ) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    const favorite = this.favoritesRepository.create(createFavoriteDto);
    return this.favoritesRepository.save(favorite);
  }

  findAll() {
    return this.favoritesRepository.find();
  }
}
