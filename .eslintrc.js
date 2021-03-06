'use strict';

module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },

    parserOptions: {
        sourceType: 'module',
    },

    rules: {
        // possible errors
        'for-direction': 2,
        'getter-return': 2,
        'no-compare-neg-zero': 2,
        'no-cond-assign': [2, 'except-parens'],
        'no-constant-condition': 2,
        'no-control-regex': 2,
        'no-debugger': 2,
        'no-dupe-args': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty': 2,
        'no-ex-assign': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-semi': 2,
        'no-inner-declarations': 2,
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-obj-calls': 2,
        'no-regex-spaces': 2,
        'no-sparse-arrays': 2,
        'no-unreachable': 2,
        'no-unsafe-negation': 2,
        'use-isnan': 2,
        'valid-typeof': 2,

        // spaces
        'arrow-spacing': [2, { before: true, after: true }],
        'comma-spacing': [2, { before: false, after: true }],
        'computed-property-spacing': [2, 'never'],
        'func-call-spacing': [2, 'never'],
        'generator-star-spacing': [2, { before: true, after: false }],
        'indent': [2, 4],
        'key-spacing': [2, { beforeColon: false, afterColon: true, mode: 'strict' }],
        'keyword-spacing': [2, { before: true, after: true }],
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2,
        'no-tabs': 2,
        'no-trailing-spaces': 2,
        'no-whitespace-before-property': 2,
        'object-curly-spacing': [2, 'always'],
        'rest-spread-spacing': [2, 'never'],
        'semi-spacing': [2, { before: false, after: true }],
        'space-before-blocks': 2,
        'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'spaced-comment': [2, 'always'],
        'switch-colon-spacing': [2, { after: true, before: false }],
        'template-curly-spacing': [2, 'never'],
        'template-tag-spacing': [2, 'never'],
        'yield-star-spacing': [2, { before: false, after: true }],

        // line breaks
        'array-bracket-newline': [2, { multiline: true }],
        'array-element-newline': [2, 'consistent'],
        'eol-last': [2, 'always'],
        'linebreak-style': [2, 'unix'],
        'lines-between-class-members': [2, 'always'],
        'no-multiple-empty-lines': [2, { max: 1, maxBOF: 0, maxEOF: 0 }],
        'object-curly-newline': 0,
        'object-property-newline': 0,
        'one-var-declaration-per-line': [2, 'always'],
        'padded-blocks': [2, 'never'],
        'padding-line-between-statements': [
            2,
            { blankLine: 'always', prev: 'directive', next: '*' },
            { blankLine: 'never', prev: 'directive', next: 'directive' },
            { blankLine: 'always', prev: '*', next: 'cjs-export' },
            { blankLine: 'any', prev: 'cjs-export', next: 'cjs-export' },
            { blankLine: 'always', prev: '*', next: 'export' },
            { blankLine: 'any', prev: 'export', next: 'export' },
        ],
        // 'operator-linebreak' ??

        // best practices
        'curly': [2, 'all'],
        'dot-location': [2, 'property'],
        'dot-notation': 2,
        'eqeqeq': [2, 'always', { null: 'ignore' }],
        'no-case-declarations': 2,
        'no-else-return': 2,
        'no-empty-pattern': 2,
        'no-extra-bind': 2,
        'no-extra-label': 2,
        'no-fallthrough': 0,
        'no-floating-decimal': 2,
        'no-global-assign': 2,
        'no-implicit-coercion': 2,
        'no-implied-eval': 2,
        'no-octal': 2,
        'no-self-assign': 2,
        'no-unused-labels': 2,
        'no-useless-call': 2,
        'no-useless-concat': 2,
        'no-useless-escape': 0,
        'no-useless-return': 2,
        'wrap-iife': [2, 'inside'],
        'yoda': [2, 'never', { exceptRange: true }],

        // common
        'arrow-body-style': [2, 'as-needed'],
        'arrow-parens': [2, 'as-needed'],
        'comma-dangle': [2, 'always-multiline'],
        'comma-style': [2, 'last'],
        'func-names': [2, 'as-needed'],
        'func-style': [2, 'declaration'],
        'jsx-quotes': [2, 'prefer-double'],
        'max-len': [
            2,
            {
                code: 100,
                ignoreStrings: true,
                ignoreUrls: true,
            },
        ],
        'new-parens': 2,
        'no-confusing-arrow': 0,
        'no-dupe-class-members': 2,
        'no-lonely-if': 2,
        'no-negated-condition': 2,
        'no-nested-ternary': 2,
        'no-new-object': 2,
        'no-restricted-syntax': 2, // forbit anything
        'no-undef-init': 2,
        'no-undef': 2,
        'no-underscore-dangle': 2,
        'no-unneeded-ternary': 2,
        'no-unused-vars': 2,
        'no-useless-computed-key': 2,
        'no-useless-rename': 2,
        'no-var': 2,
        'object-shorthand': 2,
        'one-var': [2, 'never'],
        'prefer-arrow-callback': 2,
        'prefer-const': 2,
        'prefer-object-spread': 0,
        'prefer-spread': 2,
        'prefer-template': 2,
        'quote-props': [2, 'consistent-as-needed'],
        'quotes': [2, 'single'],
        'require-yield': 2,
        'semi-style': [2, 'last'],
        'semi': [2, 'always'],
        'unicode-bom': [2, 'never'],
        'wrap-regex': 0,

        // specific
        'global-require': 2,
        'no-mixed-requires': 2,
    },
};
