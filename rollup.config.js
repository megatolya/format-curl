'use strict';

const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const builtins = require('rollup-plugin-node-builtins');
const { uglify } = require('rollup-plugin-uglify');

module.exports = [
    {
        input: 'src/index.js',
        output: {
            file: 'dist/index.js',
            format: 'iife',
            name: 'formatCurl',
        },
        plugins: [
            commonjs(),
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
            commonjs(),
            builtins(),
            babel(),
            uglify(),
        ],
    },
];
