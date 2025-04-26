import SuperTokens from "supertokens-node";
import { TypeInput } from "supertokens-node/types";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";

export const SuperTokensConfig: TypeInput = {
    appInfo: {
        appName: "MyApp",
        apiDomain: process.env.API_DOMAIN!!,
        websiteDomain: process.env.API_DOMAIN,
        apiBasePath: "/api/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        EmailPassword.init(),
        Session.init({
            cookieSecure: true,
            cookieSameSite: 'lax',
        })
    ],
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_CONNECTION_URI!!,
        apiKey: process.env.SUPERTOKENS_API_KEY
    },
    telemetry: false
};