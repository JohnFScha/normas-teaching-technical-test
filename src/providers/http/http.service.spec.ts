/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of, firstValueFrom } from 'rxjs';
import { HttpPrivateService } from './http.service';

const mockResponse = {
  results: [
    {
      id: 'mock-id',
      height: 100,
      width: 100,
      urls: {
        full: 'mock-full-url',
        thumb: 'mock-thumb-url',
        regular: 'mock-url',
        small: 'mock-small-url',
      },
      description: 'mock description',
    },
  ],
} as const;

class MockHttpService {
  get = jest.fn(() =>
    of({
      data: {
        results: mockResponse.results,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }),
  );
}

describe('YourService', () => {
  let yourService: HttpPrivateService;
  let httpService: HttpService;

  beforeEach(async () => {
    process.env.ACCESS_KEY = 'mock-access-key';
    process.env.BASE_URL = 'https://api.example.com/search';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpPrivateService,
        {
          provide: MockHttpService,
          useClass: MockHttpService,
        },
      ],
      imports: [HttpModule],
    })
      .overrideProvider(HttpService)
      .useClass(MockHttpService)
      .compile();

    yourService = module.get<HttpPrivateService>(HttpPrivateService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return mock data', async () => {
    const query = 'test';
    const page = 1;

    const result = await firstValueFrom(yourService.find(query, page));

    expect(result).toEqual(mockResponse.results);

    expect(httpService.get).toHaveBeenCalledWith(
      `${process.env.BASE_URL}?query=${encodeURIComponent(query)}&page=${page}`,
      {
        headers: {
          Authorization: `Client-ID mock-access-key`,
          'Accept-Version': 'v1',
        },
      },
    );
  });
});
