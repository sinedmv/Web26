import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as crypto from 'crypto';

@Injectable()
export class ETagInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        return next.handle().pipe(
            map((body) => {
                const etag = crypto
                    .createHash('md5')
                    .update(JSON.stringify(body))
                    .digest('hex');

                response.setHeader('ETag', etag);

                return body;
            }),
        );
    }
}
