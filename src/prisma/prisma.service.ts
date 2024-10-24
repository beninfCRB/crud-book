import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_ERRORS } from './prisma.errors';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  getErrorMessage(code: string) {
    return PRISMA_ERRORS[code] || code
  }
}
