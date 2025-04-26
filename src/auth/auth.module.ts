import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import SuperTokens from "supertokens-node";
import {SuperTokensConfig} from "./supertokens.config";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "../messages/entities/message.entity";
import {Olympiad} from "../olympiads/entities/olympiad.entity";
import {News} from "../news/entities/news.entity";
import {User} from "../users/entities/user.entity";
import {IsAuthMiddleware} from "./is-auth.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, IsAuthMiddleware]
})
export class AuthModule {
  constructor() {
  }
}
