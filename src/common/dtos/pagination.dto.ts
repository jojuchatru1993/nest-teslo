import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        default: 10,
        description: 'How many rows to return per page',
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'How many rows you want to skip',
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;
}