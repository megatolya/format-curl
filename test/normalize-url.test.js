import normalizeUrl from '../src/normalize-url';

describe('serialize-url', () => {
    describe('common use cases', () => {
        it('handle empty url', () => {
            expect(normalizeUrl().toString()).toBe('http://localhost/');
            expect(normalizeUrl(null).toString()).toBe('http://localhost/');
            expect(normalizeUrl('').toString()).toBe('http://localhost/');
        });

        it('any url', () => {
            const urlString = 'http://my-host.com/abc?a=b#foo';
            expect(normalizeUrl(urlString).toString()).toBe(urlString);
        });
    });

    describe('request object', () => {
        it('protocol', () => {
            const params = { protocol: 'http', host: 'my-host' };
            expect(normalizeUrl(params).toString()).toBe('http://my-host/');
        });

        it('protocol + slashes', () => {
            const params = { protocol: 'http', host: 'my-host', slashes: true };
            expect(normalizeUrl(params).toString()).toBe('http://my-host/');
        });

        it('auth', () => {
            const params = { auth: 'user:pass', host: 'myhost' };
            expect(normalizeUrl(params).toString()).toBe('http://user:pass@myhost/');
        });

        it('hostname + port', () => {
            const params = { hostname: 'myhost', port: 81 };
            expect(normalizeUrl(params).toString()).toBe('http://myhost:81/');
        });

        it('hostname + port :80', () => {
            const params = { hostname: 'myhost', port: 80 };
            expect(normalizeUrl(params).toString()).toBe('http://myhost/');
        });

        it('hostname', () => {
            const params = { hostname: 'myhost' };
            expect(normalizeUrl(params).toString()).toBe('http://myhost/');
        });

        it('host', () => {
            const params = { host: 'my-host', hostname: 'myhost', port: 81 };
            expect(normalizeUrl(params).toString()).toBe('http://my-host/');
        });

        it('host + slashes', () => {
            const params = { host: 'my-host', slashes: true };
            expect(normalizeUrl(params).toString()).toBe('http://my-host/');
        });

        it('pathname', () => {
            const params = { pathname: 'abc' };
            expect(normalizeUrl(params).toString()).toBe('http://localhost/abc');
        });

        it('pathname + slashes', () => {
            const params = { pathname: 'abc', slashes: true };
            expect(normalizeUrl(params).toString()).toBe('http://localhost/abc');
        });

        it('search a=b', () => {
            const params = { pathname: 'abc', search: 'a=b' };
            expect(normalizeUrl(params).toString()).toBe('http://localhost/abc?a=b');
        });

        it('search ?a=b', () => {
            const params = { pathname: 'abc', search: '?a=b' };
            expect(normalizeUrl(params).toString()).toBe('http://localhost/abc?a=b');
        });

        it('query {a: b}', () => {
            const params = { pathname: 'abc', query: { a: 'b' } };
            expect(normalizeUrl(params).toString()).toBe('http://localhost/abc?a=b');
        });

        it('hash', () => {
            const params = { pathname: 'abc', hash: 'foo' };
            expect(normalizeUrl(params).toString()).toBe('http://localhost/abc#foo');
        });

        it('hash #', () => {
            const params = { pathname: 'abc', hash: '#foo' };
            expect(normalizeUrl(params).toString()).toBe('http://localhost/abc#foo');
        });
    });

    describe('whatwg url', () => {
        it('should match', () => {
            const urlString = 'http://my-host.com/abc?a=b#foo';
            expect(normalizeUrl(new URL(urlString)).toString()).toBe(urlString);
        });
    });
});
