import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getSession } from 'supertokens-node/recipe/session';
import {UsersService} from "../users/users.service";

@Injectable()
export class IsAuthMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const session = await getSession(req, res, { sessionRequired: false });

            if (session) {
                const userId = session.getUserId();
                res.locals.user = await this.usersService.findUserBySupertokenId(userId);
            }
        } catch (error) {
            console.error('Session error:', error);
        }
        next();
    }
}
