export class CreateMessageDto {
    content: string;
    authorId: number;
    olympiadId?: number | null;
    newsId?: number | null;
}