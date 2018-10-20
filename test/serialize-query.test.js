import serializeQuery from '../src/serialize-query';

describe('serialize-query', () => {
    it('should handle array param', () => {
        const q = serializeQuery({ a: ['b', 'c'] });
        expect(q).toBe('a=b&a=c');
    });

    it('should handle boolean param', () => {
        const q = serializeQuery({ f: false, t: true });
        expect(q).toBe('f=false&t=true');
    });

    it('should handle number param', () => {
        const q = serializeQuery({ a: 5 });
        expect(q).toBe('a=5');
    });

    it('should handle object param', () => {
        const q = serializeQuery({ a: { b: 4 } });
        expect(q).toBe('a=');
    });

    it('should handle string param', () => {
        const q = serializeQuery({ a: 's' });
        expect(q).toBe('a=s');
    });
});
