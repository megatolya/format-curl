'use strict';

const { stringify } = require('querystring');

module.exports = function formatCurl(url, options) {
    let result = 'curl';

    const {
        args,
        body,
        headers,
        method,
    } = options || {};

    if (Array.isArray(args) && args.length > 0) {
        result = `${result} ${args.join(' ')}`;
    }

    if (typeof url === 'string') {
        result += ` "${url}"`;
    } else if (typeof URL === 'function' && url instanceof URL) { // WHATWG URL
        result += ` "${url.toString()}"`;
    } else if (url !== null && typeof url === 'object') { // urlObject
        let auth = url.auth || '';
        if (auth) {
            auth += '@';
        }

        const hostname = url.hostname || '';
        let hash = url.hash || '';
        let host = url.host || '';
        let pathname = url.pathname || '';
        let protocol = url.protocol || '';
        let query = url.query || '';

        if (host) {
            host = auth + host;
        } else if (hostname) {
            host = auth + (
                hostname.indexOf(':') > -1
                    ? `[${hostname}]` // ipv6
                    : hostname
            );

            if (url.port) {
                host += `:${url.port}`;
            }
        }

        if (typeof query === 'object') {
            query = stringify(query);
        }

        let search = url.search || (query && (`?${query}`)) || '';

        if (protocol && protocol.charCodeAt(protocol.length - 1) !== 58) { /* : */
            protocol += ':';
        }

        if (url.slashes || /^(file|ftp|gopher|https?):?$/.test(protocol)) {
            if (
                (url.slashes || host) &&
                pathname && pathname.charCodeAt(0) !== 47
            ) {
                pathname = `/${pathname}`;
            }

            host = `//${host}`;
        }

        if (hash && hash.charCodeAt(0) !== 35) {
            hash = `#${hash}`;
        }

        if (search && search.charCodeAt(0) !== 63) {
            search = `?${search}`;
        }

        const stringUrl = (protocol + host + pathname + search + hash) || url.href || '';
        result += ` "${stringUrl}"`;
    }

    if (headers !== null && typeof headers === 'object') {
        const headersStrings = Object.keys(headers).map(headerName => {
            const headerValue = typeof headers[headerName] === 'string'
                ? headers[headerName].replace(/"/g, '\"')
                : headers[headerName];

            return `-H "${headerName}: ${headerValue}"`;
        });

        if (headersStrings.length > 0) {
            result += ` ${headersStrings.join(' ')}`;
        }
    }

    if (body) {
        const newBody = typeof body === 'string' ? body : JSON.stringify(body);
        result += ` --data '${newBody.replace(/"/g, '\"')}'`;
    }

    if (typeof method === 'string') {
        result += ` -X ${method.toUpperCase()}`;
    }

    return result;
};
