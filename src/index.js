import normalizeUrl from './normalize-url';
import serializeQuery from './serialize-query';
import { isObject, isString } from './utils';

function escapeQuote(s) {
    return s.replace(/"/g, '\"');
}

export default function formatCurl(url, options) {
    const {
        args,
        body,
        headers,
        method,
        query,
    } = options || {};

    const urlInstance = normalizeUrl(url);

    if (query) {
        const search = isObject(query) ? serializeQuery(query) : query;
        urlInstance.search = search || '';
    }

    let result = `curl "${urlInstance.toString()}"`;

    if (isObject(headers)) {
        const headerString = Object.keys(headers)
            .map(k => {
                const v = isString(headers[k]) ? escapeQuote(headers[k]) : headers[k];
                return `-H "${k}: ${v}"`;
            })
            .join(' ');

        if (headerString) {
            result += ` ${headerString}`;
        }
    }

    if (body) {
        const bodyString = isString(body) ? body : JSON.stringify(body);
        result += ` --data '${escapeQuote(bodyString)}'`;
    }

    if (isString(method)) {
        result += ` -X ${method.toUpperCase()}`;
    }

    if (Array.isArray(args) && args.length > 0) {
        result = `${result} ${args.join(' ')}`;
    }

    return result;
}
