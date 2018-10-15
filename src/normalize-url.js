import serializeQuery from './serialize-query';
import { isObject, isString } from './utils';

const baseUrl = 'http://localhost/';

export default function normalizeUrl(url) {
    if (url instanceof URL) {
        return url;
    }

    if (isObject(url)) {
        const urlInstance = new URL('', baseUrl);

        if (url.href) {
            return urlInstance.href = url.href;
        }

        urlInstance.protocol = url.protocol;

        if (url.host) {
            urlInstance.host = url.host;
        } else if (url.hostname || url.port) {
            urlInstance.hostname = url.hostname;
            urlInstance.port = url.port;
        }

        if (url.pathname) {
            urlInstance.pathname = url.pathname;
        }

        if (url.search) {
            urlInstance.search = url.search;
        } else if (url.query) {
            const query = url.query;
            const search = isObject(query) ? serializeQuery(query) : query;
            urlInstance.search = search || '';
        }

        if (url.hash) {
            urlInstance.hash = url.hash;
        }

        if (url.auth) {
            const parts = url.auth.split(':');
            urlInstance.username = parts[0] || '';
            urlInstance.password = parts[1] || '';
        }

        return urlInstance;
    }

    if (isString(url) && url.length > 0) {
        // treat "abc" as "http://abc/" and "/abc" as "http://localhost/abc"
        const urlString = /^(file|ftp|gopher|https?):\/\/|^\//.test(url) ? url : `//${url}`;
        return new URL(urlString, baseUrl);
    }

    return new URL('', baseUrl);
}
