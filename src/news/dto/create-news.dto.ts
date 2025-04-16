export class CreateNewsDto {
    readonly title: string;
    readonly content: string;
    readonly olympiadIds?: number[];
}