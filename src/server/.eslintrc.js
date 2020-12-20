'use strict';

module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        strict: ['error', 'global'],
        'prefer-const': 'error',
        'max-len': [1, 120, 4],
    },
};
