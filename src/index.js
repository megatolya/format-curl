import encode from './encode';
import normalizeUrl from './normalize-url';
import { isObject, isString } from './utils';

export default function formatCurl(url, options) {
    const urlObject = normalizeUrl(url);

    const {
        args,
        body,
        headers,
        method,
        query,
    } = options || {};

    if (query) {
        const q = isObject(query) ? encode(query) : query;
        urlObject.search = q;
    }

    let curl = `curl "${urlObject.toString()}"`;

    if (isObject(headers)) {
        const headersStrings = Object.keys(headers).map(headerName => {
            const headerValue = isString(headers[headerName])
                ? headers[headerName].replace(/"/g, '\"')
                : headers[headerName];

            return `-H "${headerName}: ${headerValue}"`;
        });

        if (headersStrings.length > 0) {
            curl += ` ${headersStrings.join(' ')}`;
        }
    }

    if (body) {
        const newBody = isString(body) ? body : JSON.stringify(body);
        curl += ` --data '${newBody.replace(/"/g, '\"')}'`;
    }

    if (isString(method)) {
        curl += ` -X ${method.toUpperCase()}`;
    }

    if (Array.isArray(args) && args.length > 0) {
        curl = `${curl} ${args.join(' ')}`;
    }

    return curl;
}
