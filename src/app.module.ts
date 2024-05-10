import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { MemberPenaltyModule } from './member-penalty/member-penalty.module';
import { MemberModule } from './member/member.module';
import { databaseType, isProduction } from './utils/config-node.utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: databaseType(),
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [],
        autoLoadEntities: true,
        synchronize: !isProduction(),
      })
    }),
    MemberModule,
    BookModule,
    MemberPenaltyModule,
    BorrowModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
