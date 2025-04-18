import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Olympiad} from "../olympiads/entities/olympiad.entity";
import {User} from "./entities/user.entity";
import {UsersResolver} from "./user.resolver";
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    CacheModule.register({
      ttl: 5,
      max: 100,
    })],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
