import { Global, Module } from '@nestjs/common';
import { HttpPrivateService } from './http/http.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpPrivateService],
  exports: [HttpModule, HttpPrivateService],
})
export class ProvidersModule {}
