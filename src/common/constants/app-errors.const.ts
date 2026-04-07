// src/common/constants/app-errors.const.ts
import { HttpStatus } from '@nestjs/common';

export const AppErrors = {
  // 1️⃣ Database & ORM Errors
  DATABASE: {
    UNIQUE_CONSTRAINT: {
      status: HttpStatus.CONFLICT, // 409
      message: 'Duplicate entry violates unique constraint',
    },
    CONNECTION_FAILED: {
      status: HttpStatus.SERVICE_UNAVAILABLE, // 503
      message: 'Database connection failed',
    },
  },

  // 2️⃣ Business Logic & Validation Errors
  BUSINESS: {
    RESOURCE_NOT_FOUND: {
      status: HttpStatus.NOT_FOUND, // 404
      message: 'Requested resource not found',
    },
    FORBIDDEN_ACTION: {
      status: HttpStatus.FORBIDDEN, // 403
      message: 'You are not allowed to perform this action',
    },
    INVALID_OPERATION: {
      status: HttpStatus.BAD_REQUEST, // 400
      message: 'Invalid operation according to business rules',
    },
  },

  // 3️⃣ External API / Integration Errors
  EXTERNAL_API: {
    API_FAILURE: {
      status: HttpStatus.BAD_GATEWAY, // 502
      message: 'Third-party API call failed',
    },
    SDK_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
      message: 'Error in third-party SDK',
    },
  },

  // 4️⃣ Microservice / Protocol Errors
  MICROSERVICE: {
    RPC_ERROR: {
      status: HttpStatus.BAD_GATEWAY, // 502
      message: 'Microservice RPC error',
    },
    TIMEOUT: {
      status: HttpStatus.GATEWAY_TIMEOUT, // 504
      message: 'Microservice request timed out',
    },
  },

  // 5️⃣ System & Environment Errors
  SYSTEM: {
    FILE_NOT_FOUND: {
      status: HttpStatus.BAD_REQUEST, // 400
      message: 'File not found',
    },
    PERMISSION_DENIED: {
      status: HttpStatus.FORBIDDEN, // 403
      message: 'Permission denied',
    },
    UNHANDLED_EXCEPTION: {
      status: HttpStatus.INTERNAL_SERVER_ERROR, // 500
      message: 'Unexpected system error occurred',
    },
  },
};