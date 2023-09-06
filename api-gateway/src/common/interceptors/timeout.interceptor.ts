/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, timeout } from 'rxjs';

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('TimeOutInterceptor');
    console.log(context);
    return next.handle().pipe(timeout(120000));
  }
}
