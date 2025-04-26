import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import Session, {getSession} from 'supertokens-node/recipe/session';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        try {
            await getSession(req, res);
            return true;
        } catch (err) {
            return false;
        }
    }
}