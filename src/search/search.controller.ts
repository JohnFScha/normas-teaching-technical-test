import { Controller, Get, Query } from '@nestjs/common';
import { HttpPrivateService } from 'src/providers/http/http.service';

@Controller('search')
export class SearchController {
  constructor(private readonly httpService: HttpPrivateService) {}
  // Example:
  @Get()
  search(@Query('query') query: string, @Query('page') page: number) {
    return this.httpService.find(query, page);
  }
}
