import normalizeUrl from '../src/normalize-url';
import url from 'url';

describe('serialize-url', () => {
  describe('common use cases', () => {
    it('handle empty url', () => {
      expect(normalizeUrl().toString()).toBe('');
      expect(normalizeUrl(null).toString()).toBe('');
      expect(normalizeUrl('').toString()).toBe('');
    });

    it('any url', () => {
      const urlString = 'http://my-host.com/abc?a=b#foo';
      expect(normalizeUrl(urlString).toString()).toBe(urlString);
    });
  });

  describe('request object', () => {
    it('protocol', () => {
      const params = {protocol: 'http', host: 'my-host'};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('protocol + slashes', () => {
      const params = {protocol: 'http', host: 'my-host', slashes: true};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('auth', () => {
      const params = {auth: 'user:pass', host: 'myhost'};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('hostname + port', () => {
      const params = {hostname: 'myhost', port: 80};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('hostname', () => {
      const params = {hostname: 'myhost'};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('host', () => {
      const params = {host: 'my-host', hostname: 'myhost', port: 80};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('host + slashes', () => {
      const params = {host: 'my-host', slashes: true};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('pathname', () => {
      const params = {pathname: 'abc'};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('pathname + slashes', () => {
      const params = {pathname: 'abc', slashes: true};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('search a=b', () => {
      const params = {pathname: 'abc', search: 'a=b'};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('search ?a=b', () => {
      const params = {pathname: 'abc', search: '?a=b'};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('query {a: b}', () => {
      const params = {pathname: 'abc', query: {a: 'b'}};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('hash', () => {
      const params = {pathname: 'abc', hash: 'foo'};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });

    it('hash #', () => {
      const params = {pathname: 'abc', hash: '#foo'};
      expect(normalizeUrl(params).toString()).toBe(url.format(params));
    });
  });

  describe('whatwg url', () => {
    it('should match', () => {
      const urlString = 'http://my-host.com/abc?a=b#foo';
      expect(normalizeUrl(new URL(urlString)).toString()).toBe(urlString);
    });
  });
});
