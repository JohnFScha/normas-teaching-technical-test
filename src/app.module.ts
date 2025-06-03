import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '12345678a',
    database: 'image_db',
    autoLoadEntities: true,
    entities: [User], // Explicitly include User entity
    synchronize: process.env.NODE_ENV !== 'production', // Only synchronize in development
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
