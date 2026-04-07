// src/common/helpers/error-response.helper.ts
import { Response } from 'express';
import { AppErrors } from '../constants/app-errors.const';


type ErrorMapping = {
  [key: string]: { status: number; message: string };
};

const errorMap: ErrorMapping = {
  // Database Errors
  '23505': AppErrors.DATABASE.UNIQUE_CONSTRAINT, // Postgres unique violation
  'P2002': AppErrors.DATABASE.UNIQUE_CONSTRAINT, // Prisma unique violation
  'ECONNREFUSED': AppErrors.DATABASE.CONNECTION_FAILED, // DB connection refused

  // Business Logic
  'NotFoundError': AppErrors.BUSINESS.RESOURCE_NOT_FOUND,
  'ForbiddenError': AppErrors.BUSINESS.FORBIDDEN_ACTION,
  'InvalidOperation': AppErrors.BUSINESS.INVALID_OPERATION,

  // External API
  'API_FAILURE': AppErrors.EXTERNAL_API.API_FAILURE,
  'SDK_ERROR': AppErrors.EXTERNAL_API.SDK_ERROR,

  // Microservice
  'RPC_ERROR': AppErrors.MICROSERVICE.RPC_ERROR,
  'TIMEOUT': AppErrors.MICROSERVICE.TIMEOUT,

  // System
  'FILE_NOT_FOUND': AppErrors.SYSTEM.FILE_NOT_FOUND,
  'PERMISSION_DENIED': AppErrors.SYSTEM.PERMISSION_DENIED,
};

// Main function
export function handleError(res: Response, error: any) {
  // Pick the mapped error using code or name
  const mappedError =
    errorMap[error.code] || errorMap[error.name] || AppErrors.SYSTEM.UNHANDLED_EXCEPTION;

  return res.status(mappedError.status).json({
    success: false,
    status: mappedError.status,
    message: mappedError.message,
    data: null,
  });
}