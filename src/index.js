import normalizeUrl from './normalize-url';
import serializeQuery from './serialize-query';
import { isObject, isString, isUndefined } from './utils';

function escapeQuote(s) {
    return s.replace(/"/g, '\"');
}

export default function formatCurl(url, options) {
    const {
        args,
        body,
        headers,
        json,
        method,
        query,
    } = options || {};

    const urlInstance = normalizeUrl(url);

    if (query) {
        const search = isObject(query) ? serializeQuery(query) : query;
        urlInstance.search = search || '';
    }

    let result = `curl "${urlInstance.toString()}"`;

    const computedHeaders = Object.assign({}, headers);

    if (json) {
        const headersMap = Object.keys(computedHeaders).reduce((m, headerName) => {
            m[headerName.toLowerCase()] = headerName;
            return m;
        }, {});

        const accept = headersMap.accept || 'accept';
        const contentType = headersMap['content-type'] || 'content-type';

        if (isUndefined(computedHeaders[accept])) {
            computedHeaders[accept] = 'application/json';
        }

        if (isUndefined(computedHeaders[contentType])) {
            computedHeaders[contentType] = 'application/json';
        }
    }

    const headersNames = Object.keys(computedHeaders);

    if (headersNames.length > 0) {
        const headerString = headersNames
            .map(k => {
                const v = isString(computedHeaders[k])
                    ? escapeQuote(computedHeaders[k])
                    : computedHeaders[k];

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
