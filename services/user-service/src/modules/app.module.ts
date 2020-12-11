import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

const env = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath:  `environments/${env}.env`,
    })
  ]
})
export class AppModule {}