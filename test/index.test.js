'use strict';

import formatCurl from '../src/index';
import url from 'url';

const testCases = [
    [
        'curl "https://myhost.com"',
        'https://myhost.com',
    ],
    [
        'curl -v "https://myhost.com" -H "accept: application/json" -H "content-type: application/json" --data \'{"foo":"bar"}\' -X POST',
        'https://myhost.com',
        {
            args: ['-v'],
            body: { foo: 'bar' },
            headers: { 'accept': 'application/json', 'content-type': 'application/json' },
            method: 'post',
        },
    ],

    // WHATWG URL
    [
        'curl "https://myhost.com/"',
        new URL('https://myhost.com'),
    ],

    // urlObject
    [
        'curl "https://myhost.com/#foo"',
        url.parse('https://myhost.com#foo'),
    ],
    [
        'curl "https://myhost.com"',
        {
            protocol: 'https',
            host: 'myhost.com',
        },
    ],
    [
        'curl "https://myhost.com"',
        {
            protocol: 'https:',
            host: 'myhost.com',
        },
    ],
    [
        'curl "https://abc.com"',
        {
            protocol: 'https',
            host: 'abc.com',
            hostname: 'myhost.com',
            port: 80,
        },
    ],
    [
        'curl "https://myhost.com"',
        {
            protocol: 'https',
            hostname: 'myhost.com',
        },
    ],
    [
        'curl "https://myhost.com:80"',
        {
            protocol: 'https',
            hostname: 'myhost.com',
            port: 80,
        },
    ],
    [
        'curl "https://myhost.com/dd"',
        {
            protocol: 'https',
            host: 'myhost.com',
            pathname: 'dd',
        },
    ],
    [
        'curl "https://myhost.com"',
        {
            protocol: 'https',
            host: 'myhost.com',
            query: {},
        },
    ],
    [
        'curl "https://myhost.com?foo=bar"',
        {
            protocol: 'https',
            host: 'myhost.com',
            query: {
                foo: 'bar',
            },
        },
    ],
    [
        'curl "https://myhost.com?foo=bar"',
        {
            protocol: 'https',
            host: 'myhost.com',
            query: 'foo=bar',
        },
    ],
    [
        'curl "https://myhost.com?foo=bar"',
        {
            protocol: 'https',
            host: 'myhost.com',
            search: 'foo=bar',
        },
    ],
    [
        'curl "https://myhost.com?foo=bar"',
        {
            protocol: 'https',
            host: 'myhost.com',
            search: '?foo=bar',
        },
    ],
    [
        'curl "https://myhost.com#abc"',
        {
            protocol: 'https',
            host: 'myhost.com',
            hash: 'abc',
        },
    ],
    [
        'curl "https://myhost.com#abc"',
        {
            protocol: 'https',
            host: 'myhost.com',
            hash: '#abc',
        },
    ],

    // options
    [
        'curl -v -L "https://myhost.com"',
        'https://myhost.com',
        {
            args: ['-v', '-L'],
        },
    ],
    [
        'curl "https://myhost.com" -X POST',
        'https://myhost.com',
        {
            method: 'post',
        },
    ],
    [
        'curl "https://myhost.com" --data \'foo=bar\' -X POST',
        'https://myhost.com',
        {
            method: 'post',
            body: 'foo=bar',
        },
    ],
    [
        'curl "https://myhost.com" --data \'{"foo":"bar"}\' -X POST',
        'https://myhost.com',
        {
            method: 'post',
            body: {
                foo: 'bar',
            },
        },
    ],
    [
        'curl "https://myhost.com" -H "x-header: test" -H "x-header2: test2"',
        'https://myhost.com',
        {
            headers: {
                'x-header': 'test',
                'x-header2': 'test2',
            },
        },
    ],
];

testCases.forEach(([expectation, url, options]) => {
    test(expectation, () => {
        const reality = formatCurl(url, options);
        expect(reality).toBe(expectation);
    });
});
