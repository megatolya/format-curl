import encode from '../src/encode';

describe('encode', () => {
    it('should handle array param', () => {
        const q = encode({ a: ['b', 'c'] });
        expect(q).toBe('a=b&a=c');
    });

    it('should handle boolean param', () => {
        const q = encode({ f: false, t: true });
        expect(q).toBe('f=false&t=true');
    });

    it('should handle number param', () => {
        const q = encode({ a: 5 });
        expect(q).toBe('a=5');
    });

    it('should handle object param', () => {
        const q = encode({ a: { b: 4 } });
        expect(q).toBe('a=');
    });

    it('should handle string param', () => {
        const q = encode({ a: 's' });
        expect(q).toBe('a=s');
    });
});
