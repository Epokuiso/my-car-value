import { Module, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature ([User])],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [
    UsersService, 
    AuthService
  ]
})
export class UsersModule 
{
  configure (consumer: MiddlewareConsumer)
  {
    consumer.apply (CurrentUserMiddleware).forRoutes ('*');
  }
};
