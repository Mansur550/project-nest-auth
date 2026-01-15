import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import config from './auth/config/config'
import { JwtModule } from '@nestjs/jwt';


@Module({
  // Load environment variables and custom config
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [config],
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],          // ensure ConfigModule is imported
    inject: [ConfigService],          // inject ConfigService
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('jwt.secret'), // get JWT secret safely
      // signOptions: { expiresIn: '1h' },               
    }),

  }),

  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'moderator',
    autoLoadEntities: true,
    synchronize: true
  }),
    AuthModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
