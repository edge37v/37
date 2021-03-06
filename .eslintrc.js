module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "overrides": [
        {
            files: ["*.svelte"],
            processor: "svelte3/svelte3"
        }
    ],
    "plugins": [
        "svelte3",
        "@typescript-eslint"
    ],
    "rules": {
    }
};
