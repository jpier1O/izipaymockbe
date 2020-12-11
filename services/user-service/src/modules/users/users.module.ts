import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserConfig } from './users.config';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UserConfig, UsersService]
})
export class UsersModule {}
