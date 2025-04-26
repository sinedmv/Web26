import EmailPassword, { signIn } from "supertokens-web-js/recipe/emailpassword";
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';

const apiDomain = "https://m3301-makarov.onrender.com/";
SuperTokens.init({
    appInfo: {
        apiDomain: apiDomain,
        apiBasePath: "/api/auth",
        appName: "MyApp",
    },
    recipeList: [
        Session.init(),
        EmailPassword.init({
            cookieSecure: true,
            cookieSameSite: 'lax',
        }),
    ],
});

async function signInClicked(email, password) {
    try {
        let response = await signIn({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            window.alert("Email password combination is incorrect.")
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            window.alert(response.reason)
        } else {
            window.location.href = "/"
        }
    } catch (err) {
        console.error(err);
        if (err.isSuperTokensGeneralError === true) {
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong." + err.message);
        }
    }
}

document.getElementById('signInForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await signInClicked(email, password);
})
