import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { HttpPrivateService } from '../providers/http/http.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('SearchController', () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [HttpPrivateService],
      imports: [HttpModule, ConfigModule.forRoot()],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a valid search result', () => {
    const query = 'test';
    const page = 1;
    const result = controller.search(query, page);

    expect(result).toBeDefined();
    
    result.forEach((item) => {
      item.forEach((image) => {
        expect(image).toHaveProperty('id');
        expect(image).toHaveProperty('height');
        expect(image).toHaveProperty('width');
        expect(image).toHaveProperty('urls');
        expect(image).toHaveProperty('description');
      });
    });
  });
});
