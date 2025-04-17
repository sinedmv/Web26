import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Olympiad} from "../olympiads/entities/olympiad.entity";
import {User} from "./entities/user.entity";
import {UsersResolver} from "./user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
