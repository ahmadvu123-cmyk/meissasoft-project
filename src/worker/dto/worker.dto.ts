import { IsString, IsBoolean, IsEnum } from "class-validator";
import { Role } from "generated/prisma/enums";
import { ApiProperty } from '@nestjs/swagger';

export class WorkerDto {

    @ApiProperty({ example: 'Admin' })
    @IsString()
    name: string;

    @ApiProperty({ example: '35202-00000000-0' })
    @IsString()
    cnic: string;

    @ApiProperty({ example: '0300-0000000' })
    @IsString()
    phone_num: string;

    @ApiProperty({ example: 'true' })
    @IsBoolean()
    is_permanent: boolean;

    @ApiProperty({ example: 'ADMIN' })
    @IsEnum(Role)
    role: Role;

}
