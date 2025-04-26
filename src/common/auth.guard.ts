import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import Session, {getSession} from 'supertokens-node/recipe/session';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        try {
            const session = await Session.getSession(req, res, { sessionRequired: false });

            if (session) {
                const userId = session.getUserId();
                return true;
            }
        } catch (error) {
            return false;
        }
        return false;
    }
}