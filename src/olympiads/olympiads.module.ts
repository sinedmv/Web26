import { Module } from '@nestjs/common';
import { OlympiadsService } from './olympiads.service';
import { OlympiadsController } from './olympiads.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Olympiad} from "./entities/olympiad.entity";
import {User} from "../users/entities/user.entity";
import {OlympiadsApiController} from "./olympiads.api.controller";
import {OlympiadsResolver} from "./olympiads.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Olympiad, User])],
  controllers: [OlympiadsController, OlympiadsApiController],
  providers: [OlympiadsService, OlympiadsResolver],
  exports: [OlympiadsService],
})
export class OlympiadsModule {}
