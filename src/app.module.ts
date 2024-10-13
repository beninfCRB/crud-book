import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { MemberPenaltyModule } from './member-penalty/member-penalty.module';
import { MemberModule } from './member/member.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MemberModule,
    BookModule,
    MemberPenaltyModule,
    BorrowModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
