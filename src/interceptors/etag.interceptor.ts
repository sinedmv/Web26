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
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        return next.handle().pipe(
            map((body) => {
                const serializedBody = JSON.stringify(body ?? {});
                const etag = crypto
                    .createHash('md5')
                    .update(serializedBody)
                    .digest('hex');

                response.setHeader('ETag', etag);

                const ifNoneMatch = request.headers['if-none-match'];
                if (ifNoneMatch && ifNoneMatch === etag) {
                    response.status(304);
                    return undefined;
                }

                return body;
            }),
        );
    }
}
