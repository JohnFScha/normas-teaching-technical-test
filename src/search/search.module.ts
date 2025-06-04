import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpPrivateService } from 'src/providers/http/http.service';

@Module({
  imports: [ProvidersModule],
  providers: [HttpPrivateService],
  controllers: [SearchController]
})
export class SearchModule {}
