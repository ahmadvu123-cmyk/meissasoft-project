// import { Prisma } from "@prisma/client";

import { HttpException, HttpStatus } from "@nestjs/common";

export function PrismaErrorHandling(error: any) {

  const code = error?.code;

  if (!code) {
    return new Error(error?.message || "Unknown error occurred");
  }

  switch (code) {
    case 'P1000':
      throw new HttpException('Authentication failed against database', HttpStatus.UNAUTHORIZED);

    case 'P1001':
      throw new HttpException('Database is unreachable', HttpStatus.SERVICE_UNAVAILABLE);

    case 'P1002':
      throw new HttpException('Database operation timed out', HttpStatus.GATEWAY_TIMEOUT);

    case 'P1003':
      throw new HttpException('Database does not exist', HttpStatus.INTERNAL_SERVER_ERROR);

    case 'P1008':
      throw new HttpException('Operation timed out', HttpStatus.GATEWAY_TIMEOUT);

    case 'P1009':
      throw new HttpException('Database already exists', HttpStatus.CONFLICT);

    case 'P1010':
      throw new HttpException('Access denied to database user', HttpStatus.FORBIDDEN);

    case 'P1011':
      throw new HttpException('TLS connection error', HttpStatus.INTERNAL_SERVER_ERROR);

    case 'P1012':
      throw new HttpException('Schema validation error', HttpStatus.INTERNAL_SERVER_ERROR);

    case 'P1013':
      throw new HttpException('Invalid database connection string', HttpStatus.INTERNAL_SERVER_ERROR);

    case 'P1014':
      throw new HttpException('Underlying model error', HttpStatus.INTERNAL_SERVER_ERROR);

    case 'P1015':
      throw new HttpException('Unsupported database version', HttpStatus.INTERNAL_SERVER_ERROR);

    case 'P1016':
      throw new HttpException('Incorrect parameters provided', HttpStatus.BAD_REQUEST);

    case 'P1017':
      throw new HttpException('Database server closed the connection', HttpStatus.SERVICE_UNAVAILABLE);

    case 'P2002':
      const field = error?.meta?.target?.[0];
      throw new HttpException(`${field || 'Field'} already exists`, HttpStatus.CONFLICT);

    default:
      return new Error('Database error occurred');
  }
}