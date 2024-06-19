import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EsriGridModule } from './esri-grid/esri-grid.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal : true}), EsriGridModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
