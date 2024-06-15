import { Test, TestingModule } from '@nestjs/testing';
import { EsriGridService } from './esri-grid.service';

describe('EsriGridService', () => {
  let service: EsriGridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsriGridService],
    }).compile();

    service = module.get<EsriGridService>(EsriGridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
