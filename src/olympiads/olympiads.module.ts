import { Module } from '@nestjs/common';
import { OlympiadsService } from './olympiads.service';
import { OlympiadsController } from './olympiads.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Olympiad} from "./entities/olympiad.entity";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Olympiad, User])],
  controllers: [OlympiadsController],
  providers: [OlympiadsService],
  exports: [OlympiadsService],
})
export class OlympiadsModule {}
