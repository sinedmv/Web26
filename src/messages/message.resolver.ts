import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Resolver(() => Message)
export class MessageResolver {
    constructor(private readonly messageService: MessagesService) {}

    @Query(() => [Message], { name: 'messages' })
    async findAll(): Promise<Message[]> {
        return this.messageService.findAll();
    }

    @Query(() => Message, { name: 'message' })
    async findOne(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<Message> {
        return this.messageService.findOne(id);
    }

    @Mutation(() => Message)
    async createMessage(
        @Args('createMessageDto') createMessageDto: CreateMessageDto,
    ): Promise<Message> {
        return this.messageService.create(createMessageDto);
    }

    @Mutation(() => Message)
    async updateMessage(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateMessageDto') updateMessageDto: UpdateMessageDto,
    ): Promise<Message> {
        return this.messageService.update(id, updateMessageDto);
    }

    @Mutation(() => Boolean)
    async removeMessage(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<boolean> {
        await this.messageService.remove(id);
        return true;
    }
}
