import { Test, TestingModule } from '@nestjs/testing';
import { HttpPrivateService } from './http.service';
import { HttpModule } from '@nestjs/axios';

describe('HttpPrivateService', () => {
  let service: HttpPrivateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpPrivateService],
      imports: [HttpModule],
    }).compile();

    service = module.get<HttpPrivateService>(HttpPrivateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
