import normalizeUrl from '../src/normalize-url';
import url from 'url';

describe('request object', () => {
    it('http://mydomain.com', () => {
        const href = normalizeUrl(
            url.parse('http://mydomain.com')
        );

        expect(href.toString()).toBe('http://mydomain.com/');
    });

    it('http://user:pass@mydomain.com/path?a=b#hash', () => {
        const href = normalizeUrl(
            url.parse('http://user:pass@mydomain.com/path?a=b#hash')
        );

        expect(href.toString()).toBe('http://user:pass@mydomain.com/path?a=b#hash');
    });

    it('http://mydomain.com/?a=b&a=c', () => {
        const urlObject = url.parse('http://mydomain.com');
        urlObject.query = { a: ['b', 'c'] };

        const href = normalizeUrl(urlObject);

        expect(href.toString()).toBe('http://mydomain.com/?a=b&a=c');
    });
});

describe('string', () => {
    it('http://mydomain.com', () => {
        const href = normalizeUrl(
            'http://mydomain.com'
        );

        expect(href.toString()).toBe('http://mydomain.com/');
    });
});

describe('whatwg URL', () => {
    it('http://mydomain.com', () => {
        const href = normalizeUrl(
            new URL('http://mydomain.com')
        );

        expect(href.toString()).toBe('http://mydomain.com/');
    });
});
