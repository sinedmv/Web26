import { signUp } from 'supertokens-web-js/lib/build/recipe/emailpassword';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';

const apiDomain = "https://m3301-makarov.onrender.com/";
SuperTokens.init({
    appInfo: {
        apiDomain: apiDomain,
        apiBasePath: "/api/auth",
        appName: "abas",
    },
    recipeList: [
        Session.init({
            cookieSecure: true,
            cookieSameSite: 'lax',
        }),
        EmailPassword.init(),
    ],
});

async function createUserByApi(username, email, supertokenId, password) {
    const postData = { username: username,
        email: email,
        supertoken_id: supertokenId,
        password: password};

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            alert('User created successfully!');
        } else {
            alert('Failed to create user. Cause: ' + response.error.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while creating the user.');
    }
}

async function signUpClicked(username, email, password) {
    try {
        let response = await signUp({
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
                } else if (formField.id === "password") {
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            window.alert(response.reason)
        } else {
            await createUserByApi(username, email, response.user.id, password)
            window.location.href = "/"
        }
    } catch (err) {
        console.error(err);
        if (err.isSuperTokensGeneralError === true) {
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('signUpUsernameInput').value;
    const email = document.getElementById('signUpEmailInput').value;
    const password = document.getElementById('signUpPasswordInput').value;

    await signUpClicked(username, email, password);
})
