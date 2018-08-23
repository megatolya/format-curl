'use strict';

const formatCurl = require('../src');

const testCases = [
    [
        'curl "https://myhost.com"',
        {
            url: 'https://myhost.com',
        },
    ],
    [
        'curl "https://myhost.com" -X POST',
        {
            url: 'https://myhost.com',
            method: 'post',
        },
    ],
    [
        'curl "https://myhost.com"',
        {
            origin: 'https://myhost.com',
            query: {},
        },
    ],
    [
        'curl "https://myhost.com?search=pictures"',
        {
            origin: 'https://myhost.com',
            query: {
                search: 'pictures',
            },
        },
    ],
    [
        'curl "https://myhost.com?search=pictures"',
        {
            origin: 'https://myhost.com',
            query: {
                search: 'pictures',
            },
            headers: {},
        },
    ],
    [
        'curl "https://myhost.com?search=pictures" -H "x-header: test"',
        {
            origin: 'https://myhost.com',
            query: {
                search: 'pictures',
            },
            headers: {
                'x-header': 'test',
            },
        },
    ],
    [
        'curl "https://myhost.com?search=pictures" -H "x-header: test" -H "x-header2: test2"',
        {
            origin: 'https://myhost.com',
            query: {
                search: 'pictures',
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2',
            },
        },
    ],
    [
        'curl "https://myhost.com?search=pictures&search2=pictures2" -H "x-header: test" -H "x-header2: test2"',
        {
            origin: 'https://myhost.com',
            query: {
                search: 'pictures',
                search2: 'pictures2',
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2',
            },
        },
    ],
    [
        'curl "https://myhost.com?search=pictures&search2=pictures2" -H "x-header: test" -H "x-header2: test2" --data \'{"param":"123"}\'',
        {
            origin: 'https://myhost.com',
            query: {
                search: 'pictures',
                search2: 'pictures2',
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2',
            },
            body: JSON.stringify({
                param: '123',
            }),
        },
    ],
    [
        'curl "https://myhost.com?search=pictures&search2=pictures2" -H "x-header: test" -H "x-header2: test2" --data \'{"param":"123"}\' -X PUT',
        {
            origin: 'https://myhost.com',
            query: {
                search: 'pictures',
                search2: 'pictures2',
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2',
            },
            body: JSON.stringify({
                param: '123',
            }),
            method: 'PUT',
        },
    ],
    [
        'curl -vvv "https://myhost.com?search=pictures&search2=pictures2" -H "x-header: test" -H "x-header2: test2" --data \'{"param":"123"}\' -X PUT',
        {
            origin: 'https://myhost.com',
            query: {
                search: 'pictures',
                search2: 'pictures2',
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2',
            },
            body: JSON.stringify({
                param: '123',
            }),
            method: 'PUT',
            args: ['-vvv'],
        },
    ],
    [
        'curl "https://myhost.com" -H "x-header: undefined"',
        {
            url: 'https://myhost.com',
            headers: {
                'x-header': undefined,
            },
        },
    ],
    [
        'curl "https://myhost.com" --data \'{"foo":"bar"}\'',
        {
            url: 'https://myhost.com',
            body: {
                foo: 'bar',
            },
        },
    ],
];

testCases.forEach(([expectation, params]) => {
    test(expectation, () => {
        const reality = formatCurl(params);
        expect(reality).toBe(expectation);
    });
});
