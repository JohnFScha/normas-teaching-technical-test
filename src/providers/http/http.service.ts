import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Response, ParsedResult } from 'src/interfaces/search-results';

@Injectable()
export class HttpPrivateService {
  constructor(private readonly httpService: HttpService) {}

  public find(query: string, page: number): Observable<Partial<ParsedResult>[]> {
    return this.httpService
      .get<Response>(
        `${process.env.BASE_URL}?query=${encodeURIComponent(query)}&page=${page}`,
        {
          headers: {
            'Accept-Version': 'v1',
            Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
          },
        },
      )
      .pipe(
        map((response: AxiosResponse<Response>) => {
          if (response.status === 400) {
            throw new Error('Bad Request: Invalid parameters');
          }

          const data: Response = response.data;
          return data.results.map((item) => ({
            id: item.id,
            height: item.height,
            width: item.width,
            urls: {
              full: item.urls.full,
              regular: item.urls.regular,
              small: item.urls.small,
              thumb: item.urls.thumb,
            },
            description:
              item.description ||
              item.alt_description ||
              'No description available',
          }));
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        }),
      );
  }
}
