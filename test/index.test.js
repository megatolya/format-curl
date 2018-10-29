import formatCurl from '../src/index';

describe('format-curl', () => {
    describe('args', () => {
        it('should add args', () => {
            const curl = formatCurl('http://mydomain.com/', {
                args: ['-v', '-L'],
            });

            expect(curl).toBe('curl "http://mydomain.com/" -v -L');
        });
    });

    describe('body', () => {
        it('should handle string', () => {
            const curl = formatCurl('http://mydomain.com/', {
                body: JSON.stringify({ a: 'b' }),
            });

            expect(curl).toBe('curl "http://mydomain.com/" --data \'{"a":"b"}\'');
        });

        it('should handle object', () => {
            const curl = formatCurl('http://mydomain.com/', {
                body: {
                    hello: 'dude',
                },
            });

            expect(curl).toBe('curl "http://mydomain.com/" --data \'{"hello":"dude"}\'');
        });
    });

    describe('headers', () => {
        it('should add headers', () => {
            const curl = formatCurl('http://mydomain.com/', {
                headers: {
                    accept: 'application/json',
                },
            });

            expect(curl).toBe('curl "http://mydomain.com/" -H "accept: application/json"');
        });
    });


    describe('json', () => {
        it('should add "accept" and "content-type" headers', () => {
            const curl = formatCurl('http://mydomain.com/', {
                json: true,
            });

            expect(curl).toBe('curl "http://mydomain.com/" -H "accept: application/json" -H "content-type: application/json"');
        });

        it('should not modify existing headers', () => {
            const curl = formatCurl('http://mydomain.com/', {
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'text/plain',
                },
                json: true,
            });

            expect(curl).toBe('curl "http://mydomain.com/" -H "Accept: */*" -H "Content-Type: text/plain"');
        });
    });

    describe('method', () => {
        it('should add method', () => {
            const curl = formatCurl('http://mydomain.com', {
                method: 'post',
            });

            expect(curl).toBe('curl "http://mydomain.com/" -X POST');
        });
    });

    describe('query', () => {
        it('should handle string query', () => {
            const curl = formatCurl('http://mydomain.com/', {
                query: 'a=b&c=d',
            });

            expect(curl).toBe('curl "http://mydomain.com/?a=b&c=d"');
        });

        it('should overwrite query', () => {
            const curl = formatCurl('http://mydomain.com/?a=a', {
                query: {
                    d: 'd',
                },
            });

            expect(curl).toBe('curl "http://mydomain.com/?d=d"');
        });
    });

    describe('common cases', () => {
        it('empty call', () => {
            const curl = formatCurl();

            expect(curl).toBe('curl "http://localhost/"');
        });

        it('only host', () => {
            const curl = formatCurl('my-host');

            expect(curl).toBe('curl "http://my-host/"');
        });

        it('only pathname', () => {
            const curl = formatCurl('/abc');

            expect(curl).toBe('curl "http://localhost/abc"');
        });
    });
});
