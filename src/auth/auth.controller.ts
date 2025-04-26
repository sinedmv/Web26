import {Controller, Get, Render} from '@nestjs/common';
import {ApiExcludeController} from "@nestjs/swagger";

@Controller('auth')
@ApiExcludeController(true)
export class AuthController {
    @Get('sign-in')
    @Render('auth/sign-in')
    showSignInForm() {
        return {};
    }

    @Get('sign-up')
    @Render('auth/sign-up')
    showSignUpForm() {
        return {};
    }
}
