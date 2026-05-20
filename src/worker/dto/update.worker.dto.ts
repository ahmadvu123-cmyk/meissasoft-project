import { IsString, IsBoolean, IsEnum, IsOptional } from "class-validator";
import { Role } from "generated/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateWorkerDto {
        @ApiProperty({example: 'Admin'})
        @IsOptional()
        @IsString()
        name: string;

        @ApiProperty({example: '35202-00000000-0'})
        @IsOptional()
        @IsString()
        cnic: string;

        @ApiProperty({example: '0300-0000000'})
        @IsOptional()
        @IsString()
        phone_num : string;

        @ApiProperty({example: 'true'})
        @IsOptional()
        @IsBoolean()
        is_permanent: boolean;

        @ApiProperty({example: 'ADMIN'})
        @IsOptional()
        @IsEnum(Role)
        role: Role;
}
