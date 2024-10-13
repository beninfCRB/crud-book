import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseType, isProduction } from "./config-node.utils";
import { ConfigModule, ConfigService } from "@nestjs/config";

export  const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
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
  })