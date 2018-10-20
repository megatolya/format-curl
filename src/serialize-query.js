function encode(p) {
    return encodeURIComponent(p);
}

function serialize(p) {
    switch (typeof p) {
    case 'boolean':
        return p ? 'true' : 'false';
    case 'number':
        return isFinite(p) ? p : '';
    case 'string':
        return p;
    default:
        return '';
    }
}

export default function serializeQuery(query) {
    return Object.keys(query)
        .map(key => {
            const k = `${encode(key)}=`;

            if (Array.isArray(query[key])) {
                return query[key]
                    .map(v => k + encode(serialize(v)))
                    .join('&');
            }

            return k + encode(serialize(query[key]));
        })
        .join('&');
}
