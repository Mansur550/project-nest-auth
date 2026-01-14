import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import config from './auth/config/config'


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [config],

  }),
    AuthModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'moderator',
      autoLoadEntities: true,
      synchronize: true
    })

  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
