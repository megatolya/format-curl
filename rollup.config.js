'use strict';

import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import { uglify } from 'rollup-plugin-uglify';

module.exports = [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.js',
            format: 'iife',
            name: 'formatCurl',
        },
        plugins: [
            builtins(),
            babel(),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.min.js',
            format: 'iife',
            name: 'formatCurl',
        },
        plugins: [
            builtins(),
            babel(),
            uglify(),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            file: 'lib/index.js',
            format: 'cjs',
        },
        plugins: [],
    },
];
