import { Module } from '@nestjs/common';
import { EsriGridController } from './esri-grid.controller';
import { EsriGridService } from './esri-grid.service';

@Module({
  controllers: [EsriGridController],
  providers: [EsriGridService]
})
export class EsriGridModule {}
