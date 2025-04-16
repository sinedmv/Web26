export class UpdateOlympiadDto {
    name?: string;
    organization?: string;
    subject?: string;
    registrationStartDate?: Date;
    registrationEndDate?: Date;
    olympiadDate?: Date;
    additionalInfo?: string;
    participantIds?: number[];
}