import { HttpException, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";

export class AppExceptionHandler extends HttpException {
  constructor(error: any) {

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const code = error.code;

      switch (code) {

        case "P1000":
          super("Authentication failed against database", HttpStatus.UNAUTHORIZED);
          return;

        case "P1001":
          super("Database is unreachable", HttpStatus.SERVICE_UNAVAILABLE);
          return;

        case "P1002":
          super("Database operation timed out", HttpStatus.GATEWAY_TIMEOUT);
          return;

        case "P1003":
          super("Database does not exist", HttpStatus.INTERNAL_SERVER_ERROR);
          return;

        case "P1008":
          super("Operation timed out", HttpStatus.GATEWAY_TIMEOUT);
          return;

        case "P1009":
          super("Database already exists", HttpStatus.CONFLICT);
          return;

        case "P1010":
          super("Access denied to database user", HttpStatus.FORBIDDEN);
          return;

        case "P1011":
          super("TLS connection error", HttpStatus.INTERNAL_SERVER_ERROR);
          return;

        case "P1012":
          super("Schema validation error", HttpStatus.INTERNAL_SERVER_ERROR);
          return;

        case "P1013":
          super("Invalid database connection string", HttpStatus.INTERNAL_SERVER_ERROR);
          return;

        case "P1014":
          super("Underlying model error", HttpStatus.INTERNAL_SERVER_ERROR);
          return;

        case "P1015":
          super("Unsupported database version", HttpStatus.INTERNAL_SERVER_ERROR);
          return;

        case "P1016":
          super("Incorrect parameters provided", HttpStatus.BAD_REQUEST);
          return;

        case "P1017":
          super("Database server closed the connection", HttpStatus.SERVICE_UNAVAILABLE);
          return;

        case "P2002":
          const field = error?.meta?.target?.[0];
          super(`${field || "Field"} already exists`, HttpStatus.CONFLICT);
          return;

          case "P2014":
          const relation = error?.meta?.relation_name;
          super(
          `Invalid operation on relation ${relation || "relation"}. This record is already linked or required relation would be violated`,
          HttpStatus.CONFLICT);
          return;

        default:
          super("Database error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
          return;
      }
    }

    if (error instanceof HttpException) {
      super(error.message, error.getStatus());
      return;
    }

    super(
      error?.message || "Something went wrong",
      error?.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}