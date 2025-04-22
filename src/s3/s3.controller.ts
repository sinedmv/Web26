import { Controller } from '@nestjs/common';
import { S3Service } from './s3.service';
import {ApiExcludeController} from "@nestjs/swagger";

@ApiExcludeController()
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
}
