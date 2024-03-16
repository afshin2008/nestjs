import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import Codes from 'src/entities/codes.entity';

@Module({
  imports:[JwtModule.register({
secret:'secret',
signOptions:{expiresIn:'1d'}
  }),
    TypeOrmModule.forFeature([Users,Codes])
  ],
  controllers: [OtpController],
  providers: [OtpService,UsersService,JwtStrategy],
})
export class OtpModule {}
