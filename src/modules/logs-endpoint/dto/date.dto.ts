import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsISO8601 } from "class-validator";

export class DateDto {

    @ApiProperty({
        title: 'Date',
        description: 'Date to search',
        example: '2023-11-18',
        type: 'date',
        format: 'date'
    })
    @IsISO8601()
    date: Date;
}