import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Req,
  Res,
  Sse,
  BadRequestException, UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import {map, Observable} from "rxjs";
import {ApiExcludeController} from "@nestjs/swagger";

@ApiExcludeController()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.usersService.getUserEvents().pipe(
        map((event) => ({ data: JSON.stringify(event) } as MessageEvent)),
    );
  }

  @Get()
  @Render('users/index')
  async findAll(@Req() request: Request) {
    return {
      users: await this.usersService.findAll(),
      isAuthorized: request.query.auth === 'true'
    };
  }

  @Get('add')
  @Render('users/add')
  getAddForm(@Req() request: Request) {
    return { isAuthorized: request.query.auth === 'true' };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.usersService.create(createUserDto);
    return res.redirect('/users');
  }

  @Get(':id')
  @Render('users/show')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return {
      user: await this.usersService.findOne(userId),
      isAuthorized: request.query.auth === 'true'
    };
  }

  @Get(':id/edit')
  @Render('users/edit')
  async getEditForm(@Param('id') id: string, @Req() request: Request) {
    return {
      user: await this.usersService.findOne(+id),
      isAuthorized: request.query.auth === 'true'
    };
  }

  @Patch(':id')
  async update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
      @Res() res: Response
  ) {
    await this.usersService.update(+id, updateUserDto);
    return res.redirect(`/users/${id}`);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.remove(+id);
    return res.redirect('/users');
  }
}