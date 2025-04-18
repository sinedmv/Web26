import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class ElapsedTimeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        return next.handle().pipe(
            map((data) => {
                const elapsed = Date.now() - now;
                if (typeof data === 'object' && data !== null) {
                    return { ...data, serverElapsedTime: elapsed };
                }
                return data;
            }),
            tap(() => {
                const elapsed = Date.now() - now;
                response.setHeader('X-Elapsed-Time', `${elapsed}ms`);
                console.log(
                    `[${request.method}] ${request.originalUrl} - ${elapsed}ms`,
                );
            }),
        );
    }
}