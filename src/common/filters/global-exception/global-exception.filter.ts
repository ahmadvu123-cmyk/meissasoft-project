import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import { timeStamp } from 'console';
import { Request, Response } from 'express';
import { stat } from 'fs';
@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let error = 'InternalServerError';

    if(exception instanceof HttpException){
      status = exception.getStatus();
      const res = exception.getResponse();
      if(typeof res === 'string'){
        message = res;
      } else {
        const responseObj: any = res;
        message = responseObj.message || 'Error';
        error = responseObj.error || exception.name;
      }
    } else if (exception instanceof Error){
      message = exception.message;
      error = exception.name;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      error,
      message,
      path: request.url,
      timeStamp: new Date().toISOString()
    })

  }
}
