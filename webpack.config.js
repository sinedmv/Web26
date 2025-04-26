const path = require('path');

module.exports = {
    entry: {
        signUp: './public/js/sign-up.js',
        signIn: './public/js/sign-in.js',
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].bundle.js',
    },
};
