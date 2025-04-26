import { Injectable } from '@nestjs/common';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import { getSession } from 'supertokens-node/recipe/session';
import {UsersService} from "../users/users.service";
import { Response } from 'express';
import {AuthenticationError} from "@nestjs/apollo";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
    async signUp(email: string, password: string, res: Response) {
        const signUpResponse = await EmailPassword.signUp("public", email, password);

        if (signUpResponse.status === "OK") {
            await this.usersService.create({
                superTokensId: signUpResponse.user.id,
                email: email,
                password: password,
                username: email
            })
            return { user: signUpResponse.user };
        }
        throw new AuthenticationError(signUpResponse.status);
    }

    async signIn(email: string, password: string, res: Response) {
        const response = await EmailPassword.signIn("public", email, password);

        if (response.status === "OK") {
            return { user: response.user };
        }
        throw new AuthenticationError(response.status);
    }

    async signOut(session: any) {
        await Session.revokeSession(session.getHandle());
    }

    async getSession(req: Request, res: Response) {
        return await getSession(req, res, { sessionRequired: false });
    }
}