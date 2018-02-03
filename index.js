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
            const headerValue = headers[headerName].replace(/"/g, '\"');
            return `-H "${headerName}: ${headerValue}"`;
        });
        res += ` ${headersStrings.join(' ')}`;
    }

    if (body) {
        res += ` --data '${body.replace(/"/g, '\"')}'`;
    }

    if (method) {
        res += ` -X ${method.toUpperCase()}`;
    }

    return res;
};
