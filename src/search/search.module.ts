import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { ProvidersModule } from '../providers/providers.module';
import { HttpPrivateService } from '../providers/http/http.service';

@Module({
  imports: [ProvidersModule],
  providers: [HttpPrivateService],
  controllers: [SearchController]
})
export class SearchModule {}
