import { Test, TestingModule } from '@nestjs/testing';
import { EsriGridController } from './esri-grid.controller';

describe('EsriGridController', () => {
  let controller: EsriGridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsriGridController],
    }).compile();

    controller = module.get<EsriGridController>(EsriGridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
