/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Test for non-existing root route.
  it('GET / - should return 404', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  // Users Module tests
  describe('UsersModule', () => {
    it('GET /users - should return a list of users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /users - should create a new user', async () => {
      const createUserDto = {
        id: '550e8400-e29b-41d4-a716-446655440000', // Test UUIDV4
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        isActive: true,
        favorites: []
      };
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.firstName).toBe(createUserDto.firstName);
      expect(response.body.lastName).toBe(createUserDto.lastName);
      expect(response.body.email).toBe(createUserDto.email);
      expect(response.body.isActive).toBe(createUserDto.isActive);
      expect(response.body.favorites).toEqual(createUserDto.favorites);
    });
  });

  // Favorites Module tests
  describe('FavoritesModule', () => {
    it('GET /favorites - should return a list of favorites', async () => {
      const response = await request(app.getHttpServer())
        .get('/favorites')
        .expect(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /favorites - should create a new favorite', async () => {
      const createFavoriteDto = {
        id: 2,
        userId: '550e8400-e29b-41d4-a716-446655440000', // Test UUIDV4
        description: 'Test Favorite',
        imageUrl: 'http://example.com/image.jpg',
        createdAt: new Date().toISOString()
      };
      const response = await request(app.getHttpServer())
        .post('/favorites')
        .send(createFavoriteDto)
        .expect(201);
        
      expect(response.body).toHaveProperty('id');
      expect(response.body.description).toBe(createFavoriteDto.description);
      expect(response.body.imageUrl).toBe(createFavoriteDto.imageUrl);
      expect(response.body.userId).toBe(createFavoriteDto.userId);
      expect(response.body.createdAt).toBe(createFavoriteDto.createdAt);
    });
  });

  // Search Module tests
  describe('SearchModule', () => {
    it('GET /search - should return a valid search result', async () => {
      const query = 'test';
      const page = 1;
      const response = await request(app.getHttpServer())
        .get('/search')
        .query({ query, page })
        .expect(200);
      
      // Expecting an array of search results with at least one image having required properties.
      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        const image = response.body[0];
        expect(image).toHaveProperty('id');
        expect(image).toHaveProperty('width');
        expect(image).toHaveProperty('height');
        expect(image).toHaveProperty('urls');
        expect(image).toHaveProperty('description');
      }
    });
  });
});