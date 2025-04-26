import {Body, Controller, Get, Post, Render, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import Session from "supertokens-node/recipe/session";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('signin')
    @Render('auth/signin')
    getSignIn() {
        return {};
    }

    @Get('signup')
    @Render('auth/signup')
    getSignUp() {
        return {};
    }

    @Post('register')
    async signUp(
        @Body() body: SignUpDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.authService.signUp(body.email, body.password, res);
        return result;
    }

    @Post('login')
    async signIn(
        @Body() body: SignInDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const result = await this.authService.signIn(body.email, body.password, res);
        return result;
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        try {
            const session = await Session.getSession(req, res);
            await Session.revokeSession(session.getHandle());

            res.clearCookie('sAccessToken');
            res.clearCookie('sRefreshToken');
            res.clearCookie('sIdRefreshToken');

            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (err) {
            return res.status(401).json({ error: 'Not authenticated or already logged out' });
        }
    }
}