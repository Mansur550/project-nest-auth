import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from './config/config'

const { jwt } = config();

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'dev-secret',
  }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'REFRESH_SECRET',
      useValue: jwt.refreshSecret, // read from config.ts
    },

  ],
})
export class AuthModule { }
