import * as process from 'node:process';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from "supertokens-node/recipe/emailpassword";


export const appInfo = {
    appName: 'abas',
    apiDomain: process.env.API_DOMAIN ?? 'http://localhost:12345',
    websiteDomain: process.env.API_DOMAIN ?? 'http://localhost:12345',
    apiBasePath: '/api/auth',
    websiteBasePath: '/auth',
};

export const connectionURI =
    process.env.SUPERTOKENS_CONNECTION_URI ?? 'NOT DEFINED';

export const apiKey = process.env.SUPERTOKENS_API_KEY ?? 'NOT DEFINED';

export const recipeList = [
    EmailPassword.init(),
    Session.init({
        cookieSecure: true,
        cookieSameSite: 'lax',
    }),
];