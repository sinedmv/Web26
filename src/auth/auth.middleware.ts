import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getSession } from 'supertokens-node/recipe/session';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const session = await getSession(req, res, { sessionRequired: false });

            if (!session) {
                return res.redirect('/');
            }

            next();
        } catch {
            res.redirect('/');
        }
    }
}
