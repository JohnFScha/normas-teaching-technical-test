import { Type } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto as Type<CreateFavoriteDto>) {}
