import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User], { name: 'users' })
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Query(() => User, { name: 'user' })
    async findOne(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserDto: CreateUserDto,
    ): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Mutation(() => User)
    async updateUser(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateUserInput') updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Mutation(() => Boolean)
    async removeUser(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<boolean> {
        await this.usersService.remove(id);
        return true;
    }
}
