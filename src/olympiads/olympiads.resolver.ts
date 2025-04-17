import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Olympiad } from './entities/olympiad.entity';
import { OlympiadsService } from './olympiads.service';

@Resolver(() => Olympiad)
export class OlympiadsResolver {
    constructor(private readonly olympiadsService: OlympiadsService) {}

    @Query(() => [Olympiad], { name: 'olympiads' })
    async findAll(): Promise<Olympiad[]> {
        return this.olympiadsService.findAll();
    }

    @Query(() => Olympiad, { name: 'olympiad' })
    async findOne(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<Olympiad> {
        return this.olympiadsService.findOne(id);
    }
}
