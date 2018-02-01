'use strict';

const assert = require('assert');

const createCurl = require('./index');

assert.equal(
    `curl "https://yandex.ru?search=pictures"`,
    createCurl({
        url: 'https://yandex.ru',
        query: {
            search: 'pictures'
        }
    })
);

assert.equal(
    `curl "https://yandex.ru?search=pictures" -H "x-header: test"`,
    createCurl({
        url: 'https://yandex.ru',
        query: {
            search: 'pictures'
        },
        headers: {
            'x-header': 'test'
        }
    })
);
