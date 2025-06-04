import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    SearchModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
      port: process.env.NODE_ENV === 'production' ? 5432 : 5433,
      username: 'postgres',
      password: '12345678a',
      database: 'image_db',
      autoLoadEntities: true,
      entities: [User, Favorite],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ProvidersModule,
    FavoritesModule,
  ],
})
export class AppModule {}
