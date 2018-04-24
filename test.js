'use strict';

const diff = require('diff');
const colors = require('colors');

const formatCurl = require('./index');
const testCases = [
    [
        `curl "https://myhost.com"`,
        {
            url: 'https://myhost.com'
        }
    ],
    [
        `curl "https://myhost.com" -X POST`,
        {
            url: 'https://myhost.com',
            method: 'post'
        }
    ],
    [
        `curl "https://myhost.com"`,
        {
            url: 'https://myhost.com',
            query: {}
        }
    ],
    [
        `curl "https://myhost.com?search=pictures"`,
        {
            url: 'https://myhost.com',
            query: {
                search: 'pictures'
            }
        }
    ],
    [
        `curl "https://myhost.com?search=pictures"`,
        {
            url: 'https://myhost.com',
            query: {
                search: 'pictures'
            },
            headers: {}
        }
    ],
    [
        `curl "https://myhost.com?search=pictures" -H "x-header: test"`,
        {
            url: 'https://myhost.com',
            query: {
                search: 'pictures'
            },
            headers: {
                'x-header': 'test'
            }
        }
    ],
    [
        `curl "https://myhost.com?search=pictures" -H "x-header: test" -H "x-header2: test2"`,
        {
            url: 'https://myhost.com',
            query: {
                search: 'pictures'
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2'
            }
        }
    ],
    [
        `curl "https://myhost.com?search=pictures&search2=pictures2" -H "x-header: test" -H "x-header2: test2"`,
        {
            url: 'https://myhost.com',
            query: {
                search: 'pictures',
                search2: 'pictures2'
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2'
            }
        }
    ],
    [
        `curl "https://myhost.com?search=pictures&search2=pictures2" -H "x-header: test" -H "x-header2: test2" --data '{"param":"123"}'`,
        {
            url: 'https://myhost.com',
            query: {
                search: 'pictures',
                search2: 'pictures2'
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2'
            },
            body: JSON.stringify({
                param: '123'
            })
        }
    ],
    [
        `curl "https://myhost.com?search=pictures&search2=pictures2" -H "x-header: test" -H "x-header2: test2" --data '{"param":"123"}' -X PUT`,
        {
            url: 'https://myhost.com',
            query: {
                search: 'pictures',
                search2: 'pictures2'
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2'
            },
            body: JSON.stringify({
                param: '123'
            }),
            method: 'PUT'
        }
    ],
    [
        `curl -vvv "https://myhost.com?search=pictures&search2=pictures2" -H "x-header: test" -H "x-header2: test2" --data '{"param":"123"}' -X PUT`,
        {
            url: 'https://myhost.com',
            query: {
                search: 'pictures',
                search2: 'pictures2'
            },
            headers: {
                'x-header': 'test',
                'x-header2': 'test2'
            },
            body: JSON.stringify({
                param: '123'
            }),
            method: 'PUT',
            args: ['-vvv']
        }
    ],
    [
        `curl "https://myhost.com" -H "x-header: undefined"`,
        {
            url: 'https://myhost.com',
            headers: {
                'x-header': undefined
            }
        }
    ]
];

testCases.forEach(([expectation, params]) => {
    const reality = formatCurl(params);
    const ok = expectation === reality;
    console.log(reality);

    if (!ok) {
        console.log('diff:');
        diff.diffChars(reality, expectation)
            .forEach(function(part){
                // green for additions, red for deletions
                // grey for common parts
                var color = part.added ? 'green' :
                    part.removed ? 'red' : 'grey';
                process.stderr.write(part.value[color]);
            });
        console.log();
        process.exit(1);
    }
});
