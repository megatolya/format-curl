import encode from './encode';
import { isObject, isString } from './utils';

export default function normalizeUrl(url) {
    if (url instanceof URL) {
        return url;
    }

    if (isObject(url)) {
        let auth = url.auth || '';
        let protocol = url.protocol || '';
        let host = url.host || '';
        let pathname = url.pathname || '';
        let query = url.query || '';

        if (auth) {
            auth += '@';
        }

        if (host) {
            host = auth + host;
        } else if (url.hostname) {
            const hostname = url.hostname || '';
            host = auth + (
                hostname.indexOf(':') > -1
                    ? `[${hostname}]`
                    : hostname
            );

            if (url.port) {
                host += `:${url.port}`;
            }
        }

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

        if (isObject(query)) {
            query = encode(query);
        }

        const stringUrl = (protocol + host + pathname) || url.href || '';
        const urlInstance = new URL(stringUrl);

        urlInstance.hash = url.hash || '';
        urlInstance.search = url.search || query || '';

        return urlInstance;
    }

    if (isString(url) && url.length > 0) {
        return new URL(url);
    }

    throw new TypeError('Unsupported url format');
}
