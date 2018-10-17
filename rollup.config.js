'use strict';

import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

module.exports = [
    // commonJS
    {
        input: 'src/index.js',
        output: {
            file: 'lib/index.js',
            format: 'cjs',
        },
        plugins: [babel()],
    },
    // es
    {
        input: 'src/index.js',
        output: {
            file: 'lib/index.esm.js',
            format: 'esm',
        },
        plugins: [babel()],
    },
    // unpkg
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.js',
            format: 'iife',
            name: 'formatCurl',
        },
        plugins: [babel()],
    },
    // unpkg (minified)
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.min.js',
            format: 'iife',
            name: 'formatCurl',
        },
        plugins: [
            babel(),
            uglify(),
        ],
    },
];
