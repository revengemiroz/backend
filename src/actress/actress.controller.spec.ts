import { Test, TestingModule } from '@nestjs/testing';
import { ActressController } from './actress.controller';

describe('ActressController', () => {
  let controller: ActressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActressController],
    }).compile();

    controller = module.get<ActressController>(ActressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
