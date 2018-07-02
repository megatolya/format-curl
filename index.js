'use strict';

const querystring = require('querystring');

module.exports = ({
    url,
    query,
    headers,
    body,
    method,
    args = []
}) => {
    let urlWithQuery = query && Object.keys(query).length
        ? url + '?' + querystring.stringify(query)
        : url;
    let res = 'curl';

    if (args && args.length) {
        res = `${res} ${args.join(' ')}`;
    }

    res = `${res} "${urlWithQuery}"`;

    const headersNames = Object.keys(headers || {});

    if (headers && headersNames.length) {
        const headersStrings = headersNames.map(headerName => {
            const headerValue = typeof headers[headerName] === 'string'
                ? headers[headerName].replace(/"/g, '\"')
                : headers[headerName];
            return `-H "${headerName}: ${headerValue}"`;
        });
        res += ` ${headersStrings.join(' ')}`;
    }

    if (body) {
        if (typeof body !== 'string') {
            body = JSON.stringify(body);
        }

        res += ` --data '${body.replace(/"/g, '\"')}'`;
    }

    if (method) {
        res += ` -X ${method.toUpperCase()}`;
    }

    return res;
};
