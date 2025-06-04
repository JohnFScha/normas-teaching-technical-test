import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Response, ParsedResult } from 'src/interfaces/search-results';

@Injectable()
export class HttpPrivateService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Searches for items based on a query and paginated results.
   *
   * This method sends an HTTP GET request to the API endpoint with the provided query and page number.
   * It processes the API response by checking for a 400 status code (to handle bad requests) and maps the
   * results to an array of ParsedResult objects containing image metadata including dimensions, URLs, and descriptions.
   *
   * @param query - The search term to be encoded and sent as a query parameter.
   * @param page - The page number for paginated results.
   * @returns An observable stream of ParsedResult arrays.
   *
   * @throws Error If the response status is 400 or if any other error occurs during the HTTP request.
   */
  public find(query: string, page: number): Observable<ParsedResult[]> {
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
