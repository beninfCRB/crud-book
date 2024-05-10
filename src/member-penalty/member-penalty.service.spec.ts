import { Test, TestingModule } from '@nestjs/testing';
import { MemberPenaltyService } from './member-penalty.service';

describe('MemberPenaltyService', () => {
  let service: MemberPenaltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberPenaltyService],
    }).compile();

    service = module.get<MemberPenaltyService>(MemberPenaltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
