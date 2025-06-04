import { Controller, Get, Query } from '@nestjs/common';
import { HttpPrivateService } from '../providers/http/http.service';

@Controller('search')
export class SearchController {
  constructor(private readonly httpService: HttpPrivateService) {}
  /**
   * Search for images based on a query and page number.
   * @param query The search query string.
   * @param page The page number for pagination.
   * @returns An array of parsed search results.
   */
  @Get()
  search(@Query('query') query: string, @Query('page') page: number) {
    return this.httpService.find(query, page);
  }
}
