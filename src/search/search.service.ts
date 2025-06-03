import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SearchResultDto } from './dto/search.dto';
import * as https from 'https';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async search(query: string): Promise<SearchResultDto> {
    try {
      const url = `${process.env.BASE_URL}?query=${encodeURIComponent(query)}`;

      if (!process.env.ACCESS_KEY || !process.env.BASE_URL) {
        throw new Error(
          'API keys or base URL not set in environment variables',
        );
      }

      if (!query) {
        throw new Error('Query parameter is required');
      }

      // Create an HTTPS agent that disables certificate validation
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      
      const response = await this.httpService.axiosRef.get(url, {
        headers: {
          Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
        },
        httpsAgent,
      });

      return (response.data) as SearchResultDto;
    } catch (error) {
      console.error('Error during search:', error);
      throw new Error('Search failed');
    }
  }
}