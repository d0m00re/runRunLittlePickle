import { Module } from '@nestjs/common';
import { EsriGridController } from './esri-grid.controller';
import { EsriGridService } from './esri-grid.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({timeout : 30000, maxRedirects : 5})],
  controllers: [EsriGridController],
  providers: [EsriGridService]
})
export class EsriGridModule {}
