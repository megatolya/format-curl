import { stringify } from 'querystring';

export default function formatCurl(params) {
    let result = 'curl';

    if (typeof params === 'string') {
        return `${result} "${params}"`;
    } else if (typeof params !== 'object' || params === null) {
        throw new TypeError('"params" should be a string or an object');
    }

    const {
        args,
        body,
        headers,
        method,
    } = params;

    if (Array.isArray(args) && args.length > 0) {
        result = `${result} ${args.join(' ')}`;
    }

    let protocol = params.protocol || '';
    const pathname = params.pathname || '';
    const hash = params.hash || '';
    let host = params.host || '';
    let query = params.query || '';

    const {
        hostname,
        port,
    } = params;

    if (!host && hostname) {
        host = hostname.indexOf(':') > -1 // ipv6
            ? `[${hostname}]`
            : hostname;

        if (port) {
            host += `:${port}`;
        }
    }

    if (typeof query === 'object') {
        query = stringify(query);
    }

    const search = params.search || (query && (`?${query}`)) || '';

    if (protocol && protocol.charCodeAt(protocol.length - 1) !== 58) {
        protocol += ':';
    }

    const url = (((protocol + host) || params.origin || '') + pathname + search + hash)
        || params.href
        || params.url;

    result = `${result} "${url}"`;

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
}
