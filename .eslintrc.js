module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "standard",
    "globals": {
        "Utils": "readonly",
        "STYLES": "readonly",
        "game": "readonly",
        "test": "readonly",
        "expect": "readonly",
        "Phaser": "readonly",
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    },
    "plugins": ["jest"]
};