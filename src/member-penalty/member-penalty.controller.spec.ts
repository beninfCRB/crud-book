import { Test, TestingModule } from '@nestjs/testing';
import { MemberPenaltyController } from './member-penalty.controller';
import { MemberPenaltyService } from './member-penalty.service';

describe('MemberPenaltyController', () => {
  let controller: MemberPenaltyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberPenaltyController],
      providers: [MemberPenaltyService],
    }).compile();

    controller = module.get<MemberPenaltyController>(MemberPenaltyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
